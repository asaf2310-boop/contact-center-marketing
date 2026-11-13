import React from "react";
import { ArrowLeft, Check } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppLink from "@/components/WhatsAppLink";
import InstagramLink from "@/components/InstagramLink";
import ContactForm from "@/components/ContactForm";
import { inventoryFaqs } from "@/data/inventoryFaq";

const shot = (name) => `/assets/stock/stock-${name}.webp`;
const shotSet = (name) => `${shot(name)} 600w, /assets/stock/stock-${name}@900.webp 900w`;

function Phone({ name, alt, caption, eager = false }) {
  return (
    <figure className="stock-phone">
      <img src={shot(name)} srcSet={shotSet(name)} sizes="(max-width: 700px) 30vw, 260px" alt={alt} width="600" height="1304" loading={eager ? "eager" : "lazy"} decoding="async" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

const problems = [
  {
    problem: "לא ברור כמה באמת יש מכל מוצר",
    solution: "Stock מציגה מלאי לפי מחסן, רמת מינימום לכל מוצר והתראה על מוצרים שירדו מתחת למינימום.",
    product: "Stock",
  },
  {
    problem: "שינוי במלאי בלי לדעת מי עשה אותו ולמה",
    solution: "כל קליטה, מכירה, החזרה והעברה בין מחסנים נרשמות כתנועה. תיקון ידני מחייב ציון סיבה.",
    product: "Stock",
  },
  {
    problem: "חשבוניות ספק משולמות בלי להשוות כל שורה למחיר שסוכם",
    solution: "PriceGuard משווה כל שורה בחשבונית להסכם ולמחירון, ומפרידה בין חיוב יתר מאומת לפריטים שעדיין דורשים בדיקה.",
    product: "PriceGuard",
  },
];

const stockPoints = [
  "קטלוג מוצרים עם וריאציות, ברקודים וקטגוריות. חיפוש לפי שם, מק״ט או ברקוד",
  "ייבוא מוצרים וייצוא ל-CSV",
  "אצוות ותאריכי תוקף. מכירות יורדות קודם מהאצווה שתוקפה הקרוב ביותר",
  "סריקת ברקוד במצלמת האייפון. הסריקה לא משנה מלאי עד שמאשרים את הפעולה",
  "כברירת מחדל מכירה שתוריד את המלאי מתחת לאפס נחסמת. עסק יכול להגדיר אחרת",
  "דוח שווי מלאי לפי עלות ולפי מחיר מכירה, ודוח תנועות ומכירות",
];

const priceguardSteps = [
  ["הסכם ומחירון", "מעלים מחירון מקובץ Excel או CSV, או מדביקים אותו, ומאשרים אותו לפני שהוא נכנס לשימוש."],
  ["חשבונית ספק", "מזינים את החשבונית עם הכמויות והמחירים שחויבתם."],
  ["השוואה לכל שורה", "כל שורה מושווית למחיר שסוכם. התוצאה: תואם, חיוב יתר מאומת, חשד לחיוב יתר, אין מספיק ראיות או חיוב חסר."],
  ["מעקב אחרי זיכוי", "פותחים תביעת זיכוי ועוקבים. סכום חיוב יתר הוא פוטנציאלי עד שנרשם זיכוי מהספק."],
];

export default function InventoryManagement() {
  return (
    <div className="page appointment-editorial inventory-page" dir="rtl">
      <SiteHeader />
      <main>
        <section className="stock-hero" aria-labelledby="inventory-title">
          <div className="stock-hero__copy">
            <p className="stock-hero__eyebrow">Stock + PriceGuard · לפני השקה פומבית · לעסקים קטנים ובינוניים</p>
            <h1 id="inventory-title">מערכת ניהול מלאי לעסקים<br /><span>שבודקת גם שהספק חייב לפי מה שסוכם</span></h1>
            <p className="stock-hero__lead">Stock מראה כמה יש מכל מוצר ומתעדת כל שינוי. PriceGuard משווה כל שורה בחשבונית ספק למחיר שסוכם ומסמנת חיוב יתר.</p>
            <div className="appointment-actions">
              <a className="btn btn--primary" href="#waitlist" data-analytics-event="stock_waitlist_cta_click" data-analytics-location="hero">הצטרפו לרשימת ההשקה <ArrowLeft size={18} /></a>
              <a className="btn btn--ghost" href="#screens" data-analytics-event="stock_screens_click" data-analytics-location="hero">איך זה נראה</a>
            </div>
            <ul className="stock-facts" aria-label="עובדות על המערכת">
              <li><Check size={15} aria-hidden="true" />בעברית, מימין לשמאל</li>
              <li><Check size={15} aria-hidden="true" />אפליקציית iPhone</li>
              <li><Check size={15} aria-hidden="true" />כל שינוי מתועד</li>
              <li><Check size={15} aria-hidden="true" />מלאי לפי מחסן</li>
            </ul>
            <p className="stock-prelaunch-note">Stock עדיין לא זמינה לציבור. אפשר להצטרף לרשימת ההשקה ונעדכן כשתהיה זמינה.</p>
          </div>
          <div className="stock-hero__visual">
            <Phone name="01-dashboard" eager alt="מסך הבית של Stock: מוצרים פעילים, מוצרים מתחת למינימום, שווי מלאי וחיובי יתר לבדיקה" />
            <Phone name="05-invoice-audit" eager alt="PriceGuard בודקת חשבונית ספק: חיוב יתר מאומת של 28.80 ש״ח בשורה אחת, ושורות שתואמות להסכם" />
          </div>
          <p className="stock-hero__caption">צילומי מסך מהאפליקציה. הנתונים הם נתוני הדגמה של עסק לדוגמה.</p>
        </section>

        <section className="stock-section" aria-labelledby="stock-problems-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">02 / PROBLEMS</span>
            <h2 id="stock-problems-title">שלוש בעיות שמלאי וספקים יוצרים בעסק</h2>
          </div>
          <div className="stock-problems">
            {problems.map((item) => (
              <article key={item.problem}>
                <h3>{item.problem}</h3>
                <p><strong>{item.product}:</strong> {item.solution}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="stock-section stock-section--rule" id="screens" aria-labelledby="stock-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">03 / STOCK</span>
            <h2 id="stock-title">Stock: יודעים מה יש במלאי</h2>
            <p>Stock היא שכבת המלאי: מוצרים, כמויות, מחסנים ותנועות. היא נבנתה כדי שכל מספר במלאי יהיה מוסבר.</p>
          </div>
          <div className="stock-split">
            <ul className="stock-checklist">
              {stockPoints.map((point) => <li key={point}><Check size={17} aria-hidden="true" />{point}</li>)}
            </ul>
            <div className="stock-phones">
              <Phone name="02-inventory" alt="רשימת מוצרים ב-Stock עם כמות, מחיר, מק״ט וברקוד, וחיפוש לפי שם או ברקוד" caption="רשימת מוצרים" />
              <Phone name="03-product" alt="כרטיס מוצר ב-Stock: כמות במלאי, מחיר עלות ומכירה, אצוות ותוקף ומלאי לפי מחסן" caption="כרטיס מוצר, אצוות ומחסנים" />
              <Phone name="06-reports" alt="דוח שווי מלאי ב-Stock לפי עלות ולפי מחיר מכירה, עם ייצוא ל-CSV" caption="דוח שווי מלאי" />
            </div>
          </div>
        </section>

        <section className="stock-section stock-section--rule" aria-labelledby="priceguard-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">04 / PRICEGUARD</span>
            <h2 id="priceguard-title">PriceGuard: בודקים מה שילמתם לספק</h2>
            <p>PriceGuard היא שכבת בקרת המחירים. היא משווה, ומראה ראיה לכל שורה, כדי שתדעו על מה לדבר עם הספק.</p>
          </div>
          <div className="stock-split stock-split--reverse">
            <ol className="stock-steps">
              {priceguardSteps.map(([title, text], index) => (
                <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>
              ))}
            </ol>
            <div className="stock-phones stock-phones--two">
              <Phone name="04-priceguard" alt="מסך PriceGuard: חשבוניות שנבדקו, חיוב יתר מאומת, חשד לחיוב יתר וזיכויים שהתקבלו" caption="סיכום PriceGuard" />
              <Phone name="05-invoice-audit" alt="תוצאות בדיקת מחירים לחשבונית: שורה עם חיוב יתר מאומת ושורות תואמות" caption="תוצאות בדיקת חשבונית" />
            </div>
          </div>
        </section>

        <section className="stock-section stock-section--rule" aria-labelledby="stock-team-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">05 / TEAM</span>
            <h2 id="stock-team-title">לצוות, ולכמה עסקים</h2>
          </div>
          <ul className="stock-checklist stock-checklist--wide">
            <li><Check size={17} aria-hidden="true" />הזמנת עובדים עם תפקידים והרשאות: בעלים, מנהל, מנהל מלאי, עובד וצפייה</li>
            <li><Check size={17} aria-hidden="true" />חשבון אחד יכול לנהל כמה עסקים, והנתונים של כל עסק נשמרים בנפרד</li>
            <li><Check size={17} aria-hidden="true" />כניסה לאפליקציה עם Face ID או Touch ID</li>
            <li><Check size={17} aria-hidden="true" />ממשק בעברית, אנגלית וערבית</li>
          </ul>
        </section>

        <section className="stock-section stock-section--rule stock-waitlist" id="waitlist" aria-labelledby="inventory-cta-title">
          <div className="contact-section">
            <div className="contact-section__copy">
              <span className="editorial-index">06 / PRE-LAUNCH</span>
              <h2 id="inventory-cta-title">הצטרפו לרשימת ההשקה של Stock</h2>
              <p>Stock לפני השקה פומבית, ולכן אין עדיין מחירון או הורדה. השאירו פרטים וספרו איך אתם מנהלים מלאי וספקים היום. נעדכן כשהמערכת תהיה זמינה ונבדוק יחד אם היא מתאימה לעסק.</p>
              <WhatsAppLink className="contact-section__whatsapp" location="inventory-management" message="היי, אשמח לשמוע על מערכת Stock לניהול מלאי כשתושק">דברו איתנו ב-WhatsApp</WhatsAppLink>
              <InstagramLink className="instagram-follow" location="inventory-management">עקבו אחרינו באינסטגרם</InstagramLink>
            </div>
            <ContactForm
              source="stock-prelaunch"
              defaultInterest="ניהול מלאי ובקרת מחירי ספקים (Stock, רשימת השקה)"
              hideInterest
              submitLabel="הצטרפות לרשימת ההשקה"
              messageLabel="איך אתם מנהלים מלאי וספקים היום?"
              successTitle="נרשמתם לרשימת ההשקה"
              successBody="תודה. נחזור אליכם כשהמערכת תהיה זמינה, או קודם אם נרצה לבדוק התאמה לעסק."
            />
          </div>
        </section>

        <section className="stock-section stock-section--rule" aria-labelledby="inventory-status-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">07 / MORE</span>
            <h2 id="inventory-status-title">עוד ממערכות AllInCenter</h2>
            <p>AllInCenter מפתחת מערכות ניהול לעסקים בישראל. המערכות הפעילות כיום הן <a href="/appointment-management">מערכת ניהול תורים</a> ו<a href="/restaurant-reservations">מערכת הזמנות למסעדות</a>, ואפשר לראות את כולן ב<a href="/systems">עמוד המערכות</a>. לתהליכים שחוזרים על עצמם בעסק יש גם <a href="/ai">אוטומציה ו-AI לעסקים</a>.</p>
          </div>
        </section>

        <section className="appointment-faq" aria-labelledby="inventory-faq-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">08 / FAQ</span>
            <h2 id="inventory-faq-title">שאלות לפני שמתחילים</h2>
          </div>
          <div className="appointment-faq__list">
            {inventoryFaqs.map(([question, answer], index) => (
              <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}</summary><p>{answer}</p></details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
