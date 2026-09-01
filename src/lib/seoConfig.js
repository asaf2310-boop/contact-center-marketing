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
  "/appointment-management": {
    title: "מערכת ניהול וזימון תורים לעסקים | AllInCenter",
    description:
      "מערכת ניהול וזימון תורים לעסקים בישראל עם הזמנה אונליין, ניהול לקוחות, תזכורות, תשלומים ואוטומציות — בהתאמה לתהליך העבודה של העסק.",
    canonical: `${SITE.url}/appointment-management`,
    ogImage: SITE.logo,
    twitterCard: "summary",
    jsonLd: graph([
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/appointment-management#webpage`,
        url: `${SITE.url}/appointment-management`,
        name: "מערכת ניהול וזימון תורים לעסקים | AllInCenter",
        description:
          "מערכת ניהול וזימון תורים לעסקים בישראל עם הזמנה אונליין, ניהול לקוחות, תזכורות, תשלומים ואוטומציות — בהתאמה לתהליך העבודה של העסק.",
        inLanguage: SITE.language,
        isPartOf: { "@id": websiteId },
        about: { "@id": `${SITE.url}/appointment-management#service` },
      },
      {
        "@type": "Service",
        "@id": `${SITE.url}/appointment-management#service`,
        name: "מערכת ניהול וזימון תורים לעסקים",
        description:
          "מערכת לזימון תורים אונליין ולניהול תורים, לקוחות, תשלומים ואוטומציות עבור עסקים בישראל.",
        provider: { "@id": orgId },
        areaServed: SITE.areaServed,
        url: `${SITE.url}/appointment-management`,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE.url}/appointment-management#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "דף הבית", item: `${SITE.url}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "מערכת ניהול וזימון תורים לעסקים",
            item: `${SITE.url}/appointment-management`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/appointment-management#faq`,
        mainEntity: [
          ["מהי מערכת ניהול וזימון תורים?", "מערכת שמרכזת קביעת תורים אונליין, ניהול יומן ומידע על לקוחות במקום אחד."],
          ["למי מתאימה מערכת זימון תורים של AllInCenter?", "לקוסמטיקאיות ועסקי יופי, מטפלים עצמאיים, קליניקות, נותני שירות ועסקים קטנים שמנהלים תורים."],
          ["האם הלקוחות יכולים לקבוע תור לבד?", "כן. הלקוחות יכולים לבחור שירות וזמן פנוי ולקבוע תור אונליין."],
          ["האם אפשר לנהל גם לקוחות ולא רק תורים?", "כן. המערכת משלבת ניהול לקוחות עם התורים והפעילות השוטפת של העסק."],
          ["האם המערכת מתאימה לקוסמטיקאיות ומטפלים?", "כן. ניתן להתאים את סוגי השירותים, זמני הפעילות ותהליך קביעת התור לעסקי יופי ולטיפולים."],
          ["האם ניתן להתאים את המערכת לתהליך העבודה של העסק?", "כן. המערכת מותאמת לסוגי השירותים, זמני הפעילות, אופן קביעת התורים והפעולות הנדרשות לאחר ההזמנה."],
          ["האם המערכת מתאימה לעסקים בישראל?", "כן. AllInCenter מפתחת את המערכת עבור עסקים בישראל ובממשק עברי."],
        ].map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text },
        })),
      },
    ]),
  },
  "/restaurant-reservations": {
    title: "מערכת הזמנות למסעדות | AllInCenter",
    description:
      "מערכת הזמנות וניהול שולחנות למסעדות בישראל, עם הזמנה אונליין ללקוחות, ניהול הזמנות, שולחנות ותהליך העבודה במקום אחד.",
    canonical: `${SITE.url}/restaurant-reservations`,
    ogImage: SITE.logo,
    twitterCard: "summary",
    jsonLd: graph([
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/restaurant-reservations#webpage`,
        url: `${SITE.url}/restaurant-reservations`,
        name: "מערכת הזמנות למסעדות | AllInCenter",
        description:
          "מערכת הזמנות וניהול שולחנות למסעדות בישראל, עם הזמנה אונליין ללקוחות, ניהול הזמנות, שולחנות ותהליך העבודה במקום אחד.",
        inLanguage: SITE.language,
        isPartOf: { "@id": websiteId },
        about: { "@id": `${SITE.url}/restaurant-reservations#service` },
      },
      {
        "@type": "Service",
        "@id": `${SITE.url}/restaurant-reservations#service`,
        name: "מערכת הזמנות למסעדות",
        description:
          "מערכת להזמנה וניהול שולחנות במסעדות, כולל הזמנה אונליין וניהול הזמנות מתוך ממשק אחד.",
        provider: { "@id": orgId },
        areaServed: SITE.areaServed,
        url: `${SITE.url}/restaurant-reservations`,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE.url}/restaurant-reservations#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "דף הבית", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "מערכת הזמנות למסעדות", item: `${SITE.url}/restaurant-reservations` },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/restaurant-reservations#faq`,
        mainEntity: [
          ["מהי מערכת הזמנות למסעדות?", "מערכת שמאפשרת לאורחים להזמין שולחן אונליין ולמסעדה לנהל את ההזמנות והשולחנות מתוך ממשק אחד."],
          ["האם האורחים יכולים להזמין שולחן אונליין?", "כן. האורחים יכולים לבחור מספר סועדים, תאריך, שעה ואזור ישיבה בתהליך הזמנה דיגיטלי."],
          ["האם ניתן לנהל את ההזמנות מתוך מערכת אחת?", "כן. מסכי הניהול מרכזים את ההזמנות ואת תמונת המצב של המסעדה במקום אחד."],
          ["האם המערכת כוללת ניהול שולחנות?", "כן. המערכת כוללת מפת שולחנות ומסכי ניהול שמאפשרים לצוות לראות ולנהל את מצב ההושבה."],
          ["האם המערכת מתאימה למסעדות בישראל?", "כן. המערכת מיועדת למסעדות בישראל וכוללת ממשק בעברית."],
          ["האם ניתן להתאים את מערכת ההזמנות לצורת העבודה של המסעדה?", "כן. ניתן להתאים את תהליך ההזמנה והניהול לאופן העבודה של המסעדה."],
          ["האם המערכת מחליפה ניהול ידני של הזמנות?", "המערכת מרכזת את תהליך ההזמנה והניהול הדיגיטלי וכך מפחיתה את הצורך לנהל מידע ידנית בין מקומות שונים."],
        ].map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
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
