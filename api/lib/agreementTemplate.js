import { DEFAULT_PRICING, PROVIDER } from "./agreementConstants.js";

export function getDefaultServiceFields() {
  return {
    service_title: "מערכת ניהול תורים וקורסים — AllInCenter",
    service_description:
      "מערכת SaaS לניהול תורים, קורסים, לקוחות ותשלומים לעסקים קטנים ובינוניים. כוללת לוח שנה, תזכורות אוטומטיות, ניהול צוות, דוחות וממשק לקוחות.",
    service_included: [
      "הקמת מערכת מותאמת לעסק הלקוח",
      "לוח תורים וניהול קורסים/סדנאות",
      "ניהול לקוחות, היסטוריה ותזכורות SMS/אימייל",
      "ממשק ניהול לבעל העסק ולצוות",
      "חיבור לתשלומים (ביט / PayBox / אשראי לפי הצורך)",
      "תמיכה טכנית בחודש הראשון",
      "גיבוי נתונים שוטף",
    ].join("\n"),
    service_excluded: [
      "עלויות SMS/וואטסאפ מעבר לחבילה המוסכמת",
      "פיתוחים מותאמים אישית מעבר להיקף ההסכם",
      "רישיונות צד שלישי (דומיין, אחסון פרימיום וכו')",
      "שיווק, תוכן וצילומים",
      "ייעוץ משפטי/חשבונאי",
    ].join("\n"),
    payment_terms:
      `עלות הקמה חד-פעמית: ₪${DEFAULT_PRICING.setup}. תחזוקה חודשית (חודש ראשון): ₪${DEFAULT_PRICING.monthly}. התשלום יבוצע בהעברה בנקאית, ביט או אמצעי תשלום מוסכם. אי-תשלום במועד עלול לעכב הפעלת השירות.`,
    delivery_timeline:
      "הקמת המערכת: 7–14 ימי עסקים ממועד אישור ההסכם וקבלת כל החומרים הנדרשים. הדרכה ראשונית: בתוך 3 ימי עסקים מההקמה.",
  };
}

export function buildAgreementSections(agreement) {
  const provider = PROVIDER.name;
  const setup = Number(agreement.setup_cost) || DEFAULT_PRICING.setup;
  const monthly = Number(agreement.monthly_cost) || DEFAULT_PRICING.monthly;
  const business = agreement.client_business_name || "[שם העסק]";
  const contact = agreement.client_contact_name || "[שם איש קשר]";

  const defaults = getDefaultServiceFields();

  return [
    {
      id: "service_description",
      title: "תיאור השירות",
      body:
        agreement.service_description ||
        defaults.service_description.replace("לעסק הלקוח", `לעסק ${business}`),
    },
    {
      id: "included",
      title: "מה כלול",
      body: agreement.service_included || defaults.service_included,
    },
    {
      id: "excluded",
      title: "מה לא כלול",
      body: agreement.service_excluded || defaults.service_excluded,
    },
    {
      id: "costs",
      title: "עלויות ותשלומים",
      body:
        agreement.payment_terms ||
        `עלות הקמה חד-פעמית: ₪${setup}. תחזוקה חודשית (חודש ראשון): ₪${monthly}. סה"כ לתשלום עם חתימה: ₪${setup + monthly}. ${defaults.payment_terms.split(". ").slice(2).join(". ")}`,
    },
    {
      id: "timeline",
      title: "לוחות זמנים",
      body: agreement.delivery_timeline || defaults.delivery_timeline,
    },
    {
      id: "warranty",
      title: "אחריות ותמיכה",
      body: `נותן השירות (${provider}) מתחייב לתמיכה טכנית בחודש הראשון, תיקוני באגים ועדכוני אבטחה בסיסיים במסגרת התחזוקה החודשית. שינויים מהותיים, פיצ'רים חדשים או עבודות מעבר להיקף — יתומחרו בנפרד.`,
    },
    {
      id: "cancellation",
      title: "ביטול התקשרות",
      body: "ניתן לבטל את ההסכם בהודעה מראש של 14 יום, בכפוף לתשלום עבור עבודה שבוצעה עד מועד הביטול. תשלומי תחזוקה שוטפת ניתנים להפסקה בהודעה של 30 יום מראש.",
    },
    {
      id: "privacy",
      title: "פרטיות ואבטחת מידע",
      body: "נותן השירות מתחייב לשמור על סודיות מידע עסקי ואישי של הלקוח, לפעול בהתאם לחוק הגנת הפרטיות, וליישם אמצעי אבטחה סבירים (הצפנה, גיבויים, בקרת גישה).",
    },
    {
      id: "ownership",
      title: "בעלות על נתונים ותוכן",
      body: `הלקוח (${business}) הוא הבעלים של הנתונים והתוכן שהוא מזין למערכת. לאחר תשלום מלא, הלקוח מקבל רישיון שימוש במערכת. קוד, עיצובים ורכיבים שפותחו על ידי ${provider} — יועברו ללקוח בהתאם להסכם.`,
    },
    {
      id: "approval",
      title: "אישור וחתימה",
      body: `הסכם זה נערך בין ${provider} לבין ${business} (${contact}). בחתימה דיגיטלית, סימון תיבת האישור ומילוי פרטי החותם — הלקוח מאשר/ת שקרא/ה את תנאי הסכם זה ומסכים/ה להם.`,
    },
  ];
}

export function buildPlainTextAgreement(agreement) {
  const sections = buildAgreementSections(agreement);
  const header = [
    agreement.service_title || "הסכם שירות — AllInCenter",
    `עסק: ${agreement.client_business_name || ""}`,
    `איש קשר: ${agreement.client_contact_name || ""}`,
    `נותן שירות: ${PROVIDER.name}`,
    "",
  ].join("\n");

  const body = sections.map((s) => `${s.title}\n${s.body}`).join("\n\n");
  return `${header}${body}`;
}
