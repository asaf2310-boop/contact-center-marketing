import React from "react";
import { SITE } from "@/lib/site";

export function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Click tracking (GA4 `instagram_click`, with `source` = location) is handled by
// installLeadLinkTracking in src/lib/analytics.js via the data-analytics-location attribute.
export default function InstagramLink({ location, className = "instagram-link", children = "Instagram", showIcon = true, ...props }) {
  return (
    <a
      className={className}
      href={SITE.instagram}
      target="_blank"
      rel="noopener noreferrer me"
      data-analytics-location={location}
      {...props}
    >
      {showIcon ? <InstagramIcon /> : null}
      <span>{children}</span>
    </a>
  );
}
