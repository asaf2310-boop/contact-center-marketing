import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CalendarClock,
  Check,
  Clock,
  Globe,
  Repeat,
  Sparkles,
} from "lucide-react";

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

const products = [
  {
    id: "queues",
    icon: CalendarClock,
    kicker: "ניהול תפעול",
    title: "מערכת ניהול תורים",
    description:
      "יומן חכם, קביעת תורים אונליין, תזכורות אוטומטיות וניהול לקוחות — הכול במקום אחד.",
    setup: "₪500",
    features: [
      "הזמנת תור עצמאית ללקוח",
      "תזכורות ואישורי תורים אוטומטיים",
      "ניהול לקוחות ותשלומים",
    ],
    options: [
      { icon: Repeat, label: "מסלול חודשי", price: "₪100", unit: "לחודש" },
      { icon: Clock, label: "בנק שעות", price: "₪250", unit: "לשעה" },
    ],
  },
  {
    id: "website",
    icon: Globe,
    kicker: "נוכחות דיגיטלית",
    title: "בניית אתר",
    description:
      "אתר תדמית מודרני, מהיר ומותאם למובייל — כולל עיצוב, תוכן וחיבור למערכות הניהול שלך.",
    setup: "₪2,000",
    features: [
      "עיצוב מותאם אישית ורספונסיבי",
      "מותאם SEO ומהיר טעינה",
      "חיבור לטפסים ולמערכות הלידים",
    ],
    options: [
      { icon: Repeat, label: "מסלול חודשי", price: "₪200", unit: "לחודש" },
      { icon: Clock, label: "בנק שעות", price: "₪250", unit: "לשעה" },
    ],
  },
];

export default function Pricing() {
  return (
    <div className="page pricing">
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
        {/* כותרת עמוד */}
        <section className="pricing-hero">
          <Reveal>
            <span className="kicker">
              <Sparkles size={14} />
              מחירון
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1>
              מחירים שקופים,{" "}
              <span className="gradient-text">בלי הפתעות.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="pricing-hero__sub">
              בוחרים מוצר, בוחרים מסלול — חודשי קבוע או בנק שעות גמיש. הקמה חד-פעמית
              וליווי מלא לאורך הדרך.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="pricing-hero__vat">המחירים אינם כוללים מע״מ</p>
          </Reveal>
        </section>

        {/* כרטיסי מחיר */}
        <section className="pricing-section">
          <div className="pricing__grid">
            {products.map((product, i) => {
              const Icon = product.icon;
              return (
                <Reveal key={product.id} delay={i * 100}>
                  <article className="pricing-card">
                    <div className="pricing-card__top">
                      <span className="pricing-card__icon">
                        <Icon size={22} />
                      </span>
                      <span className="pricing-card__kicker">{product.kicker}</span>
                    </div>

                    <h2>{product.title}</h2>
                    <p className="pricing-card__desc">{product.description}</p>

                    <div className="pricing-card__setup">
                      <span className="pricing-card__setup-label">הקמה חד-פעמית</span>
                      <span className="pricing-card__setup-price">{product.setup}</span>
                    </div>

                    <ul className="pricing-card__features">
                      {product.features.map((feature) => (
                        <li key={feature}>
                          <Check size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <span className="pricing-card__divider">
                      ובנוסף — בוחרים מסלול:
                    </span>

                    <div className="pricing-card__options">
                      {product.options.map((option) => {
                        const OptIcon = option.icon;
                        return (
                          <div className="pricing-option" key={option.label}>
                            <span className="pricing-option__label">
                              <OptIcon size={15} />
                              {option.label}
                            </span>
                            <span className="pricing-option__price">
                              {option.price}
                              <small>{option.unit}</small>
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <a className="btn btn--primary pricing-card__cta" href="/lp">
                      להשארת פרטים
                      <ArrowLeft size={18} />
                    </a>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <p className="pricing__note">
              לא בטוחים מה מתאים לכם? השאירו פרטים ונבנה יחד את החבילה הנכונה לעסק שלכם.
            </p>
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
