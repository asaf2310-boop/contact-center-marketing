import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import SiteContactLine from "@/components/SiteContactLine";

const navLinks = [
  { href: "/about", label: "מי אנחנו" },
  { href: "/#platform", label: "הפלטפורמה" },
  { href: "/#solutions", label: "המערכות" },
  { href: "/allincenter-pelecard", label: "חבילת פלאקארד" },
  { href: "/pricing", label: "מחירון" },
];

export default function About() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page about-page" dir="rtl">
      <div className="bg-aurora" aria-hidden="true" />
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <a className="nav__brand" href="/" aria-label="AllInCenter - דף הבית">
            <img src="/assets/allincenter-logo.png" alt="AllInCenter" />
            <span>All<b>In</b>Center</span>
          </a>
          <nav className="nav__links" aria-label="ניווט ראשי">
            {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
          <a className="btn btn--primary btn--sm" href="/#contact">
            לבקשת הדגמה <ArrowLeft size={16} />
          </a>
        </div>
      </header>

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

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <img src="/assets/allincenter-logo.png" alt="AllInCenter" />
            <div><strong>AllInCenter</strong><small>Connect · Manage · Grow</small></div>
          </div>
          <nav className="footer__links" aria-label="ניווט תחתון">
            <a href="/">דף הבית</a>
            <a href="/pricing">מחירון</a>
            <a href="/about">מי אנחנו</a>
            <a href="/#contact">יצירת קשר</a>
            <a href="/ai">ייעוץ AI ואוטומציה</a>
          </nav>
          <SiteContactLine />
          <small className="footer__note">© {new Date().getFullYear()} AllInCenter · allincenter.co.il · מערכות ניהול מותאמות לעסקים בישראל</small>
        </div>
      </footer>
    </div>
  );
}
