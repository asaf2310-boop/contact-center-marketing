import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Bot,
  CalendarCheck,
  CheckCircle2,
  CreditCard,
  Headset,
  LayoutDashboard,
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

const capabilities = [
  { icon: CalendarCheck, label: "ניהול תורים" },
  { icon: CreditCard, label: "סליקה ותשלומים" },
  { icon: Users, label: "ניהול לקוחות (CRM)" },
  { icon: Bot, label: "אוטומציות ותזכורות" },
];

const trustItems = [
  { icon: Headset, label: "ליווי אישי בהתחלה" },
  { icon: Sparkles, label: "הקמה תוך יום עסקים" },
  { icon: ShieldCheck, label: "תמיכה ישראלית" },
  { icon: CheckCircle2, label: "ללא התחייבות" },
];

const howSteps = [
  {
    step: "1",
    title: "משאירים פרטים",
    text: "שם וטלפון — זה כל מה שצריך בשלב הראשון.",
  },
  {
    step: "2",
    title: "מתאמים הדגמה",
    text: "חוזרים אליכם לשיחה קצרה שמתאימה ליומן שלכם.",
  },
  {
    step: "3",
    title: "העסק עולה לאוויר",
    text: "תוך יום עסקים אחד — תורים, לקוחות ומעקב במקום אחד.",
  },
];

const productShots = [
  {
    title: "לוח בקרה",
    caption: "תמונת מצב יומית של העסק",
    kind: "dashboard",
  },
  {
    title: "יומן ותורים",
    caption: "פחות תורים שנופלים בין הכיסאות",
    kind: "calendar",
  },
  {
    title: "ניהול לקוחות",
    caption: "כל השיחות וההיסטוריה במקום אחד",
    kind: "crm",
  },
  {
    title: "סטטיסטיקות",
    caption: "הכנסות ותפוסה במבט אחד",
    kind: "stats",
  },
];

function ProductMock({ kind }) {
  if (kind === "dashboard") {
    return (
      <div className="lp-mock lp-mock--dashboard" aria-hidden="true">
        <div className="lp-mock__row">
          <span className="lp-mock__pill lp-mock__pill--strong" />
          <span className="lp-mock__pill" />
          <span className="lp-mock__pill" />
        </div>
        <div className="lp-mock__row">
          <span className="lp-mock__block" />
          <span className="lp-mock__block" />
          <span className="lp-mock__block" />
        </div>
        <span className="lp-mock__wide" />
      </div>
    );
  }
  if (kind === "calendar") {
    return (
      <div className="lp-mock lp-mock--calendar" aria-hidden="true">
        {Array.from({ length: 21 }).map((_, index) => (
          <span key={index} className={index % 5 === 0 ? "is-active" : undefined} />
        ))}
      </div>
    );
  }
  if (kind === "crm") {
    return (
      <div className="lp-mock lp-mock--crm" aria-hidden="true">
        {["רחל כ.", "דני מ.", "נועה ל."].map((name) => (
          <div key={name}>
            <i />
            <b />
            <em>{name}</em>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="lp-mock lp-mock--stats" aria-hidden="true">
      {[40, 65, 48, 80, 55, 90, 70].map((height, index) => (
        <span key={index} style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}

export default function LandingLeads() {
  const formRef = useRef(null);

  const scrollToForm = (event) => {
    event?.preventDefault?.();
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    formRef.current?.querySelector("input")?.focus({ preventScroll: true });
  };

  return (
    <div className="page lp">
      <div className="bg-aurora" aria-hidden="true" />

      <header className="lp-nav">
        <a className="nav__brand" href="/">
          <img src="/assets/allincenter-logo.png" alt="AllInCenter" />
          <span>
            All<b>In</b>Center
          </span>
        </a>
        <a className="btn btn--primary btn--sm lp-nav__cta" href="#lead-form" onClick={scrollToForm}>
          קבעו הדגמה בחינם
        </a>
      </header>

      <main>
        <section className="lp-hero">
          <div className="lp-hero__copy">
            <Reveal>
              <span className="tag">
                <Sparkles size={14} />
                מערכת אחת לעסק שלך
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1>
                מערכת אחת לניהול העסק שלך
                <br />
                <span className="gradient-text">במקום וואטסאפ, אקסל ו־5 מערכות שונות</span>
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="lp-hero__sub">
                חסכו שעות כל שבוע — תנו ללקוחות חוויה מסודרת יותר, בלי לרדוף אחרי תורים
                ותשלומים בכלים מפוזרים.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <ul className="lp-hero__list">
                {capabilities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <Icon size={18} />
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
            <Reveal delay={220}>
              <div className="lp-trust">
                {trustItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <span key={item.label}>
                      <Icon size={15} />
                      {item.label}
                    </span>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal delay={140} className="lp-form-wrap">
            <div className="lp-form-card" id="lead-form" ref={formRef}>
              <div className="lp-form-card__head">
                <h2>לתיאום שיחת ייעוץ</h2>
                <p>השאירו שם וטלפון — ונחזור אליכם להדגמה קצרה מותאמת לעסק.</p>
              </div>
              <ContactForm
                source="facebook"
                compact
                submitLabel="קבעו הדגמה בחינם"
              />
              <p className="lp-form-urgency">
                הדגמה ללא התחייבות · מספר מקומות מוגבל בכל שבוע
              </p>
            </div>
          </Reveal>
        </section>

        <section className="lp-how">
          <Reveal>
            <div className="section__head lp-section-head">
              <span className="kicker">איך זה עובד</span>
              <h2>
                שלושה צעדים פשוטים — <span className="gradient-text">בלי כאב ראש</span>
              </h2>
            </div>
          </Reveal>
          <div className="lp-how__grid">
            {howSteps.map((item, index) => (
              <Reveal key={item.step} delay={index * 80}>
                <article className="lp-how-card">
                  <span className="lp-how-card__step">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="lp-product">
          <Reveal>
            <div className="section__head lp-section-head">
              <span className="kicker">רואים את המערכת</span>
              <h2>
                לא רק שומעים — <span className="gradient-text">רואים איך זה נראה</span>
              </h2>
            </div>
          </Reveal>
          <div className="lp-product__grid">
            {productShots.map((shot, index) => (
              <Reveal key={shot.title} delay={index * 70}>
                <figure className="lp-product-card">
                  <div className="lp-product-card__screen">
                    <LayoutDashboard size={16} className="lp-product-card__badge" />
                    <ProductMock kind={shot.kind} />
                  </div>
                  <figcaption>
                    <strong>{shot.title}</strong>
                    <span>{shot.caption}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="lp-social">
          <Reveal>
            <div className="lp-quote">
              <div className="lp-quote__stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p>
                "סוף סוף הפסקתי לרדוף אחרי תורים בוואטסאפ. הכל במקום אחד — והלקוחות פשוט
                מגיעים."
              </p>
              <div className="lp-quote__stats">
                <div>
                  <strong>עסקים פעילים</strong>
                  <span>מקום למספר אמיתי</span>
                </div>
                <div>
                  <strong>Google Reviews</strong>
                  <span>מקום לדירוג ולביקורות</span>
                </div>
                <div>
                  <strong>לוגואים</strong>
                  <span>מקום ללקוחות שעובדים איתנו</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="lp-final">
          <Reveal>
            <div className="cta">
              <div className="cta__glow" aria-hidden="true" />
              <span className="kicker kicker--light">מוכנים לסדר את ניהול העסק?</span>
              <h2>קבעו הדגמה בחינם — ותראו את המערכת חיה</h2>
              <p>שיחת ייעוץ קצרה. בלי התחייבות. מספר מקומות מוגבל בכל שבוע.</p>
              <div className="cta__actions">
                <a className="btn btn--light" href="#lead-form" onClick={scrollToForm}>
                  אני רוצה לראות את המערכת
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

      <div className="lp-sticky-cta">
        <button type="button" className="btn btn--primary" onClick={scrollToForm}>
          קבעו הדגמה בחינם
        </button>
      </div>
    </div>
  );
}
