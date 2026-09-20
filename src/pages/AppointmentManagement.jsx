import React from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Bell,
  CalendarCheck,
  CalendarDays,
  Check,
  CreditCard,
  ExternalLink,
  MessageCircle,
  SlidersHorizontal,
  UserRound,
  Zap,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const demoRoot = import.meta.env.VITE_MAYACLINIC_DEMO_URL || "https://mayaclinic-demo.vercel.app";
const bookingDemoUrl = `${demoRoot.replace(/\/$/, "")}/book`;
const adminDemoUrl = `${demoRoot.replace(/\/$/, "")}/admin`;

const capabilities = [
  { icon: CalendarCheck, title: "ניהול וזימון תורים", text: "מרכזים את התורים ביומן אחד ומנהלים את הפעילות השוטפת בצורה מסודרת." },
  { icon: CalendarDays, title: "קביעת תור עצמאית", text: "לקוחות יכולים לבחור שירות וזמן פנוי ולקבוע תור אונליין, בלי תיאום ידני בכל הזמנה." },
  { icon: UserRound, title: "ניהול לקוחות", text: "שומרים את פרטי הלקוח והיסטוריית התורים לצד הפעילות הרלוונטית עבורו." },
  { icon: Bell, title: "תזכורות", text: "משלבים תזכורות ואישורי תורים כחלק מתהליך עבודה שמפחית מעקב ידני." },
  { icon: CreditCard, title: "תשלומים וקישורי תשלום", text: "עוקבים אחר תשלומים ומשלבים קישורי תשלום כחלק מתהליך השירות והניהול." },
  { icon: Zap, title: "אוטומציות", text: "מחברים פעולות חוזרות לזרימת עבודה אוטומטית כדי לחסוך זמן תפעולי." },
  { icon: CalendarDays, title: "ניהול יומן", text: "מנהלים זמינות, שעות פעילות ותמונה ברורה של התורים מתוך ממשק אחד." },
  { icon: SlidersHorizontal, title: "התאמה לעסק", text: "מתאימים את סוגי השירותים ואת תהליך העבודה לצרכים האמיתיים של העסק." },
];

const audiences = [
  ["קוסמטיקאיות ועסקי יופי", "טיפולים, זמינות ופרטי לקוחות כבר לא צריכים להתפזר בין היומן לשיחות."],
  ["מטפלים עצמאיים", "לקוחות יכולים לבחור מועד פנוי, בזמן שהיומן והמידע נשארים מסודרים במקום אחד."],
  ["קליניקות", "מרכזים תורים, לקוחות ותשלומים כחלק מתהליך עבודה רציף וברור."],
  ["נותני שירות", "מפחיתים את סבב ההודעות סביב כל מועד ומנהלים את המשך השירות מתוך המערכת."],
  ["עסקים קטנים שמנהלים תורים", "עוברים מתיאום ידני לממשק עברי שניתן להתאים לתהליך הקיים בעסק."],
];

const faqs = [
  ["מהי מערכת ניהול וזימון תורים?", "מערכת שמרכזת קביעת תורים אונליין, ניהול יומן ומידע על לקוחות במקום אחד."],
  ["למי מתאימה מערכת זימון תורים של AllInCenter?", "לקוסמטיקאיות ועסקי יופי, מטפלים עצמאיים, קליניקות, נותני שירות ועסקים קטנים שמנהלים תורים."],
  ["האם הלקוחות יכולים לקבוע תור לבד?", "כן. הלקוחות יכולים לבחור שירות וזמן פנוי ולקבוע תור אונליין."],
  ["האם אפשר לנהל גם לקוחות ולא רק תורים?", "כן. המערכת משלבת ניהול לקוחות עם התורים והפעילות השוטפת של העסק."],
  ["האם המערכת מתאימה לקוסמטיקאיות ומטפלים?", "כן. ניתן להתאים את סוגי השירותים, זמני הפעילות ותהליך קביעת התור לעסקי יופי ולטיפולים."],
  ["האם ניתן להתאים את המערכת לתהליך העבודה של העסק?", "כן. המערכת מותאמת לסוגי השירותים, זמני הפעילות, אופן קביעת התורים והפעולות הנדרשות לאחר ההזמנה."],
  ["האם המערכת מתאימה לעסקים בישראל?", "כן. AllInCenter מפתחת את המערכת עבור עסקים בישראל ובממשק עברי."],
  ["האם המערכת מתאימה לעסקים שמנהלים תורים ב‑WhatsApp?", "כן. אפשר לעבור מתיאום ידני בצ׳אטים להזמנה אונליין ולניהול מרכזי. בהתאם לתהליך העסק, ניתן גם לחבר את הזרימה לבוט WhatsApp."],
];

const flow = ["שיחה ב‑WhatsApp", "בחירת שירות ומועד", "תור במערכת", "ניהול המשך התהליך"];

export default function AppointmentManagement() {
  return (
    <div className="page appointment-page appointment-editorial" dir="rtl">
      <SiteHeader />
      <main>
        <section className="appointment-product-hero" aria-labelledby="appointment-title">
          <div className="appointment-product-hero__copy">
            <span className="editorial-index">01 / APPOINTMENTS</span>
            <p className="appointment-product-hero__eyebrow">מתיאום ידני למערכת עבודה מסודרת</p>
            <h1 id="appointment-title">מערכת ניהול וזימון תורים לעסקים</h1>
            <p className="appointment-product-hero__lead">לעסקים שמנהלים היום תורים דרך WhatsApp, שיחות או יומן ידני — הזמנה אונליין וניהול מרכזי של התורים והלקוחות, במקום אחד.</p>
            <p className="appointment-product-hero__note">ניתן לחבר את התהליך לבוט WhatsApp, בהתאם לתהליך העסק ובהתאם לאופן שבו העסק עובד.</p>
            <div className="appointment-actions">
              <a className="btn btn--primary" href="/#contact">לתיאום הדגמה <ArrowLeft size={18} /></a>
              <a className="btn btn--ghost" href="#product-proof">צפו במערכת בפעולה</a>
            </div>
            <div className="appointment-product-hero__trust" aria-label="יכולות מרכזיות">
              <span><Check size={15} /> הזמנה אונליין</span>
              <span><Check size={15} /> יומן ולקוחות</span>
              <span><Check size={15} /> התאמה לעסק</span>
            </div>
          </div>

          <figure className="appointment-product-hero__visual">
            <div className="appointment-product-hero__bar" aria-hidden="true"><i /><i /><i /><span>AllInCenter / APPOINTMENTS</span></div>
            <video controls playsInline preload="metadata" title="הדגמת מערכת ניהול וזימון תורים">
              <source src="/videos/maya-queue-management.mp4#t=25" type="video/mp4" />
            </video>
            <figcaption>ממשק ניהול התורים בפעולה — יומן, לקוחות והפעילות השוטפת בסביבת עבודה אחת.</figcaption>
          </figure>
        </section>

        <section className="appointment-whatsapp-story" aria-labelledby="whatsapp-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">02 / FROM CHAT TO SYSTEM</span>
            <h2 id="whatsapp-title">כשהתורים חיים בין הודעות ליומן, קשה לראות את היום כולו.</h2>
            <p>עסקים רבים מתחילים בתיאום ידני. ככל שהפעילות גדלה, אותן הודעות על זמינות, אישורים ושינויים מתחילות לפצל את המידע בין כמה מקומות.</p>
          </div>

          <div className="appointment-journey" aria-label="תהליך משיחה בוואטסאפ לניהול התור במערכת">
            {flow.map((item, index) => (
              <React.Fragment key={item}>
                <div><span>0{index + 1}</span><strong>{item}</strong></div>
                {index < flow.length - 1 && <ArrowUpLeft aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>

          <div className="appointment-pain-list">
            <article><span>01</span><div><h3>הודעות חוזרות על זמינות</h3><p>אותן שאלות חוזרות על שעות פנויות, במקום שהלקוח יבחר מועד מתוך יומן ברור.</p></div></article>
            <article><span>02</span><div><h3>מידע מפוזר בין צ׳אטים ליומן</h3><p>פרטי הלקוח והתור נשמרים בשיחות נפרדות, וקשה לראות תמונת יום אחת.</p></div></article>
            <article><span>03</span><div><h3>אישור ומעקב ידניים</h3><p>כל תזכורת, אישור או שינוי דורשים עוד פעולה ידנית ומעבר נוסף בין כלים.</p></div></article>
            <article><span>04</span><div><h3>יומן יומי פחות ברור</h3><p>כשהתיאום חי בצ׳אט, קשה לשמור על סדר קבוע של התורים לאורך היום.</p></div></article>
          </div>

          <p className="appointment-whatsapp-story__close"><MessageCircle size={20} /> ניתן לחבר את התהליך לבוט WhatsApp, כך שהשיחה תוכל להוביל לשירותים זמינים ולמועדי תור — בהתאם לאופן שבו העסק עובד.</p>
        </section>

        <section className="appointment-product-proof" id="product-proof" aria-labelledby="proof-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">03 / PRODUCT PROOF</span>
            <h2 id="proof-title">שני צדדים של אותו תהליך.</h2>
            <p>הלקוח בוחר שירות ומועד במסך ההזמנה; העסק מקבל את התור ומנהל את המשך הפעילות בממשק הניהול.</p>
          </div>
          <div className="appointment-proof-links">
            <a href={bookingDemoUrl} target="_blank" rel="noreferrer">
              <span>BOOKING / CUSTOMER</span><h3>חוויית הזמנת התור</h3><p>בחירת שירות וזמן פנוי וקביעת תור אונליין.</p><strong>לפתיחת דמו ההזמנה <ExternalLink size={16} /></strong>
            </a>
            <a href={adminDemoUrl} target="_blank" rel="noreferrer">
              <span>MANAGEMENT / BUSINESS</span><h3>ממשק הניהול של העסק</h3><p>התורים, הלקוחות והיומן מתוך סביבת עבודה מרכזית.</p><strong>לפתיחת דמו הניהול <ExternalLink size={16} /></strong>
            </a>
          </div>
        </section>

        <section className="appointment-operations" aria-labelledby="capabilities-title">
          <div className="appointment-section-heading appointment-section-heading--sticky">
            <span className="editorial-index">04 / OPERATIONS</span>
            <h2 id="capabilities-title">מערכת תפעולית, לא רק יומן.</h2>
            <p>היכולות מתחברות לתהליך אחד שניתן להתאים לצורת העבודה של העסק.</p>
          </div>
          <div className="appointment-capability-list">
            {capabilities.map(({ icon: Icon, title, text }, index) => (
              <article key={title}><span>0{index + 1}</span><Icon size={21} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </div>
        </section>

        <section className="appointment-audience-fit" aria-labelledby="audiences-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">05 / FIT</span>
            <h2 id="audiences-title">מתאים לעסקים שבהם הזמן הוא חלק מהשירות.</h2>
          </div>
          <div className="appointment-audience-list">
            {audiences.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <div className="appointment-adaptation">
            <p className="editorial-index">BUSINESS-SPECIFIC</p>
            <h3>המערכת מתאימה את עצמה לעסק.</h3>
            <p>במקום להתאים את העסק למערכת קבועה, AllInCenter מאפשרת לבנות את תהליך העבודה סביב הצרכים של העסק — סוגי השירותים, זמני הפעילות, אופן קביעת התורים והפעולות שנדרשות לאחר ההזמנה.</p>
          </div>
        </section>

        <section className="appointment-conversion" aria-labelledby="conversion-title">
          <span className="editorial-index">06 / NEXT STEP</span>
          <h2 id="conversion-title">רוצים להפסיק לנהל תורים בין הודעות ויומנים?</h2>
          <p>נראה לכם מערכת אמיתית ונבדוק איך לחבר את ההזמנה והניהול לתהליך שכבר עובד בעסק.</p>
          <div className="appointment-actions">
            <a className="btn btn--primary" href="/#contact">לתיאום הדגמה <ArrowLeft size={18} /></a>
            <a className="appointment-conversion__guide" href="/guides/how-to-choose-appointment-system">איך לבחור מערכת ניהול תורים לעסק? <ArrowLeft size={16} /></a>
          </div>
          <a className="appointment-conversion__context" href="/google-ai-visibility">איך מחברים אתר, חיפוש ומערכת תורים למסלול אחד?</a>
        </section>

        <section className="appointment-faq" aria-labelledby="faq-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">07 / FAQ</span>
            <h2 id="faq-title">מידע נוסף על מערכת ניהול התורים</h2>
          </div>
          <div className="appointment-faq__list">
            {faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}</summary><p>{answer}</p></details>)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
