import { SITE } from "@/lib/site";

const orgId = `${SITE.url}/#organization`;
const websiteId = `${SITE.url}/#website`;

export const organizationSchema = {
  "@type": "Organization",
  "@id": orgId,
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phoneIntl,
  areaServed: SITE.areaServed,
  logo: SITE.logo,
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  name: SITE.name,
  url: SITE.url,
  inLanguage: SITE.language,
  publisher: { "@id": orgId },
};

const homeServices = [
  {
    name: "מערכות ניהול מותאמות",
    description: "בניית מערכות ניהול מותאמות לעסק: תשלומים, לקוחות, תורים ולידים במקום אחד.",
  },
  {
    name: "מערכת ניהול וזימון תורים",
    description: "קביעת תורים אונליין, יומן חכם, הזמנת תור עצמאית ללקוח וניהול תורים לעסקי שירות.",
  },
  {
    name: "ניהול לקוחות",
    description: "כרטיס לקוח, היסטוריה, תורים, תשלומים ותקשורת במערכת אחת.",
  },
  {
    name: "אוטומציות לעסקים",
    description: "תזכורות, אישורי תורים וזרימות עבודה אוטומטיות שחוסכות עבודה ידנית.",
  },
  {
    name: "ניהול לידים",
    description: "איתור לידים ממפות Google, ניקוד הזדמנויות וניהול הלידים עד לסגירה.",
  },
];

function serviceGraph() {
  return homeServices.map((service) => ({
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: { "@id": orgId },
    areaServed: SITE.areaServed,
    url: SITE.url,
  }));
}

function graph(extra = []) {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, ...extra],
  };
}

export const routeSeo = {
  "/": {
    title: "AllInCenter | מערכות ניהול, זימון תורים ואוטומציה לעסקים",
    description:
      "AllInCenter מספקת מערכות ניהול מותאמות לעסקים בישראל, כולל זימון תורים, ניהול לקוחות, אוטומציות, לידים ותהליכים עסקיים.",
    canonical: `${SITE.url}/`,
    ogImage: SITE.logo,
    twitterCard: "summary",
    jsonLd: graph([websiteSchema, ...serviceGraph()]),
  },
  "/lp": {
    title: "AllInCenter | מערכת ניהול מותאמת לעסק — תורים, לקוחות ותשלומים",
    description:
      "מערכת אחת לניהול העסק בישראל: זימון תורים, לקוחות, תשלומים ואוטומציות. קבעו הדגמה חינם והתאימו את המערכת לתהליך שלכם.",
    canonical: `${SITE.url}/lp`,
    ogImage: SITE.logo,
    twitterCard: "summary",
    jsonLd: graph(),
  },
  "/pricing": {
    title: "מחירון AllInCenter | מערכות ניהול וזימון תורים לעסקים",
    description: "חבילות AllInCenter למערכות זימון תורים, ניהול לקוחות, אוטומציות וכלים לניהול העסק.",
    canonical: `${SITE.url}/pricing`,
    ogImage: SITE.logo,
    twitterCard: "summary",
    jsonLd: graph(),
  },
  "/ai": {
    title: "אסף אריאלי | AI & Automation Project Manager",
    description:
      "ייעוץ, ניהול והובלת פרויקטי AI ואוטומציה לחברות וארגונים — משלב זיהוי ההזדמנות והאפיון ועד לפיתוח והטמעה בפועל.",
    canonical: `${SITE.url}/ai`,
    ogImage: `${SITE.url}/assets/asaf-ariely.png`,
    twitterCard: "summary",
    jsonLd: graph(),
  },
  "/about": {
    title: "מי אנחנו | AllInCenter",
    description:
      "הכירו את AllInCenter ואת אסף אריאלי, שמאחורי פיתוח מערכות ניהול, אוטומציה ופתרונות מותאמים לעסקים בישראל.",
    canonical: `${SITE.url}/about`,
    ogImage: SITE.logo,
    twitterCard: "summary",
    jsonLd: graph([
      {
        "@type": "AboutPage",
        "@id": `${SITE.url}/about#webpage`,
        url: `${SITE.url}/about`,
        name: "מי אנחנו | AllInCenter",
        description:
          "הכירו את AllInCenter ואת אסף אריאלי, שמאחורי פיתוח מערכות ניהול, אוטומציה ופתרונות מותאמים לעסקים בישראל.",
        inLanguage: SITE.language,
        about: { "@id": orgId },
        isPartOf: { "@id": websiteId },
      },
    ]),
  },
  "/allincenter-pelecard": {
    title: "AllInCenter + Pelecard | מערכת ניהול וסליקה לעסקים",
    description: "פתרון משולב של AllInCenter ו-Pelecard לניהול העסק, תשלומים, לקוחות ותהליכים במקום אחד.",
    canonical: `${SITE.url}/allincenter-pelecard`,
    ogImage: `${SITE.url}/assets/og-allincenter-pelecard.png`,
    twitterCard: "summary_large_image",
    jsonLd: graph(),
  },
};

export const prerenderPaths = Object.keys(routeSeo);

export const notFoundSeo = {
  title: "העמוד לא נמצא | AllInCenter",
  description: "העמוד שחיפשתם לא נמצא באתר AllInCenter. חזרו לדף הבית או צרו קשר.",
  canonical: null,
  robots: "noindex, nofollow",
  ogImage: SITE.logo,
  twitterCard: "summary",
  jsonLd: graph(),
};

export function getRouteSeo(pathname) {
  const trimmed = pathname.replace(/\/+$/, "");
  const normalized = trimmed === "" ? "/" : trimmed;
  return routeSeo[normalized] || notFoundSeo;
}
