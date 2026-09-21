import React from "react";
import {
  ArrowLeft,
  CalendarCheck,
  Check,
  CreditCard,
  ExternalLink,
  Headphones,
  LayoutDashboard,
  MessageCircle,
  RefreshCw,
  Search,
  Sparkles,
  Users,
  Utensils,
  Workflow,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getWhatsAppHref } from "@/lib/site";

const contactCenterDemoUrl =
  import.meta.env.VITE_CONTACT_CENTER_DEMO_URL ||
  import.meta.env.VITE_PRODUCT_URL ||
  "https://smart-break-shift-demo.vercel.app";

const products = [
  {
    id: "appointments",
    eyebrow: "לעסקי שירות וקליניקות",
    title: "מערכת ניהול תורים",
    description: "ניהול תורים, לקוחות, זמינות ותהליכים — בסביבת עבודה אחת שמותאמת לעסק.",
    capabilities: ["הזמנה אונליין", "ניהול יומן ולקוחות", "תזכורות ואוטומציות"],
    href: "/appointment-management",
    image: "/assets/home-appointment-ui.jpg",
    imageAlt: "ממשק מערכת ניהול התורים של AllInCenter",
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

function ContactCenterPanel() {
  const capabilities = ["זמינות עובדים", "ניהול הפסקות", "שיבוץ משמרות", "תמונת מצב לצוות"];
  return (
    <div className="operations-panel" role="img" aria-label="המחשה תפעולית של יכולות מערכת המוקד החכם">
      <div className="operations-panel__top"><strong>מוקד חכם / LIVE</strong><span aria-hidden="true" /></div>
      <div className="operations-panel__body">
        <div className="operations-panel__states" aria-label="מצבי עבודה במערכת">
          <span><i aria-hidden="true" />זמין</span>
          <span><i aria-hidden="true" />בהפסקה</span>
          <span><i aria-hidden="true" />במשמרת</span>
        </div>
        <div className="operations-panel__timeline" aria-hidden="true">
          <div><span /><span /><span /></div>
          <div><span /><span /></div>
          <div><span /><span /><span /></div>
        </div>
        <div className="operations-panel__capabilities">
          {capabilities.map((capability, index) => <div key={capability}><small aria-hidden="true">0{index + 1}</small><span>{capability}</span><Check size={15} aria-hidden="true" /></div>)}
        </div>
      </div>
    </div>
  );
}

function ProductRow({ product, index }) {
  return (
    <Reveal>
      <article className={`editorial-product ${index % 2 ? "editorial-product--reverse" : ""}`}>
        <div className="editorial-product__visual">
          <div className="editorial-product__chrome" aria-hidden="true"><span /><span /><span /><small>AllInCenter / {String(index + 1).padStart(2, "0")}</small></div>
          {product.id === "contact-center" ? <ContactCenterPanel /> : <img src={product.image} alt={product.imageAlt} loading="lazy" />}
        </div>
        <div className="editorial-product__copy">
          <span className="editorial-index" aria-hidden="true">0{index + 1} / SYSTEM</span>
          <span className="home-eyebrow"><product.icon size={16} />{product.eyebrow}</span>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <ul>{product.capabilities.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
          <a className="home-text-link" href={product.href} {...(product.external ? { target: "_blank", rel: "noreferrer" } : {})}>
            {product.external ? "לצפייה בדמו" : "לפרטים על המערכת"}
            {product.external ? <ExternalLink size={16} /> : <ArrowLeft size={16} />}
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export default function MarketingHome() {
  return (
    <div className="page home-refresh home-editorial">
      <SiteHeader />
      <main id="top">
        <section className="home-hero">
          <div className="home-hero__copy">
            <Reveal><span className="home-hero__eyebrow">מערכות ניהול לעסקים בישראל</span></Reveal>
            <Reveal delay={60}><h1>פחות הודעות.<br /><span>יותר תורים מסודרים.</span></h1></Reveal>
            <Reveal delay={120}><p>אתר, WhatsApp ומערכת ניהול שעובדים יחד — מהחיפוש הראשון ועד לתור או להזמנה.</p></Reveal>
            <Reveal delay={180}>
              <div className="home-actions">
                <a className="btn btn--primary" href="#contact">לבקשת הדגמה <ArrowLeft size={18} /></a>
                <a className="btn btn--ghost" href="/systems">לצפייה במערכות</a>
              </div>
            </Reveal>
            <Reveal delay={220}><p className="home-proof">ממשק בעברית <i /> התאמה לעסק <i /> מערכת פעילה</p></Reveal>
          </div>

          <Reveal delay={100} className="home-hero__visual">
            <div className="home-hero__stage">
              <div className="home-hero__frame">
                <div className="home-hero__frame-bar" aria-hidden="true"><span /><span /><span /><small>AllInCenter / LIVE SYSTEM</small></div>
                <img src="/assets/home-restaurant-dashboard.jpg" alt="לוח הבקרה האמיתי של מערכת ההזמנות למסעדות" />
              </div>
              <div className="home-status-card" aria-label="חיבור ל-WhatsApp זמין">
                <MessageCircle size={19} aria-hidden="true" />
                <div><strong>WhatsApp מחובר</strong><span>המשך תהליך אוטומטי</span></div>
                <i aria-hidden="true" />
              </div>
              <div className="home-hero__serial" aria-hidden="true">AIC / 2026</div>
            </div>
          </Reveal>

          <div className="home-journey" aria-hidden="true">
            <span>SEARCH</span><i /><span>WHATSAPP</span><i /><span>BOOKING</span><i /><span>MANAGEMENT</span>
          </div>
        </section>

        <section className="home-product-suite" id="solutions" aria-labelledby="products-heading">
          <Reveal>
            <div className="home-section-head home-section-head--split">
              <span className="editorial-index" aria-hidden="true">01 / SYSTEMS</span>
              <div><h2 id="products-heading">מערכות שעובדות<br />בתוך העסק.</h2><p>מערכות פעילות שמותאמות לתהליכי עבודה אמיתיים — עם ממשק מלא בעברית.</p></div>
            </div>
          </Reveal>
          <div className="home-product-list">{products.map((product, index) => <ProductRow product={product} index={index} key={product.id} />)}</div>
          <a className="home-all-link" href="/systems">לכל המערכות <ArrowLeft size={17} /></a>
        </section>

        <section className="home-platform" id="platform" aria-labelledby="platform-heading">
          <Reveal>
            <div className="home-section-head home-section-head--split home-section-head--light">
              <span className="editorial-index">02 / CONNECT</span>
              <div><h2 id="platform-heading">מהחיפוש<br />ועד לניהול.</h2><p>במקום מידע מפוזר בין כלים ושיחות, כל שלב ממשיך באופן טבעי לשלב הבא.</p></div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="home-flow">
              {[[Search,"חיפוש"],[MessageCircle,"WhatsApp"],[CalendarCheck,"תור או הזמנה"],[LayoutDashboard,"ניהול"],[CreditCard,"תשלום"],[RefreshCw,"מעקב"]].map(([Icon,label], index) => (
                <div className="home-flow__step" key={label}><small>0{index + 1}</small><span><Icon size={21} /></span><strong>{label}</strong></div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="home-services-preview" aria-labelledby="services-heading">
          <Reveal><div className="home-section-head home-section-head--split"><span className="editorial-index">03 / SERVICES</span><div><h2 id="services-heading">המערכת במרכז.<br />האתר מביא אליה.</h2><p>מערכות ניהול לעסק, וחיבור של האתר והחיפוש אל התורים, ההזמנות והפניות.</p></div></div></Reveal>
          <div className="home-service-list">
            <article><span>01</span><LayoutDashboard/><div><h3>פיתוח מערכות ניהול מותאמות</h3><p>מערכות תורים, הזמנות וניהול שנבנות סביב הלקוחות ותהליכי העבודה של העסק.</p></div><a href="/services" aria-label="לפרטים על פיתוח מערכות"><ArrowLeft /></a></article>
            <article><span>02</span><Workflow/><div><h3>חיבור ל‑WhatsApp ולאוטומציות</h3><p>ניתן לחבר את האתר ואת מערכות התורים או ההזמנות ל‑WhatsApp ולתהליכים חוזרים — בהתאם לעסק.</p></div><a href="/services" aria-label="לפרטים על חיבור ל-WhatsApp"><ArrowLeft /></a></article>
            <article><span>03</span><Sparkles/><div><h3>בניית אתרים, SEO ונראות בחיפוש</h3><p>אתר ו‑SEO שמחברים חיפוש בגוגל ובמנועי AI לפנייה, לתור או להזמנה — בלי הבטחה לדירוג.</p></div><a href="/google-ai-visibility" aria-label="לפרטים על אתרים ונראות בחיפוש"><ArrowLeft /></a></article>
          </div>
          <a className="home-all-link" href="/services">לכל השירותים <ArrowLeft size={17}/></a>
        </section>

        <section className="home-trust" aria-labelledby="trust-heading">
          <Reveal><span className="editorial-index">04 / REAL PRODUCT</span><div><h2 id="trust-heading">רואים את המערכת<br />לפני שמחליטים.</h2><p>הדגמה שמבוססת על תהליכי העבודה של העסק, ממשקים בעברית וקישורים למערכות קיימות — בלי נתונים מומצאים ובלי מסכי שיווק.</p></div><a className="btn btn--ghost" href="/systems">לצפייה במערכות <ArrowLeft size={17} /></a></Reveal>
        </section>

        <section className="section" id="contact">
          <Reveal><div className="contact-section"><div className="contact-section__copy"><span className="editorial-index">05 / DEMO</span><h2>בואו נראה איך המערכת יכולה להתאים לעסק שלכם.</h2><p>השאירו פרטים ונחזור לשיחת היכרות קצרה, כדי להבין את התהליך ולבנות הדגמה רלוונטית.</p><ul><li><Check size={18} />היכרות עם תהליך העבודה</li><li><Check size={18} />הדגמה של מערכת אמיתית</li><li><Check size={18} />כיוון ברור להמשך</li></ul><a className="contact-section__whatsapp" href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer" data-analytics-location="contact">דברו איתנו ב-WhatsApp <MessageCircle size={18} /></a></div><ContactForm /></div></Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
