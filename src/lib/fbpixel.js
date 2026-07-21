function fbqReady() {
  return typeof window !== "undefined" && typeof window.fbq === "function";
}

export function trackPageView() {
  if (!fbqReady()) return;
  window.fbq("track", "PageView");
}

export function trackLead() {
  if (!fbqReady()) return;
  window.fbq("track", "Lead");
}
