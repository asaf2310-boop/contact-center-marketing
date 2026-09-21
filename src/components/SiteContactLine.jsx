import React from "react";
import { SITE } from "@/lib/site";
import WhatsAppLink from "@/components/WhatsAppLink";

export default function SiteContactLine({ showAiLink = false }) {
  return (
    <div className="footer__contact">
      <div className="footer__contact-details">
        <a href={`tel:${SITE.phoneIntl}`}>{SITE.phoneDisplay}</a>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        {showAiLink ? <a href="/ai">ייעוץ AI ואוטומציה</a> : null}
      </div>
      <WhatsAppLink className="footer__whatsapp" location="footer">
        WhatsApp
      </WhatsAppLink>
    </div>
  );
}
