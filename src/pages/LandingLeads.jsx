import React, { useId, useRef, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  CalendarCheck,
  CalendarDays,
  Check,
  CreditCard,
  Flag,
  Headset,
  LayoutDashboard,
  Lock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
  Users,
  Zap,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import SiteContactLine from "@/components/SiteContactLine";
import { getWhatsAppHref } from "@/lib/site";

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={`lp-faq__item${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="lp-faq__question"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{question}</span>
        <i aria-hidden="true" />
      </button>
      <div id={panelId} className="lp-faq__answer" hidden={!open}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

const capabilityChecks = [
  "ניהול תורים",
  "סליקה ותשלומים",
  "CRM",
  "אוטומציות",
];

const formTrust = [
  { icon: Zap, label: "הקמה תוך יום עסקים" },
  { icon: Flag, label: "תמיכה ישראלית" },
  { icon: ShieldCheck, label: "ללא התחייבות" },
  { icon: UserRound, label: "התאמה אישית לעסק" },
];

const glassBadges = [
  { icon: Flag, label: "פיתוח ישראלי" },
  { icon: Lock, label: "מאובטח" },
  { icon: Zap, label: "הקמה מהירה" },
  { icon: Headset, label: "ליווי אישי" },
];

const howSteps = [
  {
    step: "1",
    title: "משאירים פרטים",
    text: "שם וטלפון — ונחזור אליכם תוך יום עסקים עם הצעה ברורה.",
  },
  {
    step: "2",
    title: "מקבלים הדגמה אישית",
    text: "שיחה קצרה שמראה איך תחסכו זמן ותפסיקו לרדוף אחרי לקוחות.",
  },
  {
    step: "3",
    title: "מתחילים לנהל את העסק",
    text: "תורים, לקוחות ותשלומים במקום אחד — פחות בלגן, יותר שליטה.",
  },
];

const productShots = [
  {
    title: "Dashboard",
    caption: "רואים במבט אחד מה קורה בעסק היום",
    kind: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "CRM",
    caption: "כל לקוח, שיחה והיסטוריה — בלי לחפש בוואטסאפ",
    kind: "crm",
    icon: Users,
  },
  {
    title: "Calendar",
    caption: "יומן מסודר שממלא את עצמו ומפחית ביטולים",
    kind: "calendar",
    icon: CalendarDays,
  },
  {
    title: "Appointments",
    caption: "פחות תורים שנופלים בין הכיסאות",
    kind: "appointments",
    icon: CalendarCheck,
  },
  {
    title: "Payments",
    caption: "גבייה מסודרת — פחות רדיפה אחרי תשלומים",
    kind: "payments",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    caption: "החלטות לפי נתונים, לא לפי תחושת בטן",
    kind: "analytics",
    icon: BarChart3,
  },
];

const faqItems = [
  {
    question: "כמה זמן לוקחת ההקמה?",
    answer:
      "ברוב המקרים תוך יום עסקים אחד. מתאימים את המערכת לתהליך שלכם ומעלים לאוויר בלי לעצור את העבודה השוטפת.",
  },
  {
    question: "האם יש התחייבות?",
    answer:
      "לא. מתחילים בהדגמה ובהצעה ברורה, בלי התחייבות מראש. אתם מחליטים רק אחרי שראיתם שהמערכת באמת חוסכת לכם זמן.",
  },
  {
    question: "אפשר לחבר סליקה?",
    answer:
      "כן. מחברים סליקה ותשלומים כדי שהלקוחות ישלמו בקלות — ואתם תפסיקו לרדוף אחרי חובות וקישורים מפוזרים.",
  },
  {
    question: "אפשר לעבוד מהטלפון?",
    answer:
      "כן. המערכת מותאמת למובייל, כדי שתוכלו לנהל תורים, לקוחות ותשלומים גם מהטלפון בזמן שאתם בעסק.",
  },
  {
    question: "האם אפשר להעביר נתונים ממערכת קיימת?",
    answer:
      "ברוב המקרים כן. מעבירים לקוחות, תורים ונתונים רלוונטיים כדי שלא תתחילו מאפס ותשמרו על רצף מול הלקוחות.",
  },
];

const logoPlaceholders = ["לוגו לקוח", "לוגו לקוח", "לוגו לקוח", "לוגו לקוח", "לוגו לקוח"];

function ProductMock({ kind }) {
  if (kind === "dashboard") {
    return (
      <div className="lp-mock lp-mock--dashboard" aria-hidden="true">
        <div className="lp-mock__chrome">
          <i />
          <i />
          <i />
        </div>
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
        {Array.from({ length: 28 }).map((_, index) => (
          <span key={index} className={index % 6 === 0 ? "is-active" : undefined} />
        ))}
      </div>
    );
  }

  if (kind === "appointments") {
    return (
      <div className="lp-mock lp-mock--appointments" aria-hidden="true">
        {["09:00 · תור חדש", "11:30 · אושר", "16:00 · תזכורת"].map((item) => (
          <div key={item}>
            <b />
            <span>{item}</span>
          </div>
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

  if (kind === "payments") {
    return (
      <div className="lp-mock lp-mock--payments" aria-hidden="true">
        <div className="lp-mock__pay-head">
          <strong>₪12,480</strong>
          <span>החודש</span>
        </div>
        <div className="lp-mock__pay-rows">
          <span />
          <span />
          <span />
        </div>
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
  const whatsappHref = getWhatsAppHref();

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
          <img src="/assets/allincenter-logo.png" alt="AllInCenter" width="52" height="52" decoding="async" />
          <span>
            All<b>In</b>Center
          </span>
        </a>
        <nav>
          <a className="btn btn--primary btn--sm lp-nav__cta lp-cta" href="#lead-form" onClick={scrollToForm}>
            קבעו הדגמה בחינם
            <ArrowLeft size={16} />
          </a>
        </nav>
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
            <Reveal delay={60}>
              <h1>
                מערכת אחת לניהול העסק שלך
                <br />
                <span className="gradient-text">חסכו שעות כל שבוע — ותפסיקו לרדוף אחרי לקוחות</span>
              </h1>
            </Reveal>
            <Reveal delay={100}>
              <ul className="lp-hero__checks">
                {capabilityChecks.map((label) => (
                  <li key={label}>
                    <Check size={15} strokeWidth={3} aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={140}>
              <p className="lp-hero__sub">
                AllInCenter מפתחת מערכות ניהול מותאמות לעסקים בישראל — פחות ביטולי
                תורים, יותר לקוחות מרוצים, וכל התפעול במקום אחד במקום וואטסאפ, אקסל
                וחמש מערכות שונות.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="lp-glass-badges lp-glass-badges--hero">
                {glassBadges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <span key={item.label} className="lp-glass-badge">
                      <Icon size={15} />
                      {item.label}
                    </span>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="lp-form-wrap">
            <div className="lp-form-card" id="lead-form" ref={formRef}>
              <div className="lp-form-card__head">
                <h2>קבעו הדגמה בחינם</h2>
                <p>השאירו פרטים — ותראו תוך דקות איך העסק מתנהל מסודר יותר.</p>
              </div>
              <ContactForm source="facebook" compact submitLabel="קבעו הדגמה בחינם" />
              <div className="lp-form-trust">
                {formTrust.map((item) => {
                  const Icon = item.icon;
                  return (
                    <span key={item.label}>
                      <Icon size={14} />
                      {item.label}
                    </span>
                  );
                })}
              </div>
              <p className="lp-form-urgency">מספר מקומות להדגמה מוגבל בכל שבוע</p>
            </div>
          </Reveal>
        </section>

        <section className="lp-product" aria-labelledby="lp-product-title">
          <Reveal>
            <div className="section__head lp-section-head">
              <span className="kicker">הכירו את המערכת</span>
              <h2 id="lp-product-title">
                רואים איך זה נראה — <span className="gradient-text">לא רק שומעים הבטחות</span>
              </h2>
              <p className="lp-section-head__sub">
                מסכים אמיתיים של ניהול יומיומי: תורים, לקוחות, תשלומים ונתונים — בלי בלגן.
              </p>
            </div>
          </Reveal>
          <div className="lp-product__grid lp-product__grid--six">
            {productShots.map((shot, index) => {
              const Icon = shot.icon;
              return (
                <Reveal key={shot.title} delay={index * 60}>
                  <figure className="lp-product-card">
                    <div className="lp-product-card__screen">
                      <Icon size={16} className="lp-product-card__badge" aria-hidden="true" />
                      <ProductMock kind={shot.kind} />
                    </div>
                    <figcaption>
                      <strong>{shot.title}</strong>
                      <span>{shot.caption}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="lp-how" aria-labelledby="lp-how-title">
          <Reveal>
            <div className="section__head lp-section-head">
              <span className="kicker">איך זה עובד</span>
              <h2 id="lp-how-title">
                שלושה צעדים — <span className="gradient-text">ואתם חוזרים לנהל את העסק</span>
              </h2>
            </div>
          </Reveal>
          <div className="lp-how__grid">
            {howSteps.map((item, index) => (
              <Reveal key={item.step} delay={index * 80} className="lp-how__step">
                {index > 0 ? <span className="lp-how__connector" aria-hidden="true" /> : null}
                <article className="lp-how-card">
                  <span className="lp-how-card__step">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="lp-social" aria-labelledby="lp-social-title">
          <Reveal>
            <div className="section__head lp-section-head">
              <span className="kicker">אמון והוכחות</span>
              <h2 id="lp-social-title">
                עסקים שרוצים <span className="gradient-text">פחות בלגן ויותר תוצאות</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="lp-logos" aria-label="מקום ללוגואים של לקוחות">
              {logoPlaceholders.map((label, index) => (
                <div key={`${label}-${index}`} className="lp-logo-slot">
                  {label}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="lp-quote">
              <div className="lp-quote__stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p>
                &ldquo;סוף סוף הפסקתי לרדוף אחרי תורים בוואטסאפ. הכל במקום אחד — והלקוחות
                פשוט מגיעים.&rdquo;
              </p>
              <div className="lp-quote__meta">
                <strong>המלצת לקוח</strong>
                <span>מקום לשם + תחום העסק</span>
              </div>
              <div className="lp-quote__stats">
                <div>
                  <strong>—</strong>
                  <span>עסקים פעילים</span>
                </div>
                <div>
                  <strong>★ —</strong>
                  <span>Google Reviews</span>
                </div>
                <div>
                  <strong>—</strong>
                  <span>ביקורות לקוחות</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="lp-faq" aria-labelledby="lp-faq-title">
          <Reveal>
            <div className="section__head lp-section-head">
              <span className="kicker">שאלות נפוצות</span>
              <h2 id="lp-faq-title">
                כל מה שחשוב לדעת <span className="gradient-text">לפני ההדגמה</span>
              </h2>
            </div>
          </Reveal>
          <div className="lp-faq__list">
            {faqItems.map((item, index) => (
              <Reveal key={item.question} delay={index * 40}>
                <FaqItem question={item.question} answer={item.answer} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="lp-final">
          <Reveal>
            <div className="cta">
              <div className="cta__glow" aria-hidden="true" />
              <span className="kicker kicker--light">מוכנים לחסוך זמן כל שבוע?</span>
              <h2>קבעו הדגמה בחינם — ותראו את העסק מסתדר</h2>
              <p>שיחה קצרה, בלי התחייבות. תראו איך מפחיתים ביטולים ומנהלים הכל במקום אחד.</p>
              <div className="cta__actions">
                <a className="btn btn--light lp-cta" href="#lead-form" onClick={scrollToForm}>
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
            <img
              src="/assets/allincenter-logo.png"
              alt="AllInCenter"
              width="44"
              height="44"
              loading="lazy"
              decoding="async"
            />
            <div>
              <strong>AllInCenter</strong>
              <small>Connect · Manage · Grow</small>
            </div>
          </div>
          <SiteContactLine showAiLink />
          <small className="footer__note">
            © {new Date().getFullYear()} AllInCenter · allincenter.co.il · מערכות ניהול
            מותאמות לעסקים בישראל
          </small>
        </div>
      </footer>

      <a
        className="lp-whatsapp"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="פתיחת שיחת WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      <div className="lp-sticky-cta">
        <button type="button" className="btn btn--primary lp-cta" onClick={scrollToForm}>
          קבעו הדגמה בחינם
          <ArrowLeft size={18} />
        </button>
      </div>
    </div>
  );
}
