import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarCheck,
  Check,
  CreditCard,
  FileText,
  Globe,
  Link2,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import SiteContactLine from "@/components/SiteContactLine";

const packageDetails = [
  {
    icon: CalendarCheck,
    title: "מערכת ניהול תורים או אתר",
    text: "יומן חכם, קביעת תורים אונליין וניהול לקוחות — או אתר עסקי מודרני שמחבר את הלקוחות ישירות אליכם.",
    bullets: [
      "קביעת תורים אונליין ללקוחות",
      "ניהול לקוחות ותזכורות",
      "או בניית אתר עסקי מותאם",
    ],
    priceOnce: "₪1,200",
    priceMonth: "₪150",
  },
  {
    icon: CreditCard,
    title: "מערכת סליקה עם פלאקארד",
    text: "באנדל סליקה מקצועי כולל חשבוניות עד 1,000 תנועות בחודש — תשלומים מאובטחים ומדווחים במקום אחד.",
    bullets: [
      "סליקה מאובטחת דרך פלאקארד",
      "חשבוניות עד 1,000 תנועות",
      "חיבור ישיר למערכת הניהול",
    ],
    priceOnce: "₪400",
    priceMonth: "₪95",
  },
];

const addons = [
  {
    id: "invoices",
    name: "חשבוניות",
    once: "₪120",
    month: "₪30",
    logo: "invoices",
  },
  {
    id: "3ds",
    name: "3DSecure",
    once: "₪249",
    month: "₪0.85",
    logo: "secure3d",
  },
  {
    id: "bank",
    name: "העברה בנקאית",
    once: "₪120",
    month: "0.35%",
    logo: "bank",
  },
  {
    id: "apple",
    name: "אפל פיי",
    once: "₪120",
    month: "₪15",
    logo: "applepay",
  },
  {
    id: "google",
    name: "גוגל פיי",
    once: "₪120",
    month: "₪15",
    logo: "googlepay",
  },
  {
    id: "bit",
    name: "ביט",
    once: "₪120",
    month: "₪15",
    logo: "bit",
  },
  {
    id: "link",
    name: "תשלום בלינק",
    once: "₪120",
    month: "₪35",
    logo: "paylink",
  },
];

function AddonLogo({ type }) {
  switch (type) {
    case "applepay":
      return (
        <span className="addon-logo addon-logo--apple" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              fill="currentColor"
              d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
            />
          </svg>
          <em>Pay</em>
        </span>
      );
    case "googlepay":
      return (
        <span className="addon-logo addon-logo--google" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h5.9c-.3 1.4-1 2.6-2.1 3.4v2.8h3.4c2-1.8 3.4-4.5 3.4-8.3z" />
            <path fill="#34A853" d="M12 23c2.8 0 5.2-.9 7-2.5l-3.4-2.8c-.9.6-2.1 1-3.6 1-2.8 0-5.1-1.9-6-4.4H2.5v2.9C4.3 20.8 7.9 23 12 23z" />
            <path fill="#FBBC05" d="M6 14.3c-.2-.6-.4-1.3-.4-2s.1-1.4.4-2V7.4H2.5C1.8 8.8 1.4 10.4 1.4 12s.4 3.2 1.1 4.6L6 14.3z" />
            <path fill="#EA4335" d="M12 5.8c1.5 0 2.9.5 4 1.6l3-3C17.2 2.5 14.8 1.5 12 1.5 7.9 1.5 4.3 3.7 2.5 7.4L6 10.3c.9-2.5 3.2-4.5 6-4.5z" />
          </svg>
          <em>Pay</em>
        </span>
      );
    case "bit":
      return (
        <span className="addon-logo addon-logo--bit" aria-hidden="true">
          <strong>bit</strong>
        </span>
      );
    case "secure3d":
      return (
        <span className="addon-logo addon-logo--secure" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <path
              d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5C8 19.2 5 15.5 5 11V6l7-3z"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="rgba(0,183,194,0.12)"
            />
            <path d="M9.2 12.1l1.8 1.8 3.8-3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <em>3DS</em>
        </span>
      );
    case "bank":
      return (
        <span className="addon-logo addon-logo--bank" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path d="M3 10h18L12 4 3 10z" fill="currentColor" />
            <path d="M5 11v6M9.5 11v6M14.5 11v6M19 11v6M3 19h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </span>
      );
    case "invoices":
      return (
        <span className="addon-logo addon-logo--invoice" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path
              d="M7 3.5h7l3.5 3.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z"
              stroke="currentColor"
              strokeWidth="1.7"
              fill="rgba(139,47,214,0.1)"
            />
            <path d="M9 11h6M9 14.5h6M9 8h3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </span>
      );
    case "paylink":
      return (
        <span className="addon-logo addon-logo--link" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path
              d="M9.5 14.5l5-5M8.2 12.2l-1.4 1.4a3.2 3.2 0 0 0 4.5 4.5l1.4-1.4M12.2 8.2l1.4-1.4a3.2 3.2 0 1 1 4.5 4.5l-1.4 1.4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      );
    default:
      return null;
  }
}

const benefits = [
  {
    icon: Link2,
    title: "הכול מחובר",
    text: "תורים, אתר ותשלומים עובדים יחד — בלי להעתיק נתונים בין מערכות.",
  },
  {
    icon: ShieldCheck,
    title: "סליקה ברמה בנקאית",
    text: "תשתית פלאקארד מוכרת ומאובטחת, עם חשבוניות ודיווח מסודר.",
  },
  {
    icon: Globe,
    title: "נוכחות דיגיטלית שעובדת",
    text: "הלקוח קובע תור או משלם אונליין — אתם מקבלים הכול מסודר במערכת.",
  },
];

export default function PelecardBrochure() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page brochure">
      <div className="brochure-bg" aria-hidden="true" />

      <header className={`brochure-nav ${scrolled ? "brochure-nav--scrolled" : ""}`}>
        <nav className="brochure-nav__inner">
          <a className="brochure-nav__home" href="/">
            חזרה לאתר
          </a>
          <a className="btn btn--primary btn--sm" href="#contact">
            לשיחת התאמה
            <ArrowLeft size={16} />
          </a>
        </nav>
      </header>

      <main>
        {/* Hero — logos merged large */}
        <section className="brochure-hero" id="top">
          <div className="brochure-hero__glow" aria-hidden="true" />

          <Reveal>
            <div className="brochure-duo" aria-label="AllInCenter בשיתוף pelecard">
              <img
                className="brochure-duo__aic"
                src="/assets/allincenter-logo-clear.png"
                alt="AllInCenter"
              />
              <div className="brochure-duo__join" aria-hidden="true">
                <i />
                <span>בשיתוף</span>
                <i />
              </div>
              <img
                className="brochure-duo__pc"
                src="/assets/pelecard-logo-clear.png"
                alt="pelecard"
              />
            </div>
          </Reveal>

          <Reveal delay={70}>
            <p className="brochure-hero__kicker">
              <Sparkles size={14} />
              חבילת שותפות לעסקים
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h1>
              החבילה המשותפת
              <br />
              <span>ניהול + סליקה.</span>
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="brochure-hero__lead">
              AllInCenter ופלאקארד יחד — מערכת ניהול תורים או אתר, עם מערכת סליקה
              מקצועית במקום אחד לעסקים בישראל.
            </p>
          </Reveal>
        </section>

        {/* Featured package — big emphasis first */}
        <section className="brochure-featured" id="package">
          <Reveal>
            <div className="brochure-featured__card">
              <div className="brochure-featured__ribbon">החבילה המשותפת</div>

              <h2>מערכת ניהול תורים / אתר + סליקה פלאקארד</h2>
              <p className="brochure-featured__sub">
                כל מה שהעסק צריך כדי לקבוע תורים, להציג את עצמו דיגיטלית ולגבות
                תשלומים — בחבילה אחת.
              </p>

              <div className="brochure-featured__prices">
                <div className="brochure-featured__price">
                  <small>הקמה חד־פעמית</small>
                  <strong>₪1,600</strong>
                </div>
                <div className="brochure-featured__divider" aria-hidden="true" />
                <div className="brochure-featured__price">
                  <small>תשלום חודשי</small>
                  <strong>
                    ₪245<span>/חודש</span>
                  </strong>
                </div>
              </div>

              <ul className="brochure-featured__summary">
                <li>
                  <Check size={18} />
                  מערכת ניהול תורים או אתר עסקי
                </li>
                <li>
                  <Check size={18} />
                  באנדל סליקה + חשבוניות עד 1,000 תנועות
                </li>
                <li>
                  <Check size={18} />
                  חיבור מלא בין ניהול לתשלומים
                </li>
              </ul>

              <div className="brochure-featured__cta">
                <a className="btn btn--primary" href="#contact">
                  רוצה את החבילה הזו
                  <ArrowLeft size={18} />
                </a>
                <a className="btn btn--outline" href="#details">
                  לפירוט מלא
                </a>
              </div>

              <p className="brochure-featured__vat">המחירים אינם כוללים מע״מ</p>
            </div>
          </Reveal>
        </section>

        {/* Details — what it contains */}
        <section className="brochure-package" id="details">
          <Reveal>
            <div className="brochure-section-head">
              <span className="brochure-eyebrow">פירוט החבילה</span>
              <h2>מה בדיוק כלול?</h2>
              <p>שני רכיבים שעובדים יחד — ניהול העסק מצד אחד, וסליקה מאובטחת מצד שני.</p>
            </div>
          </Reveal>

          <div className="brochure-pillars">
            {packageDetails.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 90}>
                  <article className={`brochure-pillar brochure-pillar--${i === 0 ? "mgmt" : "pay"}`}>
                    <div className="brochure-pillar__top">
                      <div className="brochure-pillar__mark">
                        <Icon size={22} />
                      </div>
                      <span className="brochure-pillar__step">0{i + 1}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <ul className="brochure-pillar__bullets">
                      {item.bullets.map((b) => (
                        <li key={b}>
                          <Check size={15} />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="brochure-pillar__prices">
                      <div>
                        <small>הקמה</small>
                        <strong>{item.priceOnce}</strong>
                      </div>
                      <div>
                        <small>חודשי</small>
                        <strong>{item.priceMonth}</strong>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={100}>
            <div className="brochure-total">
              <div className="brochure-total__label">
                <span>סה״כ חבילת השותפות</span>
                <small>ניהול תורים / אתר + באנדל סליקה</small>
              </div>
              <div className="brochure-total__figures">
                <div>
                  <small>חד־פעמי</small>
                  <strong>₪1,600</strong>
                </div>
                <span className="brochure-total__plus" aria-hidden="true">
                  +
                </span>
                <div>
                  <small>חודשי</small>
                  <strong>
                    ₪245<span>/חודש</span>
                  </strong>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Benefits */}
        <section className="brochure-benefits">
          <div className="brochure-benefits__grid">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.title} delay={i * 70}>
                  <div className="brochure-benefit">
                    <span className="brochure-benefit__icon">
                      <Icon size={20} />
                    </span>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Clearing detail */}
        <section className="brochure-clearing">
          <Reveal>
            <div className="brochure-clearing__inner">
              <div className="brochure-clearing__copy">
                <span className="brochure-eyebrow brochure-eyebrow--teal">סליקה עם פלאקארד</span>
                <h2>באנדל סליקה שמוכן לעסק</h2>
                <p>
                  סליקה מאובטחת + חשבוניות עד 1,000 תנועות בחודש. אפשר להרחיב
                  לאמצעי תשלום נוספים לפי הצורך של העסק.
                </p>
                <ul>
                  <li>
                    <Check size={16} />
                    סליקה + חשבוניות עד 1,000 תנועות
                  </li>
                  <li>
                    <Check size={16} />
                    חיבור ישיר למערכת הניהול
                  </li>
                  <li>
                    <Check size={16} />
                    הרחבה לביט, Apple Pay, Google Pay ועוד
                  </li>
                </ul>
              </div>
              <div className="brochure-clearing__panel" aria-hidden="true">
                <img src="/assets/pelecard-logo-clear.png" alt="" />
                <div className="brochure-clearing__chips">
                  <span>
                    <CreditCard size={14} /> סליקה
                  </span>
                  <span>
                    <FileText size={14} /> חשבוניות
                  </span>
                  <span>
                    <Smartphone size={14} /> תשלומים דיגיטליים
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Add-ons */}
        <section className="brochure-addons" id="addons">
          <Reveal>
            <div className="brochure-section-head">
              <span className="brochure-eyebrow">הרחבות אופציונליות</span>
              <h2>תוספות מערכת</h2>
              <p>מרחיבים את החבילה לפי אמצעי התשלום והצרכים של העסק.</p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="brochure-addons__panel">
              <div className="brochure-addons__head" role="row">
                <span>מוצר</span>
                <span>חד־פעמי</span>
                <span>חודשי</span>
              </div>
              <ul className="brochure-addons__list">
                {addons.map((row) => (
                  <li key={row.id} className="brochure-addon-row">
                    <div className="brochure-addon-row__product">
                      <AddonLogo type={row.logo} />
                      <strong>{row.name}</strong>
                    </div>
                    <div className="brochure-addon-row__price" data-label="חד־פעמי">
                      <em>חד־פעמי</em>
                      <span>{row.once}</span>
                    </div>
                    <div className="brochure-addon-row__price brochure-addon-row__price--month" data-label="חודשי">
                      <em>חודשי</em>
                      <span>{row.month}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="brochure-vat">כל המחירים אינם כוללים מע״מ</p>
          </Reveal>
        </section>

        {/* Contact */}
        <section className="brochure-contact" id="contact">
          <Reveal>
            <div className="brochure-contact__layout">
              <div className="brochure-contact__intro">
                <span className="brochure-eyebrow">בואו נתחיל</span>
                <h2>מתאימים את החבילה לעסק שלכם</h2>
                <p>
                  השאירו פרטים לשיחת התאמה קצרה — נבין מה נכון לכם: ניהול תורים,
                  אתר, סליקה, או השילוב המלא.
                </p>
                <ul className="brochure-contact__points">
                  <li>
                    <Check size={16} />
                    בלי התחייבות
                  </li>
                  <li>
                    <Check size={16} />
                    הצעה שקופה לפי הצורך
                  </li>
                  <li>
                    <Check size={16} />
                    ליווי הקמה וחיבור לסליקה
                  </li>
                </ul>
              </div>
              <div className="brochure-contact__form">
                <ContactForm
                  source="pelecard-brochure"
                  defaultInterest="חבילת AllInCenter × פלאקארד"
                  submitLabel="לשיחת התאמה"
                />
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <img src="/assets/allincenter-icon-clear.png" alt="AllInCenter" />
            <div>
              <strong>AllInCenter</strong>
              <small>בשיתוף pelecard · Connect · Manage · Grow</small>
            </div>
          </div>
          <SiteContactLine showAiLink />
          <small className="footer__note">
            © {new Date().getFullYear()} AllInCenter · allincenter.co.il · חבילת ניהול
            וסליקה לעסקים בישראל
          </small>
        </div>
      </footer>
    </div>
  );
}
