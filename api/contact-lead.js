const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestsByIp = new Map();

function getClientIp(req) {
  return String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown")
    .split(",")[0]
    .trim();
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (requestsByIp.get(ip) || []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  requestsByIp.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

function clean(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function isSameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;

  try {
    const originHost = new URL(origin).host;
    const requestHost = String(req.headers["x-forwarded-host"] || req.headers.host || "");
    return originHost === requestHost;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  if (!isSameOrigin(req)) {
    return res.status(403).json({ error: "forbidden_origin" });
  }

  const contentLength = Number(req.headers["content-length"] || 0);
  if (contentLength > 12_000) {
    return res.status(413).json({ error: "payload_too_large" });
  }

  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ error: "rate_limited" });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch {
    return res.status(400).json({ error: "invalid_json" });
  }

  // Honeypot: bots fill this hidden field. Return success without creating a lead.
  if (clean(body.website, 200)) {
    return res.status(200).json({ accepted: true });
  }

  const fullName = clean(body.fullName, 100);
  const businessName = clean(body.businessName, 140);
  const phone = clean(body.phone, 20);
  const email = clean(body.email, 254).toLowerCase();
  const interest = clean(body.interest, 100);
  const message = clean(body.message, 2000);
  const pageUrl = clean(body.pageUrl, 1000);
  const phoneDigits = phone.replace(/\D/g, "");

  if (
    body.consent !== true ||
    fullName.length < 2 ||
    phoneDigits.length < 9 ||
    phoneDigits.length > 15
  ) {
    return res.status(400).json({ error: "validation_failed" });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "validation_failed" });
  }

  const ingestUrl = String(
    process.env.LEAD_INGEST_URL || "https://allincenter-scanner.vercel.app/api/leads/ingest",
  ).trim();
  const secret = String(process.env.LEAD_INGEST_SECRET || "").trim();
  if (!ingestUrl || !secret) {
    console.error("[contact-lead] Missing LEAD_INGEST_URL or LEAD_INGEST_SECRET");
    return res.status(503).json({ error: "not_configured" });
  }

  try {
    const response = await fetch(ingestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({
        fullName,
        businessName: businessName || undefined,
        phone,
        email: email || undefined,
        interest: interest || undefined,
        message: message || undefined,
        pageUrl: pageUrl || undefined,
        utm: {
          source: clean(body.utm?.source, 200) || undefined,
          medium: clean(body.utm?.medium, 200) || undefined,
          campaign: clean(body.utm?.campaign, 200) || undefined,
          content: clean(body.utm?.content, 200) || undefined,
        },
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("[contact-lead] Lead scanner rejected request", response.status, details);
      return res.status(502).json({ error: "sync_failed" });
    }

    return res.status(201).json({ accepted: true });
  } catch (error) {
    console.error("[contact-lead] Lead scanner unavailable", error);
    return res.status(502).json({ error: "sync_failed" });
  }
}
