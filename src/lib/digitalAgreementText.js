import { AGREEMENT_PROVIDER, DEFAULT_PRICING } from "./digitalAgreementConfig";

export function getDefaultFormValues() {
  return {
    client_business_name: "",
    client_contact_name: "",
    client_email: "",
    client_phone: "",
    client_address: "",
    client_id_number: "",
    service_title: "מערכת ניהול תורים וקורסים — AllInCenter",
    service_description:
      "מערכת SaaS לניהול תורים, קורסים, לקוחות ותשלומים לעסקים קטנים ובינוניים. כוללת לוח שנה, תזכורות אוטומטיות, ניהול צוות, דוחות וממשק לקוחות.",
    service_included:
      "הקמת מערכת מותאמת לעסק\nלוח תורים וניהול קורסים/סדנאות\nניהול לקוחות, היסטוריה ותזכורות\nממשק ניהול לבעל העסק ולצוות\nחיבור לתשלומים (ביט / PayBox / אשראי)\nתמיכה טכנית בחודש הראשון\nגיבוי נתונים שוטף",
    service_excluded:
      "עלויות SMS/וואטסאפ מעבר לחבילה\nפיתוחים מותאמים מעבר להיקף\nרישיונות צד שלישי (דומיין, אחסון פרימיום)\nשיווק, תוכן וצילומים\nייעוץ משפטי/חשבונאי",
    setup_cost: DEFAULT_PRICING.setup,
    monthly_cost: DEFAULT_PRICING.monthly,
    payment_terms: `עלות הקמה חד-פעמית: ₪${DEFAULT_PRICING.setup}. תחזוקה חודשית (חודש ראשון): ₪${DEFAULT_PRICING.monthly}. התשלום יבוצע בהעברה בנקאית, ביט או אמצעי תשלום מוסכם.`,
    delivery_timeline:
      "הקמת המערכת: 7–14 ימי עסקים ממועד אישור ההסכם. הדרכה ראשונית: בתוך 3 ימי עסקים מההקמה.",
    admin_notes: "",
  };
}

export function buildAgreementSections(agreement) {
  const provider = AGREEMENT_PROVIDER.name;
  const setup = Number(agreement.setup_cost) || DEFAULT_PRICING.setup;
  const monthly = Number(agreement.monthly_cost) || DEFAULT_PRICING.monthly;
  const business = agreement.client_business_name || "[שם העסק]";
  const contact = agreement.client_contact_name || "[שם איש קשר]";

  return [
    {
      title: "תיאור השירות",
      body:
        agreement.service_description ||
        `מערכת SaaS לניהול תורים וקורסים עבור ${business}, כולל לוח שנה, תזכורות, ניהול לקוחות ותשלומים.`,
    },
    {
      title: "מה כלול",
      body: agreement.service_included || "—",
    },
    {
      title: "מה לא כלול",
      body: agreement.service_excluded || "—",
    },
    {
      title: "עלויות ותשלומים",
      body:
        agreement.payment_terms ||
        `עלות הקמה: ₪${setup}. תחזוקה חודשית (חודש ראשון): ₪${monthly}. סה"כ: ₪${setup + monthly}.`,
    },
    {
      title: "לוחות זמנים",
      body: agreement.delivery_timeline || "ייקבעו בהתאם להיקף הפרויקט.",
    },
    {
      title: "אחריות ותמיכה",
      body: `${provider} מתחייב לתמיכה טכנית, תיקוני באגים ועדכוני אבטחה במסגרת התחזוקה החודשית.`,
    },
    {
      title: "ביטול התקשרות",
      body: "ביטול בהודעה מראש של 14 יום, בכפוף לתשלום עבור עבודה שבוצעה. תחזוקה — הפסקה בהודעה של 30 יום.",
    },
    {
      title: "פרטיות ואבטחת מידע",
      body: "שמירה על סודיות מידע, התאמה לחוק הגנת הפרטיות, ואמצעי אבטחה סבירים.",
    },
    {
      title: "בעלות על נתונים ותוכן",
      body: `${business} הוא הבעלים של הנתונים והתוכן. ${provider} מעביר רישיון שימוש במערכת לאחר תשלום.`,
    },
    {
      title: "אישור וחתימה",
      body: `הסכם בין ${provider} לבין ${business} (${contact}). חתימה דיגיטלית מהווה אישור מחייב.`,
    },
  ];
}
