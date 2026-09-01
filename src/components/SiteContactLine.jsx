import React from "react";
import { SITE } from "@/lib/site";

export default function SiteContactLine({ showAiLink = false }) {
  return (
    <small className="footer__contact">
      <a href={`tel:${SITE.phoneIntl}`}>{SITE.phoneDisplay}</a>
      <span aria-hidden="true"> · </span>
      <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      {showAiLink ? (
        <>
          <span aria-hidden="true"> · </span>
          <a href="/ai">ייעוץ AI ואוטומציה</a>
        </>
      ) : null}
    </small>
  );
}
