import React from "react";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "@/about-page.css";

const storySteps = ["שירות ותפעול", "זיהוי הבעיה", "בניית מערכת", "אוטומציה ו-AI"];

const principles = [
  { title: "מותאם לעסק", text: "המערכת נבנית סביב תהליך העבודה — לא להפך." },
  { title: "פשוט לתפעול", text: "טכנולוגיה צריכה לפשט את העבודה, לא להוסיף מורכבות." },
  { title: "אוטומציה חכמה", text: "אוטומציה במקום שבו היא באמת חוסכת עבודה ידנית." },
  { title: "AI עם ערך אמיתי", text: "AI משולב כשיש לו תפקיד ברור בתהליך." },
];

function HeroArchitecture() {
  const nodes = ["עסק", "תהליך", "מערכת", "אוטומציה / AI"];
  return (
    <div className="about-arch" role="img" aria-label="חיבור בין עסק, תהליך, מערכת ואוטומציה או AI">
      <div className="about-arch__bar" aria-hidden="true">
        <span /><span /><span />
        <small>AllInCenter</small>
      </div>
      <ol>
        {nodes.map((label, index) => (
          <li key={label}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <strong>{label}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function About() {
  return (
    <div className="page about-page" dir="rtl">
      <div className="bg-aurora" aria-hidden="true" />
      <SiteHeader />

      <main className="about-main">
        <section className="about-hero">
          <div className="about-hero__copy">
            <span className="kicker">ALLINCENTER</span>
            <h1>מערכות שנבנות מתוך הבנה של העסק</h1>
            <p>
              AllInCenter מחברת ניסיון בניהול שירות ותפעול עם טכנולוגיה, אוטומציה ו-AI — כדי לבנות מערכות שמתאימות לדרך שבה העסק באמת עובד.
            </p>
            <div className="about-hero__actions">
              <a className="btn btn--primary" href="/systems">למערכות שלנו <ArrowLeft size={18} aria-hidden="true" /></a>
              <a className="btn btn--ghost" href="/#contact">לבקשת הדגמה</a>
            </div>
          </div>
          <div className="about-hero__visual">
            <HeroArchitecture />
          </div>
        </section>

        <section className="about-story" aria-labelledby="story-title">
          <div className="about-story__intro">
            <h2 id="story-title">AllInCenter נולדה מתוך העבודה בשטח</h2>
            <p>AllInCenter נולדה מתוך ניסיון בניהול שירות, תמיכה ותפעול ומתוך היכרות עם האתגרים היומיומיים של עסקים — עבודה בין מערכות שונות, תהליכים ידניים ומידע שלא תמיד נמצא במקום אחד.</p>
            <p>המטרה שלנו היא לבנות מערכות שמתאימות לדרך שבה העסק באמת עובד: פשוטות לתפעול, ממוקדות בצורך העסקי ומשלבות אוטומציה ו-AI כשיש להם ערך אמיתי.</p>
          </div>
          <ol className="about-progress" aria-label="מהשטח למערכת">
            {storySteps.map((step, index) => (
              <li key={step}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-principles" aria-labelledby="principles-title">
          <h2 id="principles-title">איך אנחנו בונים</h2>
          <ul className="about-values" aria-label="הערכים שלנו">
            {principles.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-founder" id="asaf-ariely" aria-labelledby="founder-title">
          <div className="about-founder__photo">
            <img src="/assets/asaf-ariely.png" alt="אסף אריאלי, מייסד AllInCenter" width="480" height="600" loading="lazy" />
          </div>
          <div className="about-founder__content">
            <div className="about-founder__heading">
              <h2 id="founder-title">אסף אריאלי</h2>
              <p>מייסד AllInCenter</p>
              <span lang="en" dir="ltr">Customer Experience · Operations · AI</span>
            </div>
            <p>אסף מגיע מעולמות ניהול השירות, התמיכה והתפעול ומשלב את הניסיון העסקי עם פיתוח מערכות, אוטומציות וכלי AI כדי להפוך תהליכים מורכבים לפשוטים ויעילים יותר.</p>
            <a className="about-founder__link" href="/ai">
              הכירו את תחום ה-AI והאוטומציה <ArrowLeft size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="about-formula" aria-labelledby="formula-title">
          <h2 id="formula-title" className="visually-hidden">החיבור בין ניסיון עסקי לטכנולוגיה</h2>
          <div className="about-formula__grid">
            <article>
              <span>ניסיון עסקי</span>
              <strong>שירות · תמיכה · תפעול</strong>
            </article>
            <article>
              <span>טכנולוגיה</span>
              <strong>מערכות · אוטומציה · AI</strong>
            </article>
            <article className="about-formula__result">
              <span>החיבור</span>
              <strong>AllInCenter</strong>
            </article>
          </div>
        </section>

        <aside className="about-cta" aria-labelledby="about-cta-title">
          <h2 id="about-cta-title">יש תהליך בעסק שעובד היום בצורה מסורבלת?</h2>
          <p>בואו נבדוק איך אפשר להפוך אותו למערכת פשוטה, ברורה ומתאימה יותר לדרך שבה העסק עובד.</p>
          <div className="about-cta__actions">
            <a className="btn btn--primary" href="/#contact">לבקשת הדגמה <ArrowLeft size={18} aria-hidden="true" /></a>
            <a className="btn btn--ghost" href="/systems">המערכות שלנו</a>
          </div>
        </aside>
      </main>

      <SiteFooter />
    </div>
  );
}
