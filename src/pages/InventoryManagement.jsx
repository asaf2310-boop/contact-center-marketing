import React from "react";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppLink from "@/components/WhatsAppLink";
import InstagramLink from "@/components/InstagramLink";
import { inventoryFaqs } from "@/data/inventoryFaq";

const inventory = [
  ["מוצרים, וריאציות וברקודים", "קטלוג מוצרים עם וריאציות, ברקודים וקטגוריות."],
  ["כל שינוי במלאי מתועד", "קליטת סחורה, מכירות, החזרות והעברות בין מחסנים נרשמות כתנועות. תיקון מלאי ידני מחייב ציון סיבה."],
  ["מלאי לפי מחסן", "רמות מינימום והתראות לכל מוצר, ומלאי שנשמר בנפרד בכל מחסן."],
  ["סריקת ברקוד באייפון", "סורקים במצלמה כדי לאתר מוצר. הסריקה לא משנה מלאי עד שמאשרים את הפעולה."],
  ["מניעת מלאי שלילי", "כברירת מחדל מכירה שתוריד את המלאי מתחת לאפס נחסמת. עסק יכול להגדיר אחרת."],
];

const priceguard = [
  ["הסכמי ספקים ומחירונים", "מעלים מחירון מקובץ Excel או CSV, או מדביקים אותו, ומאשרים אותו לפני שהוא נכנס לשימוש."],
  ["השוואה לכל שורה בחשבונית", "כל שורה בחשבונית ספק מושווית למחיר שסוכם."],
  ["חיוב יתר מאומת מול פריט לבדיקה", "חיובי יתר שאומתו מופרדים מפריטים שעדיין דורשים בדיקה, כדי שלא תתווכחו עם ספק על בסיס ניחוש."],
  ["מעקב אחרי זיכויים", "פותחים תביעת זיכוי ועוקבים אחרי כסף שמגיע לכם מהספק."],
];

const team = [
  ["דוחות חודשיים", "שווי מלאי, תנועות ותוצאות PriceGuard לפי חודש."],
  ["תפקידים והרשאות", "בעלים, מנהל, מנהל מלאי, עובד וצפייה."],
  ["כמה עסקים בחשבון אחד", "הנתונים של כל עסק נשמרים בנפרד לחלוטין."],
  ["עברית, אנגלית וערבית", "ממשק בעברית מימין לשמאל, עם אנגלית וערבית."],
];

function List({ items }) {
  return (
    <div className="appointment-pain-list">
      {items.map(([title, text], index) => (
        <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>
      ))}
    </div>
  );
}

export default function InventoryManagement() {
  return (
    <div className="page appointment-editorial inventory-page" dir="rtl">
      <SiteHeader />
      <main>
        <section className="appointment-product-hero" aria-labelledby="inventory-title">
          <div className="appointment-product-hero__copy">
            <span className="editorial-index">01 / STOCK</span>
            <p className="appointment-product-hero__eyebrow">Stock + PriceGuard · לפני השקה פומבית</p>
            <h1 id="inventory-title">ניהול מלאי לעסקים<br /><span>ובקרת מחירי ספקים</span></h1>
            <p className="appointment-product-hero__lead">Stock היא מערכת של AllInCenter לניהול מלאי בזמן אמת לעסקים קטנים ובינוניים, עם PriceGuard שמשווה כל חשבונית ספק למחיר שסוכם.</p>
            <p className="stock-prelaunch-note">Stock עדיין לא זמינה לציבור. העמוד מתאר את היכולות של המערכת כפי שהיא בפיתוח, לפני ההשקה. אפשר להשאיר פרטים ונעדכן כשתהיה זמינה.</p>
            <div className="appointment-actions">
              <a className="btn btn--primary" href="/#contact">לעדכון על ההשקה <ArrowLeft size={18} /></a>
              <a className="btn btn--ghost" href="/systems">כל המערכות של AllInCenter</a>
            </div>
          </div>
        </section>

        <section className="therapist-section" aria-labelledby="inventory-core-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">02 / INVENTORY</span>
            <h2 id="inventory-core-title">מלאי שאפשר לסמוך עליו</h2>
            <p>כשהמלאי מנוהל בגיליונות או בזיכרון, קשה לדעת מה באמת יש ומה השתנה. ב-Stock כל שינוי נרשם, ולכל שינוי יש תנועה שאפשר לחזור אליה.</p>
          </div>
          <List items={inventory} />
        </section>

        <section className="therapist-section therapist-section--rule" aria-labelledby="inventory-priceguard-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">03 / PRICEGUARD</span>
            <h2 id="inventory-priceguard-title">PriceGuard: האם הספק חייב לפי מה שסוכם?</h2>
            <p>עסקים רבים מקבלים חשבוניות ומשלמים בלי להשוות כל שורה למחיר שסוכם. PriceGuard עושה את ההשוואה ומפריד בין מה שאומת למה שעדיין דורש בדיקה.</p>
          </div>
          <List items={priceguard} />
        </section>

        <section className="therapist-section therapist-section--rule" aria-labelledby="inventory-team-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">04 / TEAM</span>
            <h2 id="inventory-team-title">דוחות, צוות וכמה עסקים</h2>
          </div>
          <List items={team} />
        </section>

        <section className="therapist-section therapist-section--rule" aria-labelledby="inventory-status-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">05 / STATUS</span>
            <h2 id="inventory-status-title">מה המצב כרגע</h2>
            <p>Stock נמצאת לפני השקה פומבית, ולכן אין כאן מחירון או כפתור הורדה. מה שמופיע בעמוד הוא רק מה שהמערכת עושה בפועל. מערכות AllInCenter הפעילות כיום הן <a href="/appointment-management">מערכת ניהול תורים</a> ו<a href="/restaurant-reservations">מערכת הזמנות למסעדות</a>, ואפשר לראות את כולן ב<a href="/systems">עמוד המערכות</a>. לתהליכים שחוזרים על עצמם בעסק יש גם <a href="/ai">אוטומציה ו-AI לעסקים</a>.</p>
          </div>
        </section>

        <section className="appointment-conversion" aria-labelledby="inventory-cta-title">
          <span className="editorial-index">06 / NEXT STEP</span>
          <h2 id="inventory-cta-title">מנהלים מלאי ורוצים לשמוע כשהמערכת תהיה זמינה?</h2>
          <p>ספרו לנו איך אתם מנהלים מלאי וספקים היום, ונבדוק אם Stock מתאימה לעסק.</p>
          <div className="appointment-actions">
            <a className="btn btn--primary" href="/#contact">השאירו פרטים <ArrowLeft size={18} /></a>
            <WhatsAppLink className="appointment-conversion__guide" location="inventory-management" message="היי, אשמח לשמוע על מערכת Stock לניהול מלאי כשתושק">דברו איתנו ב-WhatsApp</WhatsAppLink>
          </div>
          <InstagramLink className="instagram-follow" location="inventory-management">עקבו אחרינו באינסטגרם</InstagramLink>
        </section>

        <section className="appointment-faq" aria-labelledby="inventory-faq-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">07 / FAQ</span>
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
