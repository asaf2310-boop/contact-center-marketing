export const SITE = {
  name: "AllInCenter",
  url: "https://www.allincenter.co.il",
  phone: "0502677765",
  phoneDisplay: "050-267-7765",
  phoneIntl: "+972502677765",
  email: "info@allincenter.co.il",
  logo: "https://www.allincenter.co.il/assets/allincenter-logo-clear.png",
  language: "he-IL",
  areaServed: "Israel",
};

export function getWhatsAppHref(message = "היי, אשמח לדעת עוד על המערכת לניהול העסק") {
  const digits = SITE.phoneIntl.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
}
