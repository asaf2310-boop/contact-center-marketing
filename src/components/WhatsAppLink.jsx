import React from "react";
import { handleWhatsAppLinkClick } from "@/lib/analytics";
import { getWhatsAppHref } from "@/lib/site";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function WhatsAppLink({
  href,
  location,
  className,
  children = "WhatsApp",
  showIcon = true,
  message,
  ...props
}) {
  return (
    <a
      className={className}
      href={href || getWhatsAppHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-location={location}
      data-whatsapp-track="explicit"
      onClick={handleWhatsAppLinkClick}
      {...props}
    >
      {showIcon ? <WhatsAppIcon /> : null}
      <span>{children}</span>
    </a>
  );
}
