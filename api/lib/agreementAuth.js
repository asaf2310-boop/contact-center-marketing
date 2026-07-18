export function getAdminKey() {
  return String(process.env.AGREEMENT_ADMIN_KEY || process.env.VITE_AGREEMENT_ADMIN_KEY || "").trim();
}

export function requireAdmin(req, res) {
  const expected = getAdminKey();
  if (!expected) {
    res.status(503).json({
      error: "admin_not_configured",
      message: "AGREEMENT_ADMIN_KEY is not set",
    });
    return false;
  }

  const provided = String(req.headers["x-admin-key"] || req.headers["authorization"] || "")
    .replace(/^Bearer\s+/i, "")
    .trim();

  if (!provided || provided !== expected) {
    res.status(401).json({ error: "unauthorized" });
    return false;
  }

  return true;
}

export function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body.trim()) return JSON.parse(req.body);
  return null;
}

export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return String(forwarded[0]).trim();
  }
  return req.socket?.remoteAddress || req.connection?.remoteAddress || "unknown";
}
