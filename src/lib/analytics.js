const DEFAULT_GA4_ID = "G-TJ6XKPDT91";
const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim() || DEFAULT_GA4_ID;
const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID?.trim();
const GOOGLE_ADS_LEAD_LABEL = import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL?.trim();
const SITE_FALLBACK_ORIGIN = "https://www.allincenter.co.il";

let initialized = false;

function googleEnabled() {
  return typeof window !== "undefined" && Boolean(GA4_ID || GOOGLE_ADS_ID);
}

function ensureGtag() {
  if (!googleEnabled()) return false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  return true;
}

export function initAnalytics() {
  if (initialized || !ensureGtag()) return;
  initialized = true;

  const loaderId = GA4_ID || GOOGLE_ADS_ID;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(loaderId)}`;
  script.dataset.allincenterAnalytics = "true";
  document.head.appendChild(script);

  window.gtag("js", new Date());
  if (GA4_ID) window.gtag("config", GA4_ID, { send_page_view: false });
  if (GOOGLE_ADS_ID) window.gtag("config", GOOGLE_ADS_ID, { send_page_view: false });
}

export function trackAnalyticsPageView() {
  if (!ensureGtag() || !GA4_ID) return;
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
  });
}

export function trackAnalyticsEvent(name, parameters = {}) {
  if (!ensureGtag()) return;
  window.gtag("event", name, {
    page_path: `${window.location.pathname}${window.location.search}`,
    ...parameters,
  });
}

export function isDemoRequestForm({ source, submitLabel } = {}) {
  if (submitLabel && /הדגמה/.test(submitLabel)) return true;
  return !source || source === "facebook";
}

export function trackGoogleLead({ source, interest, demoRequest } = {}) {
  trackAnalyticsEvent("generate_lead", {
    lead_source: source || "website",
    lead_interest: interest || "not_selected",
  });

  if (demoRequest) {
    trackAnalyticsEvent("demo_request", {
      lead_source: source || "website",
      lead_interest: interest || "not_selected",
    });
  }

  if (GOOGLE_ADS_ID && GOOGLE_ADS_LEAD_LABEL) {
    trackAnalyticsEvent("conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`,
    });
  }
}

function cleanLinkText(link) {
  return link.textContent?.replace(/\s+/g, " ").trim().slice(0, 100) || "unlabelled";
}

export function isWhatsAppHref(href = "") {
  const value = String(href).trim();
  if (!value) return false;

  try {
    const url = new URL(value, typeof window !== "undefined" ? window.location.origin : SITE_FALLBACK_ORIGIN);
    const host = url.hostname.replace(/^www\./i, "").toLowerCase();
    return (
      url.protocol === "whatsapp:" ||
      host === "wa.me" ||
      host === "api.whatsapp.com" ||
      host === "whatsapp.com"
    );
  } catch {
    return /(?:wa\.me|api\.whatsapp\.com|whatsapp\.com|whatsapp:)/i.test(value);
  }
}

export function trackWhatsAppClick({ location, linkText } = {}) {
  trackAnalyticsEvent("whatsapp_click", {
    link_text: linkText || "WhatsApp",
    ...(location ? { location } : {}),
    transport_type: "beacon",
  });
}

function markWhatsAppTracked(event) {
  const native = event.nativeEvent || event;
  if (event.__aicWhatsAppTracked || native.__aicWhatsAppTracked) return false;
  event.__aicWhatsAppTracked = true;
  native.__aicWhatsAppTracked = true;
  return true;
}

export function handleWhatsAppLinkClick(event) {
  if (!markWhatsAppTracked(event)) return;

  const link = event.currentTarget;
  if (!link) return;

  trackWhatsAppClick({
    location: link.dataset?.analyticsLocation,
    linkText: cleanLinkText(link),
  });
}

function findClickedLink(event) {
  if (typeof event.composedPath === "function") {
    const fromPath = event.composedPath().find((node) => node?.tagName === "A" && node.getAttribute?.("href"));
    if (fromPath) return fromPath;
  }
  return event.target?.closest?.("a[href]") || null;
}

export function installLeadLinkTracking() {
  if (typeof document === "undefined") return () => {};

  function handleClick(event) {
    const native = event.nativeEvent || event;
    if (event.__aicWhatsAppTracked || native.__aicWhatsAppTracked) return;

    const link = findClickedLink(event);
    if (!link) return;

    const rawHref = link.getAttribute("href") || "";
    const resolvedHref = link.href || rawHref;
    const text = cleanLinkText(link);

    if (isWhatsAppHref(rawHref) || isWhatsAppHref(resolvedHref)) {
      if (!markWhatsAppTracked(event)) return;
      trackWhatsAppClick({
        location: link.dataset.analyticsLocation,
        linkText: text,
      });
      return;
    }

    if (rawHref.startsWith("tel:") || resolvedHref.startsWith("tel:")) {
      trackAnalyticsEvent("phone_click", { link_text: text });
    }
  }

  document.addEventListener("click", handleClick, true);
  return () => document.removeEventListener("click", handleClick, true);
}

export const analyticsStatus = {
  ga4Configured: Boolean(GA4_ID),
  googleAdsConfigured: Boolean(GOOGLE_ADS_ID && GOOGLE_ADS_LEAD_LABEL),
};
