import React from "react";
import { ArrowLeft, CalendarCheck, Check, Headphones, Utensils } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const products = [
  {
    icon: CalendarCheck,
    title: "מערכת ניהול תורים",
    text: "ניהול תורים, לקוחות, זמינות ותהליכים במקום אחד.",
    points: ["הזמנה אונליין", "ניהול יומן ולקוחות", "תזכורות ואוטומציות"],
    href: "/appointment-management",
    image: "/assets/home-appointment-ui.jpg",
    alt: "ממשק מערכת ניהול התורים של AllInCenter",
  },
  {
    icon: Utensils,
    title: "מערכת הזמנות למסעדות",
    text: "הזמנות שולחן ומפת ישיבה בסביבת ניהול אחת לצוות.",
    points: ["הזמנת שולחן אונליין", "ניהול הזמנות", "מפת שולחנות"],
    href: "/restaurant-reservations",
    image: "/assets/home-restaurant-dashboard.jpg",
    alt: "לוח הבקרה של מערכת ההזמנות למסעדות",
  },
  {
    icon: Headphones,
    title: "מוקד חכם",
    text: "ניהול זמינות, הפסקות ושיבוץ משמרות לצוותי מוקד.",
    points: ["זמינות והפסקות", "שיבוץ לפי אילוצים", "תמונת מצב משותפת"],
    href: "#contact-center-note",
  },
];

function ContactCenterPreview() {
  return (
    <div className="systems-ops" role="img" aria-label="תצוגת יכולות של מערכת המוקד החכם: זמינות, הפסקות ושיבוץ משמרות">
      <div className="systems-ops__bar" aria-hidden="true">
        <span /><span /><span />
        <small>AllInCenter</small>
      </div>
      <div className="systems-ops__head">
        <strong>מוקד חכם</strong>
        <em>תמונת מצב משותפת</em>
      </div>
      <div className="systems-ops__states">
        <span><i aria-hidden="true" />זמין</span>
        <span><i aria-hidden="true" />בהפסקה</span>
        <span><i aria-hidden="true" />במשמרת</span>
      </div>
      <ul>
        {["זמינות עובדים", "ניהול הפסקות", "שיבוץ משמרות"].map((item) => (
          <li key={item}><Check size={15} aria-hidden="true" />{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function SystemsHub() {
  return (
    <div className="page hub-page systems-page">
      <SiteHeader />
      <main>
        <section className="systems-hero">
          <div className="systems-hero__copy">
            <span className="kicker">מוצרי AllInCenter</span>
            <h1>מערכות שעושות סדר בעסק</h1>
            <p>מערכות AllInCenter לניהול תורים, הזמנות ומוקדים — <span>בעברית, בהתאמה לעסק ובמקום אחד.</span></p>
            <div className="systems-hero__actions">
              <a className="btn btn--primary" href="/#contact">לבקשת הדגמה <ArrowLeft size={18} /></a>
              <a className="btn btn--ghost" href="#systems-products">צפו במערכות</a>
            </div>
          </div>
          <div className="systems-hero__visual">
            <div className="systems-showcase">
              <figure className="systems-showcase__main">
                <div className="systems-chrome" aria-hidden="true"><span /><span /><span /><small>AllInCenter</small></div>
                <img
                  src="/assets/home-restaurant-dashboard.jpg"
                  alt="לוח הבקרה של מערכת ההזמנות למסעדות"
                  width="1600"
                  height="1000"
                  fetchpriority="high"
                  loading="eager"
                  decoding="async"
                />
              </figure>
              <figure className="systems-showcase__card">
                <img
                  src="/assets/home-appointment-ui.jpg"
                  alt="ממשק מערכת ניהול התורים של AllInCenter"
                  width="1200"
                  height="900"
                  decoding="async"
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="systems-list" id="systems-products" aria-label="מערכות AllInCenter">
          <div className="systems-list__intro">
            <span className="kicker">מערכות ניהול לעסקים</span>
            <p>כל מערכת נבנית סביב העבודה האמיתית של העסק — ומפנה למוצר הייעודי שלה.</p>
          </div>
          {products.map((product, index) => (
            <article
              className={`systems-product ${index % 2 ? "systems-product--reverse" : ""}`}
              key={product.title}
              id={product.href === "#contact-center-note" ? "contact-center-note" : undefined}
            >
              <div className="systems-product__copy">
                <span className="home-eyebrow"><product.icon size={17} />מערכת פעילה</span>
                <h2>{product.title}</h2>
                <p>{product.text}</p>
                <ul>
                  {product.points.map((point) => (
                    <li key={point}><Check size={16} />{point}</li>
                  ))}
                </ul>
                {product.image ? (
                  <a className="btn btn--ghost" href={product.href}>לעמוד המוצר <ArrowLeft size={16} /></a>
                ) : (
                  <a className="btn btn--ghost" href="/#contact">לבקשת הדגמה <ArrowLeft size={16} /></a>
                )}
              </div>
              <div className={`systems-product__visual ${product.image ? "" : "systems-product__visual--preview"}`}>
                {product.image ? (
                  <img src={product.image} alt={product.alt} loading="lazy" />
                ) : (
                  <ContactCenterPreview />
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="hub-cta">
          <h2>רוצים לראות מערכת שמתאימה לתהליך שלכם?</h2>
          <a className="btn btn--primary" href="/#contact">לבקשת הדגמה <ArrowLeft size={17} /></a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
