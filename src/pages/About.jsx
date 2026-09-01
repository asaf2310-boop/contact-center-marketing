import React, { useEffect, useState } from "react";
import { ArrowLeft, Bot, CheckCircle2 } from "lucide-react";
import SiteContactLine from "@/components/SiteContactLine";

const approach = [
  "התאמה לתהליך העסקי ולא להפך",
  "פשטות בתפעול",
  "אוטומציה במקום עבודה ידנית",
  "שילוב AI כשיש לו ערך אמיתי",
  "פתרון שמתאים גם לעסקים קטנים",
];

const navLinks = [
  { href: "/#platform", label: "הפלטפורמה" },
  { href: "/#solutions", label: "המערכות" },
  { href: "/allincenter-pelecard", label: "חבילת פלאקארד" },
  { href: "/pricing", label: "מחירון" },
  { href: "/about", label: "מי אנחנו" },
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
          <span className="tag">AllInCenter</span>
          <h1>מי אנחנו</h1>
          <div className="about-copy">
            <p>AllInCenter הוקמה מתוך ניסיון של שנים בניהול שירות, תמיכה ותפעול, ומתוך הבנה שמערכות לעסק צריכות להתאים לתהליך העבודה — ולא להפך.</p>
            <p>מאחורי AllInCenter עומד אסף אריאלי, מנהל Customer Experience &amp; Operations המתמחה גם ביישום AI ואוטומציה בתהליכים עסקיים.</p>
            <p>אנחנו מפתחים מערכות מותאמות לעסקים בישראל לניהול תורים, לקוחות, לידים, תשלומים ואוטומציות — בהתאם לצרכים ולדרך שבה העסק באמת עובד.</p>
          </div>
        </section>

        <section className="about-approach" aria-labelledby="approach-title">
          <div>
            <span className="tag">הגישה שלנו</span>
            <h2 id="approach-title">מערכת שנבנית סביב העסק</h2>
          </div>
          <ul>
            {approach.map((item) => (
              <li key={item}><CheckCircle2 size={20} aria-hidden="true" /><span>{item}</span></li>
            ))}
          </ul>
        </section>

        <section className="about-ai-cta" aria-labelledby="about-ai-title">
          <Bot size={30} aria-hidden="true" />
          <div>
            <h2 id="about-ai-title">AI ואוטומציה בגישה עסקית</h2>
            <a className="btn btn--primary" href="/ai">
              הכירו את אסף ואת תחום ה-AI והאוטומציה <ArrowLeft size={18} />
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
