import React from "react";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function About() {
  return (
    <div className="page about-page" dir="rtl">
      <div className="bg-aurora" aria-hidden="true" />
      <SiteHeader />

      <main className="about-main">
        <section className="about-hero">
          <div className="about-hero__glow" aria-hidden="true" />
          <div className="about-hero__grid" aria-hidden="true" />
          <div className="about-hero__content">
            <h1>מי אנחנו</h1>
            <div className="about-copy">
              <p>AllInCenter הוקמה מתוך ניסיון של שנים בניהול שירות, תמיכה ותפעול, ומתוך הבנה שמערכות לעסק צריכות להתאים לתהליך העבודה — ולא להפך.</p>
              <p>מאחורי AllInCenter עומד אסף אריאלי, מנהל Customer Experience &amp; Operations המתמחה גם ביישום AI ואוטומציה בתהליכים עסקיים.</p>
              <p>אנחנו מפתחים מערכות מותאמות לעסקים בישראל לניהול תורים, לקוחות, לידים, תשלומים ואוטומציות — בהתאם לצרכים ולדרך שבה העסק באמת עובד.</p>
            </div>
          </div>
        </section>

        <section className="about-story" aria-labelledby="story-title">
          <div className="about-story__heading">
            <span aria-hidden="true" />
            <h2 id="story-title">AllInCenter נולדה מתוך העבודה בשטח</h2>
          </div>
          <div className="about-story__copy">
            <p>AllInCenter נולדה מתוך ניסיון בניהול שירות, תמיכה ותפעול ומתוך היכרות עם האתגרים היומיומיים של עסקים — עבודה בין מערכות שונות, תהליכים ידניים ומידע שלא תמיד נמצא במקום אחד.</p>
            <p>המטרה שלנו היא לבנות מערכות שמתאימות לדרך שבה העסק באמת עובד: פשוטות לתפעול, ממוקדות בצורך העסקי ומשלבות אוטומציה ו-AI כשיש להם ערך אמיתי.</p>
            <ul className="about-values" aria-label="הערכים שלנו">
              <li>מותאם לעסק</li>
              <li>פשוט לתפעול</li>
              <li>אוטומציה חכמה</li>
              <li>AI עם ערך אמיתי</li>
            </ul>
          </div>
        </section>

        <section className="about-founder" aria-labelledby="founder-title">
          <div className="about-founder__photo">
            <img src="/assets/asaf-ariely.png" alt="אסף אריאלי, מייסד AllInCenter" width="480" height="600" />
          </div>
          <div className="about-founder__content">
            <div className="about-founder__heading">
              <h2 id="founder-title">אסף אריאלי</h2>
              <p>מייסד AllInCenter</p>
              <span lang="en" dir="ltr">Customer Experience, Operations &amp; AI</span>
            </div>
            <p>אסף מגיע מעולמות ניהול השירות, התמיכה והתפעול ומשלב את הניסיון העסקי עם פיתוח מערכות, אוטומציות וכלי AI כדי להפוך תהליכים מורכבים לפשוטים ויעילים יותר.</p>
            <a className="btn btn--ghost btn--sm about-founder__link" href="/ai">
              הכירו את תחום ה-AI והאוטומציה <ArrowLeft size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
