import React from "react";
import { getWhatsAppHref, SITE } from "@/lib/site";

export default function SiteContactLine({ showAiLink = false }) {
  return (
    <small className="footer__contact">
      <a href={`tel:${SITE.phoneIntl}`}>{SITE.phoneDisplay}</a>
      <span aria-hidden="true"> · </span>
      <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      <span aria-hidden="true"> · </span>
      <a
        href={getWhatsAppHref()}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics-location="footer"
      >
        WhatsApp
      </a>
      {showAiLink ? (
        <>
          <span aria-hidden="true"> · </span>
          <a href="/ai">ייעוץ AI ואוטומציה</a>
        </>
      ) : null}
    </small>
  );
}
