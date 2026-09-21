import { SITE } from "@/lib/site";

const orgId = `${SITE.url}/#organization`;
const websiteId = `${SITE.url}/#website`;
const founderId = `${SITE.url}/about#asaf-ariely`;

export const organizationSchema = {
  "@type": "Organization",
  "@id": orgId,
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phoneIntl,
  areaServed: SITE.areaServed,
  logo: SITE.logo,
  description: "AllInCenter מפתחת מערכות ניהול מותאמות, אוטומציות ופתרונות AI לעסקים בישראל.",
  founder: { "@id": founderId },
};

export const founderSchema = {
  "@type": "Person",
  "@id": founderId,
  name: "אסף אריאלי",
  url: `${SITE.url}/about`,
  image: `${SITE.url}/assets/asaf-ariely.png`,
  jobTitle: "מייסד AllInCenter ומנהל Customer Experience, Operations & AI",
  worksFor: { "@id": orgId },
  knowsAbout: [
    "Customer Experience",
    "Operations",
    "Artificial Intelligence",
    "Business Automation",
    "מערכות ניהול לעסקים",
  ],
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
    description: "תזכורות, אישורי תורים וחיבור לתהליכים חוזרים, כולל אפשרות לחיבור WhatsApp בהתאם לתהליך העסק.",
  },
  {
    name: "בניית אתרים, SEO וחיבור לפניות",
    description: "בנייה או שיפור של אתר העסק, SEO וחיבור למערכת תורים, הזמנות או WhatsApp כדי להפוך חיפוש לפנייה.",
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
    "@graph": [organizationSchema, founderSchema, ...extra],
  };
}

function articleSeo({ path, title, description, breadcrumbName, faq }) {
  const url = `${SITE.url}${path}`;
  const extra = [
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: SITE.language, isPartOf: { "@id": websiteId } },
    { "@type": "Article", "@id": `${url}#article`, headline: title, description, mainEntityOfPage: { "@id": `${url}#webpage` }, publisher: { "@id": orgId }, author: { "@id": founderId }, inLanguage: SITE.language },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "AllInCenter", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "מרכז הידע", item: `${SITE.url}/guides` },
      { "@type": "ListItem", position: 3, name: breadcrumbName, item: url },
    ] },
  ];
  if (faq?.length) {
    extra.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
    });
  }
  return {
    title: `${title} | AllInCenter`,
    description,
    canonical: url,
    ogImage: SITE.logo,
    twitterCard: "summary",
    jsonLd: graph(extra),
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
    robots: "noindex, follow",
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
    jsonLd: graph([
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/ai#webpage`,
        url: `${SITE.url}/ai`,
        name: "אסף אריאלי | AI & Automation Project Manager",
        inLanguage: SITE.language,
        isPartOf: { "@id": websiteId },
        about: { "@id": founderId },
      },
      {
        "@type": "Service",
        "@id": `${SITE.url}/ai#service`,
        name: "ייעוץ, ניהול והטמעת AI ואוטומציה לעסקים",
        provider: { "@id": founderId },
        areaServed: SITE.areaServed,
        url: `${SITE.url}/ai`,
      },
    ]),
  },
  "/systems": {
    title: "מערכות AllInCenter | מערכות ניהול לעסקים",
    description: "הכירו את מערכות AllInCenter: מערכת ניהול תורים, מערכת הזמנות למסעדות ומוקד חכם — מערכות ניהול פעילות בעברית ובהתאמה לעסק.",
    canonical: `${SITE.url}/systems`, ogImage: SITE.logo, twitterCard: "summary",
    jsonLd: graph([
      { "@type":"WebPage", "@id":`${SITE.url}/systems#webpage`, url:`${SITE.url}/systems`, name:"מערכות AllInCenter", inLanguage:SITE.language, isPartOf:{"@id":websiteId} },
      { "@type":"BreadcrumbList", "@id":`${SITE.url}/systems#breadcrumb`, itemListElement:[{"@type":"ListItem",position:1,name:"דף הבית",item:`${SITE.url}/`},{"@type":"ListItem",position:2,name:"מערכות",item:`${SITE.url}/systems`}] },
      { "@type":"ItemList", name:"מערכות AllInCenter", itemListElement:[
        {"@type":"ListItem",position:1,name:"מערכת ניהול תורים",url:`${SITE.url}/appointment-management`},
        {"@type":"ListItem",position:2,name:"מערכת הזמנות למסעדות",url:`${SITE.url}/restaurant-reservations`},
        {"@type":"ListItem",position:3,name:"מוקד חכם"},
      ]},
    ]),
  },
  "/services": {
    title: "שירותי AllInCenter לעסקים | פיתוח, אוטומציה ו-AI",
    description: "שירותי AllInCenter לעסקים: מערכות תורים והזמנות, בניית ושיפור אתרים, SEO, וחיבור ל‑WhatsApp ולאוטומציות.",
    canonical: `${SITE.url}/services`, ogImage: SITE.logo, twitterCard: "summary",
    jsonLd: graph([
      { "@type":"WebPage", "@id":`${SITE.url}/services#webpage`, url:`${SITE.url}/services`, name:"שירותי AllInCenter לעסקים", inLanguage:SITE.language, isPartOf:{"@id":websiteId} },
      { "@type":"BreadcrumbList", "@id":`${SITE.url}/services#breadcrumb`, itemListElement:[{"@type":"ListItem",position:1,name:"דף הבית",item:`${SITE.url}/`},{"@type":"ListItem",position:2,name:"שירותים",item:`${SITE.url}/services`}] },
      { "@type":"ItemList", name:"שירותי AllInCenter", itemListElement:[
        {"@type":"ListItem",position:1,name:"פיתוח מערכות ניהול מותאמות"},
        {"@type":"ListItem",position:2,name:"AI ואוטומציה לעסקים",url:`${SITE.url}/ai`},
        {"@type":"ListItem",position:3,name:"בניית אתרים, SEO ונראות בחיפוש",url:`${SITE.url}/google-ai-visibility`},
        {"@type":"ListItem",position:4,name:"אינטגרציות וחיבור מערכות"},
      ]},
    ]),
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
        mainEntity: { "@id": founderId },
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
          "מערכת לזימון תורים אונליין ולניהול תורים ולקוחות, שיכולה להחליף תיאום ידני — כולל תיאום דרך WhatsApp — וניתן לחבר אותה לזרימת WhatsApp בהתאם לתהליך העסק.",
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
          ["האם המערכת מתאימה לעסקים שמנהלים תורים ב‑WhatsApp?", "כן. אפשר לעבור מתיאום ידני בצ׳אטים להזמנה אונליין ולניהול מרכזי. בהתאם לתהליך העסק, ניתן גם לחבר את הזרימה לבוט WhatsApp."],
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
          "מערכת להזמנה וניהול שולחנות במסעדות, כולל הזמנה אונליין, ניהול הזמנות מתוך ממשק אחד, ואפשרות לחבר אתר או עמוד נחיתה לתהליך ההזמנה.",
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
  "/guides": {
    title: "מרכז הידע לעסקים | AllInCenter",
    description: "מידע מעשי על מערכות ניהול, אוטומציה ו-AI לעסקים. מדריכים לבחירת מערכות, ייעול תהליכים וצמצום עבודה ידנית.",
    canonical: `${SITE.url}/guides`,
    ogImage: SITE.logo,
    twitterCard: "summary",
    jsonLd: graph([
      { "@type": "CollectionPage", "@id": `${SITE.url}/guides#webpage`, url: `${SITE.url}/guides`, name: "מרכז הידע של AllInCenter", inLanguage: SITE.language, isPartOf: { "@id": websiteId } },
      { "@type": "ItemList", "@id": `${SITE.url}/guides#itemlist`, name: "מדריכי מרכז הידע של AllInCenter", itemListElement: [
        { "@type": "ListItem", position: 1, name: "איך לבחור מערכת ניהול תורים לעסק? 8 דברים שכדאי לבדוק", url: `${SITE.url}/guides/how-to-choose-appointment-system` },
        { "@type": "ListItem", position: 2, name: "מערכת הזמנות למסעדה: מה חשוב לבדוק לפני שבוחרים?", url: `${SITE.url}/guides/restaurant-reservation-system` },
        { "@type": "ListItem", position: 3, name: "אוטומציה ו-AI לעסקים קטנים: מאיפה מתחילים?", url: `${SITE.url}/guides/ai-automation-small-business` },
        { "@type": "ListItem", position: 4, name: "SEO ונראות במנועי AI: מה עסק צריך לעשות כדי שיוכלו למצוא ולהבין אותו?", url: `${SITE.url}/guides/seo-ai-visibility-business` },
      ] },
    ]),
  },
  "/guides/how-to-choose-appointment-system": {
    title: "איך לבחור מערכת ניהול תורים לעסק? 8 דברים שכדאי לבדוק | AllInCenter",
    description: "איך בוחרים מערכת ניהול תורים לעסק? 8 דברים שכדאי לבדוק לפני שבוחרים מערכת לזימון תורים, ניהול לקוחות, תשלומים ואוטומציות.",
    canonical: `${SITE.url}/guides/how-to-choose-appointment-system`,
    ogImage: SITE.logo,
    twitterCard: "summary",
    jsonLd: graph([
      { "@type": "WebPage", "@id": `${SITE.url}/guides/how-to-choose-appointment-system#webpage`, url: `${SITE.url}/guides/how-to-choose-appointment-system`, name: "איך לבחור מערכת ניהול תורים לעסק? 8 דברים שכדאי לבדוק", description: "איך בוחרים מערכת ניהול תורים לעסק? 8 דברים שכדאי לבדוק לפני שבוחרים מערכת לזימון תורים, ניהול לקוחות, תשלומים ואוטומציות.", inLanguage: SITE.language, isPartOf: { "@id": websiteId } },
      { "@type": "Article", "@id": `${SITE.url}/guides/how-to-choose-appointment-system#article`, headline: "איך לבחור מערכת ניהול תורים לעסק? 8 דברים שכדאי לבדוק", description: "איך בוחרים מערכת ניהול תורים לעסק? 8 דברים שכדאי לבדוק לפני שבוחרים מערכת לזימון תורים, ניהול לקוחות, תשלומים ואוטומציות.", mainEntityOfPage: { "@id": `${SITE.url}/guides/how-to-choose-appointment-system#webpage` }, publisher: { "@id": orgId }, author: { "@id": founderId }, inLanguage: SITE.language },
      { "@type": "BreadcrumbList", "@id": `${SITE.url}/guides/how-to-choose-appointment-system#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: "AllInCenter", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: "מרכז הידע", item: `${SITE.url}/guides` },
        { "@type": "ListItem", position: 3, name: "איך לבחור מערכת ניהול תורים לעסק", item: `${SITE.url}/guides/how-to-choose-appointment-system` },
      ] },
    ]),
  },
  "/guides/restaurant-reservation-system": articleSeo({
    path: "/guides/restaurant-reservation-system",
    title: "מערכת הזמנות למסעדה: מה חשוב לבדוק לפני שבוחרים?",
    description: "מה לבדוק במערכת הזמנות למסעדות: הזמנת שולחן אונליין, ניהול הזמנות, מפת שולחנות והתאמה לצוות — לפני שעוברים מערכת.",
    breadcrumbName: "מערכת הזמנות למסעדה",
    faq: [
      ["האם אורחים חייבים להתקשר כדי להזמין שולחן?", "לא בהכרח. מערכת הזמנות טובה מאפשרת הזמנה דיגיטלית של שולחן, כולל בחירת מספר סועדים, תאריך ושעה. עדיין אפשר לקבל הזמנות בטלפון, אבל כדאי שהן ייכנסו לאותה תמונת מצב."],
      ["מה ההבדל בין טופס באתר לבין מערכת הזמנות?", "טופס אוסף פרטים. מערכת הזמנות מחברת את הפרטים האלה לניהול הזמנות ולעבודה עם שולחנות ואזורי ישיבה. בלי הצד של הצוות, נשארים עם רשימת בקשות שצריך לטפל בה ידנית."],
      ["האם כל מסעדה צריכה מפת שולחנות?", "לא כל מקום עובד באותו אופן. אם ההושבה פשוטה מאוד, ייתכן שמסך הזמנות מספיק. אם יש כמה אזורים, שולחנות בגדלים שונים או ערב שמשתנה לפי ביקוש — מפת שולחנות הופכת לכלי עבודה, לא לקישוט."],
      ["מה AllInCenter כוללת במערכת ההזמנות?", "הזמנת שולחן אונליין, בחירת סועדים מועד ואזור ישיבה, לוח בקרה לניהול הזמנות, ומפת שולחנות ואזורי ישיבה בממשק בעברית. אפשר להתאים את התהליך לצורת העבודה במסעדה."],
    ],
  }),
  "/guides/ai-automation-small-business": articleSeo({
    path: "/guides/ai-automation-small-business",
    title: "אוטומציה ו-AI לעסקים קטנים: מאיפה מתחילים?",
    description: "מאיפה מתחילים עם אוטומציה ו-AI לעסקים קטנים: אילו תהליכים מתאימים, איפה AI עוזר, איפה הוא מיותר, ואיך למפות תהליך לפני שמחברים כלי.",
    breadcrumbName: "אוטומציה ו-AI לעסקים קטנים",
    faq: [
      ["האם כל עסק קטן צריך AI?", "לא. עסק שחוזר על אותה פעולה פשוטה יכול להרוויח מאוטומציה של כלל, בלי מודל שפה. AI נכנס כשיש הבנה של טקסט או מיון שאי אפשר לכסות בכלל קבוע."],
      ["מאיפה מתחילים אם אין תקציב גדול?", "מתהליך אחד, מוגדר, עם קלט ופלט ברורים. עדיף לייצב פנייה־אישור־תזכורת מאשר לפזר כמה ניסיונות כלים בלי בעלים לתהליך."],
      ["האם אוטומציה מחליפה עובדים?", "המדריך הזה לא מניח כזה דבר. ברוב העסקים הקטנים המטרה היא להוריד העתקה ידנית ותיאום כפול, כדי שהצוות יטפל במה שדורש שיחה, שיקול דעת ושירות."],
      ["מה AllInCenter עושה בתחום הזה?", "AllInCenter עוזרת לאפיין תהליך, לחבר פעולות חוזרות ולהוביל פתרון AI או אוטומציה לפי הצורך העסקי — עד ההטמעה. לא כל פרויקט מתחיל במודל, ולא כל תהליך צריך כזה."],
    ],
  }),
  "/guides/seo-ai-visibility-business": articleSeo({
    path: "/guides/seo-ai-visibility-business",
    title: "SEO ונראות במנועי AI: מה עסק צריך לעשות כדי שיוכלו למצוא ולהבין אותו?",
    description: "מה עסק צריך באתר כדי שאפשר יהיה למצוא ולהבין אותו בגוגל ובמנועי AI: סריקה, תוכן, עמודי שירות, קישורים פנימיים ו-Schema — בלי הבטחה לדירוג או לאזכור.",
    breadcrumbName: "SEO ונראות במנועי AI",
    faq: [
      ["האם Schema מבטיח שאזכירו את העסק במנוע AI?", "לא. Schema יכול לעזור להבין מבנה ומידע, אם הוא תואם את העמוד. הוא לא הבטחה לציטוט, לאזכור או לתנועה ממנוע שיחה."],
      ["האם צריך אתר כדי להופיע בחיפוש?", "כן, אתר ברור הוא הבסיס. אפשר לבנות אתר חדש או לשפר אתר קיים. בלי עמודים שאפשר לסרוק ולהבין, קשה לבנות נראות יציבה."],
      ["האם נראות ב-AI מחליפה קידום בגוגל?", "לא. אלו שכבות שונות. יסודות SEO — סריקה, תוכן, עמודי שירות וקישורים — נשארים הכרחיים. מנוע AI עשוי להשתמש במקורות מהרשת, בלי התחייבות להופעה."],
      ["מה AllInCenter עושה כאן בפועל?", "בנייה או שיפור של אתר, SEO טכני ומבנה תוכן, וחיבור למסלול פנייה: טופס, WhatsApp, מערכת תורים או מערכת הזמנות — לפי תהליך העסק. בלי הבטחה לדירוג או להופעה בתשובות AI."],
    ],
  }),
  "/google-ai-visibility": {
    title: "בניית אתרים, SEO ונראות במנועי AI | AllInCenter",
    description: "בניית ושיפור אתרים לעסקים, SEO וחיבור למערכת תורים, מערכת הזמנות או WhatsApp — כדי להפוך חיפושים בגוגל ובמנועי AI לפניות וללקוחות.",
    canonical: `${SITE.url}/google-ai-visibility`,
    ogImage: SITE.logo,
    twitterCard: "summary",
    jsonLd: graph([
      { "@type": "WebPage", "@id": `${SITE.url}/google-ai-visibility#webpage`, url: `${SITE.url}/google-ai-visibility`, name: "בניית אתר, SEO וחיבור למערכת תורים או הזמנות", description: "בניית ושיפור אתרים לעסקים, SEO וחיבור למערכת תורים, מערכת הזמנות או WhatsApp — כדי להפוך חיפושים בגוגל ובמנועי AI לפניות וללקוחות.", inLanguage: SITE.language, isPartOf: { "@id": websiteId }, about: { "@id": `${SITE.url}/google-ai-visibility#service` } },
      { "@type": "Service", "@id": `${SITE.url}/google-ai-visibility#service`, name: "בניית אתרים, SEO וחיבור למסלול פניות", description: "בנייה או שיפור של אתר העסק, SEO טכני ומבנה תוכן, וחיבור לטופס, WhatsApp, מערכת תורים או מערכת הזמנות. אין הבטחה לדירוג, ללידים או להופעה בתשובות AI.", provider: { "@id": orgId }, areaServed: SITE.areaServed, url: `${SITE.url}/google-ai-visibility` },
      { "@type": "BreadcrumbList", "@id": `${SITE.url}/google-ai-visibility#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: "דף הבית", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: "בניית אתרים, SEO ונראות במנועי AI", item: `${SITE.url}/google-ai-visibility` },
      ] },
      { "@type": "FAQPage", "@id": `${SITE.url}/google-ai-visibility#faq`, mainEntity: [
        ["האם אפשר להבטיח מקום ראשון בגוגל?", "לא. אף גורם רציני אינו יכול להבטיח מיקום ראשון, לידים או הכללה בתשובות של מנועי AI. אנחנו בונים אתר ותשתית SEO ומחזקים את הסיכוי להופיע בחיפושים רלוונטיים לאורך זמן."],
        ["כמה זמן לוקח לראות תוצאות?", "נראות אורגנית נבנית בהדרגה ותלויה בתחרות, באתר הקיים, בתוכן ובגורמים נוספים. אין לוח זמנים מובטח."],
        ["האם אתם מנהלים Google Business או ביקורות?", "לא. השירות מתמקד באתר, ב‑SEO ובחיבור למסלול פנייה או הזמנה. ניהול פרופיל Google Business או ביקורות אינו חלק מהשירות."],
        ["האם אפשר לקדם עסק גם ב‑ChatGPT?", "אי אפשר להבטיח הכללה בתשובות. אפשר לבנות אתר ומידע ציבורי ברורים שמקלים על מנועי AI לגלות ולהבין את העסק."],
        ["האם חייבים אתר?", "כן, זה הבסיס. אפשר לבנות אתר חדש או לשפר אתר קיים כחלק מהשירות."],
        ["האם אפשר לחבר את האתר למערכת תורים או ל‑WhatsApp?", "כן. ניתן לחבר את האתר לטופס, לבוט WhatsApp, למערכת תורים או למערכת הזמנות — בהתאם לתהליך העסק."],
        ["למי השירות מתאים?", "לעסקים מקומיים ונותני שירות שלקוחות מחפשים לפי שירות ואזור, ורוצים מסלול ברור מחיפוש לפנייה או הזמנה."],
      ].map(([name,text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
    ]),
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
