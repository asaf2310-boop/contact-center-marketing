import React from "react";
import {
  ArrowLeft,
  CalendarClock,
  Check,
  Globe,
  Sparkles,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SiteContactLine from "@/components/SiteContactLine";

const products = [
  {
    id: "queues",
    icon: CalendarClock,
    kicker: "ניהול תפעול",
    title: "מערכת ניהול תורים",
    description:
      "יומן חכם, קביעת תורים אונליין, תזכורות אוטומטיות וניהול לקוחות — הכול במקום אחד.",
    video: "/videos/maya-queue-management.mp4",
    packageLabel: "חבילה שנתית",
    price: "900 ₪ לשנה",
    packageNote: "כולל שירות ותמיכה לאורך השנה",
    setupNote: "ללא עלות הקמה",
    features: [
      "הזמנת תור עצמאית ללקוח",
      "תזכורות ואישורי תורים אוטומטיים",
      "ניהול לקוחות ותשלומים",
    ],
  },
  {
    id: "website",
    icon: Globe,
    kicker: "נוכחות דיגיטלית",
    title: "בניית אתר",
    description:
      "אתר תדמית מודרני, מהיר ומותאם למובייל — כולל עיצוב, תוכן וחיבור למערכות הניהול שלך.",
    packageLabel: "חבילה שנתית",
    price: "2,000 ₪ לשנה",
    packageNote: "כולל בניית האתר, שירות ותמיכה לאורך השנה",
    setupNote: "ללא עלות הקמה",
    features: [
      "עיצוב מותאם אישית ורספונסיבי",
      "מותאם SEO ומהיר טעינה",
      "חיבור לטפסים ולמערכות הלידים",
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
              חבילות שנתיות למערכות ניהול וזימון תורים לעסקים בישראל. בוחרים
              מוצר ומתחילים — בלי עלות הקמה.
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

                    {product.video ? (
                      <div className="pricing-card__video">
                        <video
                          controls
                          playsInline
                          preload="metadata"
                          title={`סרטון ${product.title}`}
                        >
                          <source src={product.video} type="video/mp4" />
                        </video>
                      </div>
                    ) : null}

                    <div className="pricing-card__annual">
                      <span className="pricing-card__annual-label">
                        {product.packageLabel}
                      </span>
                      <span className="pricing-card__annual-price">
                        {product.price}
                      </span>
                      <span className="pricing-card__annual-note">
                        {product.packageNote}
                      </span>
                      <span className="pricing-card__annual-setup">
                        {product.setupNote}
                      </span>
                    </div>

                    <ul className="pricing-card__features">
                      {product.features.map((feature) => (
                        <li key={feature}>
                          <Check size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>

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
          <nav className="footer__links">
            <a href="/ai">ייעוץ AI ואוטומציה</a>
          </nav>
          <SiteContactLine />
          <small className="footer__note">
            © {new Date().getFullYear()} AllInCenter · allincenter.co.il · מערכות ניהול
            מותאמות לעסקים בישראל
          </small>
        </div>
      </footer>
    </div>
  );
}
