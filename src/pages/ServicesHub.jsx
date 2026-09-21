import React from "react";
import { ArrowLeft, Check } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const services = [
  {
    key: "systems",
    eyebrow: "פיתוח מערכות ניהול",
    title: "פיתוח מערכות ניהול מותאמות לעסק",
    text: "אפיון ופיתוח של סביבת ניהול שמחברת לקוחות, תורים, הזמנות ותהליכי עבודה.",
    points: ["ממשקי ניהול", "ניהול לקוחות ותהליכים", "פתרונות מותאמים"],
    href: "/#contact",
    cta: "בואו נדבר",
  },
  {
    key: "ai",
    eyebrow: "AI ואוטומציה",
    title: "AI ואוטומציה לעסקים",
    text: "זיהוי הזדמנויות, אפיון והובלת פתרונות AI ואוטומציה בהתאם לצורך העסקי.",
    points: ["אפיון תהליך", "חיבור פעולות חוזרות", "ליווי עד ההטמעה"],
    href: "/ai",
    cta: "לעמוד השירות",
  },
  {
    key: "seo",
    eyebrow: "אתר, SEO וחיפוש",
    title: "בניית אתרים, SEO ונראות בחיפוש",
    text: "בנייה או שיפור של אתר העסק, SEO טכני ומבנה תוכן, וחיבור למערכת תורים, הזמנות או WhatsApp — כדי להפוך חיפוש לפנייה.",
    points: ["בניית ושיפור אתרים", "SEO ונראות בחיפוש", "חיבור לתורים, הזמנות ו‑WhatsApp"],
    href: "/google-ai-visibility",
    cta: "לעמוד השירות",
  },
  {
    key: "integrations",
    eyebrow: "אינטגרציות",
    title: "אינטגרציות וחיבור מערכות",
    text: "חיבור האתר, מערכות התורים וההזמנות, WhatsApp ואוטומציות לתהליך עבודה רציף — בהתאם לעסק.",
    points: ["חיבור לאתר ולטפסים", "WhatsApp ואוטומציות", "תורים, הזמנות ומערכות ניהול"],
    href: "/#contact",
    cta: "בואו נדבר",
  },
];

function Chrome({ label }) {
  return (
    <div className="svc-chrome" aria-hidden="true">
      <span /><span /><span />
      <small>{label}</small>
    </div>
  );
}

function HeroWorkflow() {
  return (
    <div className="svc-hero-board" role="img" aria-label="תהליך עבודה: אתר ולקוח, AI ואוטומציה, מערכת ניהול, ואז WhatsApp, תורים והזמנות">
      <Chrome label="תהליך עבודה" />
      <div className="svc-hero-board__body">
        <aside className="svc-hero-board__rail" aria-hidden="true">
          <span>לקוח</span>
          <span>תהליך</span>
          <span>מערכת</span>
        </aside>
        <div className="svc-hero-board__flow">
          <div className="svc-node">
            <b>אתר / לקוח</b>
            <em>פנייה נכנסת</em>
            <div className="svc-node__rows"><span>טופס או דף נחיתה</span><span>בקשה חדשה</span></div>
          </div>
          <i className="svc-connector" aria-hidden="true" />
          <div className="svc-node svc-node--accent">
            <b>AI ואוטומציה</b>
            <em>ניתוב לפי תהליך</em>
            <div className="svc-node__rows"><span>הבנת הפנייה</span><span>הפעלת פעולה</span></div>
          </div>
          <i className="svc-connector" aria-hidden="true" />
          <div className="svc-node">
            <b>מערכת ניהול</b>
            <em>סביבת העבודה של הצוות</em>
            <div className="svc-node__rows"><span>תורים</span><span>הזמנות</span><span>לקוחות</span></div>
          </div>
          <i className="svc-connector" aria-hidden="true" />
          <div className="svc-hero-board__ends">
            <span>WhatsApp</span>
            <span>תורים</span>
            <span>הזמנות</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemsCollage() {
  return (
    <div className="svc-collage">
      <figure className="svc-collage__main">
        <Chrome label="הזמנות" />
        <img
          src="/assets/home-restaurant-dashboard.jpg"
          alt="לוח הבקרה של מערכת ההזמנות למסעדות"
          width="1600"
          height="1000"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <figure className="svc-collage__card">
        <Chrome label="תורים" />
        <img
          src="/assets/home-appointment-ui.jpg"
          alt="ממשק מערכת ניהול התורים של AllInCenter"
          width="1200"
          height="900"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </div>
  );
}

function AutomationFlow() {
  const steps = [
    ["בקשה נכנסת", "אתר, טופס או WhatsApp"],
    ["ניתוח AI", "הבנת הצורך והפניה"],
    ["פעולה אוטומטית", "אישור, תזכורת או ניתוב"],
    ["מערכת ניהול", "תור, הזמנה או רשומה"],
  ];
  return (
    <div className="svc-auto" role="img" aria-label="זרימת אוטומציה: בקשה נכנסת, ניתוח AI, פעולה אוטומטית ומערכת ניהול">
      <Chrome label="אוטומציה" />
      <ol>
        {steps.map(([title, note]) => (
          <li key={title}>
            <strong>{title}</strong>
            <span>{note}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SearchPreview() {
  return (
    <div className="svc-search">
      <figure>
        <Chrome label="אתר העסק" />
        <img
          src="/assets/restaurant-guest-booking.jpg"
          alt="ממשק הזמנת שולחן באתר, כפי שהוא מוצג לאורח"
          width="1600"
          height="1000"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="svc-search__panel" role="img" aria-label="ייצוג של תוצאת חיפוש עם דגש על מבנה תוכן, Schema וחיבור לתהליך — בלי דירוגים או נתוני תנועה">
        <small>תוצאה בחיפוש</small>
        <strong>AllInCenter — אתר שמחובר לתהליך</strong>
        <p>מבנה תוכן, SEO טכני וחיבור לתורים, הזמנות או WhatsApp — כדי להפוך חיפוש לפנייה.</p>
        <div>
          <span>מבנה תוכן</span>
          <span>Schema</span>
          <span>חיבור לתהליך</span>
        </div>
      </div>
    </div>
  );
}

function IntegrationMap() {
  return (
    <div className="svc-map" role="img" aria-label="מפת חיבורים: אתר, מערכת ניהול, WhatsApp ואוטומציה סביב תהליך משותף">
      <Chrome label="חיבור מערכות" />
      <div className="svc-map__grid">
        <div className="svc-map__node svc-map__node--top">אתר</div>
        <span className="svc-map__line svc-map__line--v" aria-hidden="true" />
        <div className="svc-map__mid">
          <div className="svc-map__node">WhatsApp</div>
          <span className="svc-map__line svc-map__line--h" aria-hidden="true" />
          <div className="svc-map__hub">תהליך משותף</div>
          <span className="svc-map__line svc-map__line--h" aria-hidden="true" />
          <div className="svc-map__node">אוטומציה</div>
        </div>
        <span className="svc-map__line svc-map__line--v" aria-hidden="true" />
        <div className="svc-map__node svc-map__node--bottom">מערכת ניהול</div>
        <p>טפסים · תורים · הזמנות</p>
      </div>
    </div>
  );
}

const visuals = {
  systems: SystemsCollage,
  ai: AutomationFlow,
  seo: SearchPreview,
  integrations: IntegrationMap,
};

export default function ServicesHub() {
  return (
    <div className="page hub-page services-page">
      <SiteHeader />
      <main>
        <section className="svc-hero">
          <div className="svc-hero__copy">
            <span className="kicker">שירותים מקצועיים</span>
            <h1>טכנולוגיה שעובדת בשביל העסק</h1>
            <p>פיתוח מערכות, AI ואוטומציה, אתרים ואינטגרציות — פתרונות שמחברים את הטכנולוגיה לתהליך העבודה האמיתי של העסק.</p>
            <div className="svc-hero__actions">
              <a className="btn btn--primary" href="/#contact">בואו נדבר <ArrowLeft size={18} /></a>
              <a className="btn btn--ghost" href="#services-list">השירותים שלנו</a>
            </div>
          </div>
          <div className="svc-hero__visual">
            <HeroWorkflow />
          </div>
        </section>

        <section className="svc-list" id="services-list" aria-label="שירותי AllInCenter לעסקים">
          <div className="svc-list__intro">
            <span className="kicker">שירותי AllInCenter לעסקים</span>
            <p>AllInCenter עוזרת לעסקים לנהל תורים והזמנות, לבנות או לשפר את האתר, לחזק SEO, ולחבר את החיפוש לפנייה — כולל חיבור ל‑WhatsApp בהתאם לתהליך העסק.</p>
          </div>
          {services.map((service, index) => {
            const Visual = visuals[service.key];
            return (
              <article className={`svc-item ${index % 2 ? "svc-item--reverse" : ""}`} key={service.title}>
                <div className="svc-item__copy">
                  <span className="home-eyebrow">{service.eyebrow}</span>
                  <h2>{service.title}</h2>
                  <p>{service.text}</p>
                  <ul>
                    {service.points.map((point) => (
                      <li key={point}><Check size={16} aria-hidden="true" />{point}</li>
                    ))}
                  </ul>
                  <a className="btn btn--ghost" href={service.href}>{service.cta} <ArrowLeft size={16} /></a>
                </div>
                <div className="svc-item__visual">
                  <Visual />
                </div>
              </article>
            );
          })}
        </section>

        <section className="svc-cta">
          <p className="svc-cta__kicker">השלב הבא</p>
          <h2>מחפשים דרך לחבר ולייעל את העבודה בעסק?</h2>
          <p>נבין את התהליך הקיים, ונראה איך פיתוח מערכות ניהול, AI ואוטומציה, בניית אתרים ואינטגרציות יכולים להתחבר אליו.</p>
          <a className="btn btn--primary" href="/#contact">בואו נדבר <ArrowLeft size={17} /></a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
