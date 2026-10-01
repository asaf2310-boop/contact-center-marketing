import React from "react";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppLink from "@/components/WhatsAppLink";

const demoHref = "/demo/appointments/booking";

const problems = [
  ["לקוח שואל אילו שעות פנויות", "עונים עם כמה אפשרויות, ואז מחכים לתשובה."],
  ["מישהו אחר תופס את השעה", "צריך לחזור ללקוח הראשון ולחפש מועד אחר."],
  ["השבוע משתנה", "ביטול או הזזה דורשים לעבור גם על השיחות וגם על היומן."],
];

const steps = [
  ["מגדירים זמינות", "קובעים מתי אפשר לקבוע תור, לפי ימי העבודה והשעות של הקליניקה."],
  ["הלקוח בוחר תור", "הוא נכנס לעמוד ההזמנה, בוחר שירות ומועד מתוך מה שבאמת פנוי."],
  ["התור נכנס ליומן", "ההזמנה נשמרת ביומן, ולא נשארת רק בתוך הודעה."],
  ["ממשיכים לנהל את היום", "רואים את התורים ואת סדר העבודה במקום אחד."],
];

const audiences = [
  "מטפלים",
  "קליניקות קטנות",
  "מעסים",
  "מקצועות טיפוליים",
  "נותני שירות שעובדים בפגישות",
];

const faqs = [
  ["מהי מערכת זימון תורים למטפלים?", "מערכת שמאפשרת ללקוחות לקבוע תור אונליין, ולמטפל או לקליניקה לנהל זמינות ויומן במקום אחד. היא מסדרת את קביעת הפגישות, ולא מחליפה תיק רפואי או תיעוד טיפולי."],
  ["האם הלקוחות יכולים לקבוע תור בעצמם?", "כן. הלקוח בוחר שירות ומועד פנוי מתוך הזמינות, בלי לחכות לתשובה על כל שעה."],
  ["האם אפשר לקבוע זמינות מראש?", "כן. מגדירים מתי ניתן לקבוע תור, והלקוח רואה רק מועדים פנויים."],
  ["האם המערכת מתאימה גם לקליניקה קטנה?", "כן. היא מתאימה למטפל עצמאי ולקליניקה קטנה שעובדת לפי פגישות, ורוצה יומן מסודר במקום תיאום בהודעות."],
  ["איך מתחילים להשתמש במערכת?", "אפשר קודם לנסות את הדמו ולראות איך לקוח קובע תור. אחר כך בודקים יחד איך להתאים זמינות ושירותים ליומן שלכם."],
];

export default function TherapistClinicAppointments() {
  return (
    <div className="page appointment-editorial therapist-page" dir="rtl">
      <SiteHeader />
      <main>
        <section className="appointment-product-hero" aria-labelledby="therapist-title">
          <div className="appointment-product-hero__copy">
            <span className="editorial-index">01 / THERAPISTS</span>
            <p className="appointment-product-hero__eyebrow">למטפלים ולקליניקות קטנות</p>
            <h1 id="therapist-title">מערכת זימון תורים<br /><span>למטפלים וקליניקות</span></h1>
            <p className="appointment-product-hero__lead">פחות הודעות הלוך ושוב, יותר סדר ביומן. הלקוחות יכולים לבחור מועד פנוי ולקבוע תור אונליין, והיומן נשאר מסודר במקום אחד.</p>
            <div className="appointment-actions">
              <a className="btn btn--primary" href={demoHref} target="_blank" rel="noreferrer nofollow">לצפייה בהדגמה <ArrowLeft size={18} /></a>
              <a className="btn btn--ghost" href="/appointment-management">איך המערכת עובדת</a>
            </div>
          </div>
        </section>

        <section className="therapist-section" aria-labelledby="therapist-problem-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">02 / THE DAY</span>
            <h2 id="therapist-problem-title">כשהיומן מתנהל בין הודעות, שיחות ו-WhatsApp</h2>
            <p>אצל מטפלים רבים קביעת התור עדיין קורית בשיחה. זה מספיק כשיש מעט פניות. כשהיומן מתמלא, אותן הודעות על שעות פנויות מתחילות לבלבל.</p>
          </div>
          <div className="appointment-pain-list">
            {problems.map(([title, text], index) => (
              <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </div>
        </section>

        <section className="therapist-section therapist-section--rule" aria-labelledby="therapist-flow-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">03 / FLOW</span>
            <h2 id="therapist-flow-title">איך זה עובד בפועל</h2>
            <p>המסלול קצר: זמינות שאתם קובעים, בחירה של הלקוח, ותור שנכנס ליומן.</p>
          </div>
          <div className="appointment-pain-list">
            {steps.map(([title, text], index) => (
              <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
          </div>
        </section>

        <section className="therapist-section therapist-section--rule" aria-labelledby="therapist-duration-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">04 / SERVICES</span>
            <h2 id="therapist-duration-title">לכל טיפול אורך משלו</h2>
            <p>פגישת היכרות וטיפול ארוך לא תופסים אותו זמן ביומן. כשמתאימים את המערכת לקליניקה, לכל שירות אפשר לקבוע משך משלו. הלקוח רואה את אורך הטיפול כשהוא בוחר מועד. אלה לא משכים שנעולים מראש: טיפול אחד יכול להיות חצי שעה, ואחר שעה, לפי העבודה אצלכם.</p>
          </div>
        </section>

        <section className="therapist-section therapist-section--rule" aria-labelledby="therapist-fit-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">05 / FIT</span>
            <h2 id="therapist-fit-title">מתאים לעסקים שעובדים לפי תורים</h2>
            <p>העמוד הזה עוסק בקביעת פגישות, בזמינות וביומן. לא בניהול תיק רפואי, מרשמים או תיעוד טיפולי.</p>
          </div>
          <div className="appointment-audience-list">
            {audiences.map((title, index) => <div key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong></div>)}
          </div>
        </section>

        <section className="therapist-section therapist-section--rule" aria-labelledby="therapist-demo-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">06 / DEMO</span>
            <h2 id="therapist-demo-title">רוצים לראות איך זה מרגיש ללקוח?</h2>
            <p>אפשר לפתוח את ההדגמה ולעבור את הקביעה כמו לקוח: לבחור שירות, לראות מועדים פנויים ולשמור תור. הנתונים שם לדוגמה, ונשמרים רק בדפדפן.</p>
          </div>
          <div className="appointment-actions">
            <a className="btn btn--primary" href={demoHref} target="_blank" rel="noreferrer nofollow">לנסות את הדמו <ArrowLeft size={18} /></a>
          </div>
        </section>

        <section className="therapist-section therapist-section--rule" aria-labelledby="therapist-links-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">07 / MORE</span>
            <h2 id="therapist-links-title">זה חלק ממערכת התורים, לא מערכת נפרדת</h2>
            <p>העמוד הזה מתמקד במטפלים ובקליניקות. כדי לראות את שאר היכולות, אפשר לקרוא על <a href="/appointment-management">מערכת ניהול תורים</a> של AllInCenter. לפני שבוחרים, יש גם מדריך: <a href="/guides/how-to-choose-appointment-system">איך לבחור מערכת ניהול תורים</a>.</p>
          </div>
        </section>

        <section className="appointment-conversion" aria-labelledby="therapist-cta-title">
          <span className="editorial-index">08 / NEXT STEP</span>
          <h2 id="therapist-cta-title">רוצים לראות אם זה מתאים ליומן שלכם?</h2>
          <p>מתאימים את הזמינות, השירותים ותהליך הקביעה לדרך שבה אתם עובדים, בלי לכפות על כל קליניקה את אותו סדר יום. אפשר לנסות את ההדגמה, או לדבר איתנו ולבדוק את היומן שלכם.</p>
          <div className="appointment-actions">
            <a className="btn btn--primary" href={demoHref} target="_blank" rel="noreferrer nofollow">לנסות את הדמו <ArrowLeft size={18} /></a>
            <WhatsAppLink className="appointment-conversion__guide" location="therapist-clinic-appointments" message="היי, אשמח לשמוע על מערכת זימון תורים למטפלים וקליניקות">דברו איתנו ב-WhatsApp</WhatsAppLink>
          </div>
          <a className="appointment-conversion__context" href="/#contact">או השאירו פרטים לשיחת היכרות</a>
        </section>

        <section className="appointment-faq" aria-labelledby="therapist-faq-title">
          <div className="appointment-section-heading">
            <span className="editorial-index">09 / FAQ</span>
            <h2 id="therapist-faq-title">שאלות לפני שמתחילים</h2>
          </div>
          <div className="appointment-faq__list">
            {faqs.map(([question, answer], index) => (
              <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}</summary><p>{answer}</p></details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
