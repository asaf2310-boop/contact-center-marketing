function fbqReady() {
  return typeof window !== "undefined" && typeof window.fbq === "function";
}

export function trackPageView() {
  if (!fbqReady()) return;
  window.fbq("track", "PageView");
}

/**
 * Fire Meta Pixel Lead. Retries briefly if fbevents.js has not defined fbq yet.
 * PageView is intentionally unchanged (base snippet + RouteChangeTracker).
 */
export function trackLead(attempt = 0) {
  if (!fbqReady()) {
    if (attempt < 25) {
      console.warn(
        "Meta Pixel is not available — window.fbq missing; retrying Lead event",
        { attempt },
      );
      setTimeout(() => trackLead(attempt + 1), 200);
      return;
    }
    console.warn(
      "Meta Pixel is not available — Lead event not sent (window.fbq missing after retries)",
    );
    return;
  }

  console.log("Lead event fired", {
    fbqExists: typeof window.fbq === "function",
    attempt,
  });
  window.fbq("track", "Lead");
}
