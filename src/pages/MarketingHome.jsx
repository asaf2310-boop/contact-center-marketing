import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarCheck,
  Check,
  CreditCard,
  ExternalLink,
  Headphones,
  LayoutDashboard,
  RefreshCw,
  Sparkles,
  Users,
  Utensils,
  Workflow,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import SiteContactLine from "@/components/SiteContactLine";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const contactCenterDemoUrl =
  import.meta.env.VITE_CONTACT_CENTER_DEMO_URL ||
  import.meta.env.VITE_PRODUCT_URL ||
  "https://smart-break-shift-demo.vercel.app";

const contactUrl = "#contact";

const navLinks = [
  { href: "/systems", label: "מערכות" },
  { href: "/services", label: "שירותים" },
  { href: "/guides", label: "מרכז הידע" },
  { href: "/about", label: "מי אנחנו" },
];

const products = [
  {
    id: "appointments",
    eyebrow: "לעסקי שירות וקליניקות",
    title: "מערכת ניהול תורים",
    description: "ניהול תורים, לקוחות, זמינות ותהליכים — בסביבת עבודה אחת שמותאמת לעסק.",
    capabilities: ["הזמנה אונליין", "ניהול יומן ולקוחות", "תזכורות ואוטומציות"],
    href: "/appointment-management",
    image: "/assets/home-appointment-ui.jpg",
    imageAlt: "ממשק אמיתי של מערכת ניהול התורים של AllInCenter",
    icon: CalendarCheck,
  },
  {
    id: "restaurants",
    eyebrow: "למסעדות ומתחמי אירוח",
    title: "מערכת הזמנות למסעדות",
    description: "מהזמנת השולחן ועד מפת הישיבה — תמונה תפעולית ברורה לצוות, בזמן אמת.",
    capabilities: ["הזמנת שולחן אונליין", "ניהול הזמנות", "מפת שולחנות ואזורי ישיבה"],
    href: "/restaurant-reservations",
    image: "/assets/home-restaurant-dashboard.jpg",
    imageAlt: "לוח הבקרה האמיתי של מערכת ההזמנות למסעדות",
    icon: Utensils,
  },
  {
    id: "contact-center",
    eyebrow: "למוקדים וצוותי שירות",
    title: "מוקד חכם",
    description: "ניהול זמינות, הפסקות ושיבוץ משמרות לצוותי מוקד — עם תמונת מצב משותפת וברורה.",
    capabilities: ["זמינות והפסקות בזמן אמת", "שיבוץ לפי אילוצים", "סביבת דמו פעילה"],
    href: contactCenterDemoUrl,
    image: null,
    imageAlt: "",
    icon: Headphones,
    external: true,
  },
];

function ProductVisual({ product, hero = false }) {
  return (
    <figure className={`home-product-visual ${hero ? "home-product-visual--hero" : ""}`}>
      <div className="home-product-visual__bar" aria-hidden="true">
        <span /><span /><span />
        <small>AllInCenter</small>
      </div>
      <img src={product.image} alt={product.imageAlt} loading={hero ? "eager" : "lazy"} />
      <figcaption><product.icon size={15} /> {product.title}</figcaption>
    </figure>
  );
}

function ProductSection({ product, index }) {
  return (
    <Reveal>
      <article className={`home-product ${index % 2 ? "home-product--reverse" : ""}`}>
        <div className="home-product__copy">
          <span className="home-eyebrow"><product.icon size={16} />{product.eyebrow}</span>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <ul>
            {product.capabilities.map((item) => <li key={item}><Check size={16} />{item}</li>)}
          </ul>
          <a className="home-text-link" href={product.href} {...(product.external ? { target: "_blank", rel: "noreferrer" } : {})}>
            {product.external ? "לצפייה בדמו" : "לפרטים על המערכת"}
            {product.external ? <ExternalLink size={16} /> : <ArrowLeft size={16} />}
          </a>
        </div>
        <ProductVisual product={product} />
      </article>
    </Reveal>
  );
}

export default function MarketingHome() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page home-refresh">
      <SiteHeader />

      <main id="top">
        <section className="home-hero">
          <div className="home-hero__copy">
            <Reveal><span className="tag"><Sparkles size={14} />Connect · Manage · Grow</span></Reveal>
            <Reveal delay={70}>
              <h1>העסק שלך.<br /><span>מערכת אחת שמנהלת הכול.</span></h1>
            </Reveal>
            <Reveal delay={140}>
              <p>AllInCenter מפתחת מערכות ניהול ואוטומציה מותאמות לעסקים בישראל — מערכות אמיתיות שמחברות את העבודה, הלקוחות והצוות במקום אחד.</p>
            </Reveal>
            <Reveal delay={210}>
              <div className="home-actions">
                <a className="btn btn--primary" href={contactUrl}>לבקשת הדגמה <ArrowLeft size={18} /></a>
                <a className="btn btn--ghost" href="/systems">לצפייה במערכות</a>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="home-proof" aria-label="יתרונות המערכת">
                <span><Check size={15} />ממשק מלא בעברית</span>
                <span><Check size={15} />התאמה לתהליכי העסק</span>
                <span><Check size={15} />מערכות פעילות ודמואים</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={160} className="home-hero__visual">
            <div className="home-hero__composition">
              <ProductVisual product={products[1]} hero />
              <div className="home-hero__side"><img src="/assets/restaurant-guest-booking.jpg" alt="ממשק הזמנת שולחן ללקוח" /></div>
            </div>
          </Reveal>
        </section>

        <section className="home-product-suite home-preview-section" id="solutions" aria-labelledby="products-heading">
          <Reveal>
            <div className="home-section-head">
              <span className="kicker">המערכות</span>
              <h2 id="products-heading">המערכות שלנו</h2>
              <p>מערכות פעילות שמותאמות לתהליכי עבודה אמיתיים — עם ממשק מלא בעברית.</p>
            </div>
          </Reveal>
          <div className="home-preview-grid">{products.map((product) => <article className="home-preview-card" key={product.id}><div className={`home-preview-card__visual ${product.id === "contact-center" ? "home-preview-card__visual--pending" : ""}`}>{product.id === "contact-center" ? <><Headphones size={34}/><strong>מוקד חכם</strong><div className="neutral-capabilities"><span>זמינות עובדים</span><span>הפסקות</span><span>שיבוץ משמרות</span></div></> : <img src={product.image} alt={product.imageAlt}/>}</div><h3>{product.title}</h3><p>{product.description}</p><a className="home-text-link" href={product.id === "contact-center" ? "/systems" : product.href}>לפרטים <ArrowLeft size={16}/></a></article>)}</div>
          <a className="home-all-link" href="/systems">לכל המערכות <ArrowLeft size={17}/></a>
        </section>

        <section className="home-services-preview" aria-labelledby="services-heading">
          <Reveal><div className="home-section-head"><span className="kicker">שירותים מקצועיים</span><h2 id="services-heading">השירותים שלנו</h2><p>תכנון, פיתוח וחיבור של תהליכים עסקיים — מהממשק ועד האוטומציה.</p></div></Reveal>
          <div className="home-service-grid">
            <article><LayoutDashboard/><h3>פיתוח מערכות ניהול מותאמות</h3><p>מערכות שנבנות סביב הלקוחות, ההזמנות ותהליכי העבודה של העסק.</p><a href="/services">לפרטים <ArrowLeft size={15}/></a></article>
            <article><Workflow/><h3>AI ואוטומציה לעסקים</h3><p>זיהוי, תכנון והובלת תהליכי AI ואוטומציה משלב האפיון ועד ההטמעה.</p><a href="/ai">לפרטים <ArrowLeft size={15}/></a></article>
            <article><Sparkles/><h3>נראות בגוגל ובמנועי AI</h3><p>תשתית דיגיטלית שעוזרת לעסק להימצא, להיות מובן ולהפוך חשיפה לפניות.</p><a href="/google-ai-visibility">לפרטים <ArrowLeft size={15}/></a></article>
          </div>
          <a className="home-all-link" href="/services">לכל השירותים <ArrowLeft size={17}/></a>
        </section>

        <section className="home-platform" id="platform" aria-labelledby="platform-heading">
          <Reveal>
            <div className="home-section-head home-section-head--center">
              <span className="kicker">מערכת אחת. תהליך אחד.</span>
              <h2 id="platform-heading">כך העבודה מתחברת מקצה לקצה</h2>
              <p>במקום מידע מפוזר בין כלים ושיחות, כל שלב ממשיך באופן טבעי לשלב הבא.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="home-flow">
              {[
                [Users, "לקוח"], [CalendarCheck, "תור או הזמנה"], [LayoutDashboard, "ניהול"],
                [CreditCard, "תשלום"], [Workflow, "אוטומציה ו־AI"], [RefreshCw, "מעקב"],
              ].map(([Icon, label], index, all) => (
                <React.Fragment key={label}>
                  <div className="home-flow__step"><span><Icon size={21} /></span><strong>{label}</strong></div>
                  {index < all.length - 1 && <ArrowLeft className="home-flow__arrow" size={19} aria-hidden="true" />}
                </React.Fragment>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="home-trust" aria-labelledby="trust-heading">
          <Reveal>
            <div>
              <span className="kicker">מוצר לפני הבטחות</span>
              <h2 id="trust-heading">רואים את המערכת לפני שמחליטים.</h2>
              <p>הדגמה שמבוססת על תהליכי העבודה של העסק, ממשקים בעברית וקישורים למערכות קיימות — בלי נתונים מומצאים ובלי מסכי שיווק.</p>
            </div>
            <a className="btn btn--ghost" href="/systems">לצפייה במערכות <ArrowLeft size={17} /></a>
          </Reveal>
        </section>


        <section className="section" id="contact">
          <Reveal>
            <div className="contact-section">
              <div className="contact-section__copy">
                <span className="kicker">לבקשת הדגמה</span>
                <h2>בואו נראה איך המערכת יכולה להתאים לעסק שלכם.</h2>
                <p>השאירו פרטים ונחזור לשיחת היכרות קצרה, כדי להבין את התהליך ולבנות הדגמה רלוונטית.</p>
                <ul><li><Check size={18} />היכרות עם תהליך העבודה</li><li><Check size={18} />הדגמה של מערכת אמיתית</li><li><Check size={18} />כיוון ברור להמשך</li></ul>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
