import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarCheck,
  Clock,
  CreditCard,
  Lock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal--in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

const benefits = [
  {
    icon: CreditCard,
    title: "תשלומים ודוחות במקום אחד",
    text: "מעקב הכנסות בזמן אמת, סליקה וביט — בלי גיליונות.",
  },
  {
    icon: Users,
    title: "CRM שמכיר כל לקוח",
    text: "היסטוריה, תורים ותשלומים — הכול בכרטיס אחד.",
  },
  {
    icon: CalendarCheck,
    title: "יומן ותורים אונליין",
    text: "לקוחות קובעים תור לבד, בלי התנגשויות.",
  },
  {
    icon: MapPin,
    title: "לידים ממפות Google",
    text: "איתור עסקים באזור שלך והזרמה ישירה למערכת.",
  },
];

const trustPoints = [
  { icon: Clock, label: "מענה תוך 24 שעות" },
  { icon: ShieldCheck, label: "ללא התחייבות" },
  { icon: Lock, label: "הפרטים מאובטחים" },
];

export default function LandingLeads() {
  const formRef = useRef(null);

  const scrollToForm = (event) => {
    event.preventDefault();
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    formRef.current?.querySelector("input")?.focus({ preventScroll: true });
  };

  return (
    <div className="page lp">
      <div className="bg-aurora" aria-hidden="true" />

      {/* ניווט מינימלי */}
      <header className="lp-nav">
        <a className="nav__brand" href="/">
          <img src="/assets/allincenter-logo.png" alt="AllInCenter" />
          <span>
            All<b>In</b>Center
          </span>
        </a>
      </header>

      <main>
        {/* הירו + טופס */}
        <section className="lp-hero">
          <div className="lp-hero__copy">
            <Reveal>
              <span className="tag">
                <Sparkles size={14} />
                מערכת ניהול חכמה לעסק שלך
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1>
                כל העסק שלך במקום אחד —
                <br />
                <span className="gradient-text">תשלומים, לקוחות, תורים ולידים.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="lp-hero__sub">
                השאירו פרטים ונחזור אליכם לשיחת אבחון קצרה + הדגמה חיה מותאמת לעסק שלכם.
                בלי התחייבות, בלי עלות.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="lp-hero__list">
                <li>
                  <BadgeCheck size={19} />
                  חיסכון של שעות עבודה ידנית בכל יום
                </li>
                <li>
                  <BadgeCheck size={19} />
                  מערכת מותאמת אישית לתהליכים שלכם
                </li>
                <li>
                  <BadgeCheck size={19} />
                  הקמה מהירה תוך 7–14 ימי עסקים
                </li>
              </ul>
            </Reveal>
            <Reveal delay={300}>
              <div className="lp-trust">
                {trustPoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <span key={point.label}>
                      <Icon size={16} />
                      {point.label}
                    </span>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal delay={140} className="lp-form-wrap">
            <div className="lp-form-card" id="lead-form" ref={formRef}>
              <div className="lp-form-card__head">
                <h2>השאירו פרטים ונחזור אליכם</h2>
                <p>ממלאים את הטופס — ואנחנו חוזרים אליכם בהקדם.</p>
              </div>
              <ContactForm source="facebook" submitLabel="שליחה — ונחזור אליכם" />
            </div>
          </Reveal>
        </section>

        {/* יתרונות */}
        <section className="lp-benefits">
          <Reveal>
            <div className="section__head lp-section-head">
              <span className="kicker">למה AllInCenter</span>
              <h2>
                מערכת אחת ש<span className="gradient-text">מחליפה חמישה כלים</span>
              </h2>
            </div>
          </Reveal>
          <div className="lp-benefits__grid">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <Reveal key={benefit.title} delay={i * 80}>
                  <article className="lp-benefit-card">
                    <span className="lp-benefit-card__icon">
                      <Icon size={20} />
                    </span>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* המלצה / הוכחה חברתית */}
        <section className="lp-social">
          <Reveal>
            <div className="lp-quote">
              <div className="lp-quote__stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p>
                "עברנו מגיליונות אקסל וניירת למערכת אחת שמנהלת הכול — תשלומים, תורים ולקוחות.
                חוסכים לנו שעות בכל שבוע."
              </p>
              <div className="lp-quote__stats">
                <div>
                  <strong>3</strong>
                  <span>מערכות חיות בפרודקשן</span>
                </div>
                <div>
                  <strong>40%−</strong>
                  <span>פחות עבודה ידנית</span>
                </div>
                <div>
                  <strong>24/7</strong>
                  <span>זמינות בענן</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CTA אחרון */}
        <section className="lp-final">
          <Reveal>
            <div className="cta">
              <div className="cta__glow" aria-hidden="true" />
              <span className="kicker kicker--light">מוכנים להתחיל?</span>
              <h2>השאירו פרטים עכשיו — ונחזור אליכם היום</h2>
              <p>שיחת אבחון קצרה + הדגמה חיה מותאמת לעסק שלכם. בלי התחייבות.</p>
              <div className="cta__actions">
                <a className="btn btn--light" href="#lead-form" onClick={scrollToForm}>
                  להשארת פרטים
                  <ArrowLeft size={18} />
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <img src="/assets/allincenter-logo.png" alt="AllInCenter" />
            <div>
              <strong>AllInCenter</strong>
              <small>Connect · Manage · Grow</small>
            </div>
          </div>
          <small className="footer__note">
            © {new Date().getFullYear()} AllInCenter · allincenter.co.il · מערכות ניהול
            מותאמות לעסק
          </small>
        </div>
      </footer>
    </div>
  );
}
