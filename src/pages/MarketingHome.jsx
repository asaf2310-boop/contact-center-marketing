import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Bot,
  CalendarCheck,
  CheckCircle2,
  Clock,
  CreditCard,
  ExternalLink,
  Headphones,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import SiteContactLine from "@/components/SiteContactLine";

/* ---------- קישורים ---------- */

const contactCenterDemoUrl =
  import.meta.env.VITE_CONTACT_CENTER_DEMO_URL ||
  import.meta.env.VITE_PRODUCT_URL ||
  "https://smart-break-shift-demo.vercel.app";

const mayaClinicDemoUrl =
  import.meta.env.VITE_MAYACLINIC_DEMO_URL || "https://mayaclinic-demo.vercel.app";

const mayaClinicBookingUrl = `${mayaClinicDemoUrl.replace(/\/$/, "")}/book`;
const mayaClinicAdminUrl = `${mayaClinicDemoUrl.replace(/\/$/, "")}/admin`;

const contactUrl = "#contact";

/* ---------- מוקאפ דשבורד בהירו ---------- */

function HeroDashboard() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="glass-window">
        <div className="glass-window__bar">
          <span className="dot dot--r" />
          <span className="dot dot--y" />
          <span className="dot dot--g" />
          <em>AllInCenter · תמונת מצב חיה</em>
          <span className="live-pill">
            <i />LIVE
          </span>
        </div>

        <div className="glass-window__body">
          <div className="metric-tiles">
            <div className="metric-tile">
              <small>הכנסות החודש</small>
              <strong>₪48,200</strong>
              <span className="delta up">
                <TrendingUp size={13} /> 12%+
              </span>
            </div>
            <div className="metric-tile">
              <small>לקוחות פעילים</small>
              <strong>312</strong>
              <span className="delta up">
                <TrendingUp size={13} /> 24+
              </span>
            </div>
            <div className="metric-tile">
              <small>שעות שנחסכו</small>
              <strong>6.5</strong>
              <span className="delta">ביום</span>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-card__head">
              <small>תשלומים שהתקבלו</small>
              <span>7 ימים</span>
            </div>
            <div className="chart-bars">
              {[42, 66, 51, 78, 64, 90, 72].map((h, i) => (
                <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }} />
              ))}
            </div>
          </div>

          <div className="feed-card">
            <div className="feed-row">
              <span className="feed-icon feed-icon--pay">
                <CreditCard size={14} />
              </span>
              <div>
                <strong>תשלום התקבל · ₪320</strong>
                <small>דנה כהן · טיפול פנים</small>
              </div>
              <em>עכשיו</em>
            </div>
            <div className="feed-row">
              <span className="feed-icon feed-icon--cal">
                <CalendarCheck size={14} />
              </span>
              <div>
                <strong>תור חדש נקבע</strong>
                <small>יוסי לוי · מחר 12:00</small>
              </div>
              <em>לפני 4 דק׳</em>
            </div>
            <div className="feed-row">
              <span className="feed-icon feed-icon--lead">
                <MapPin size={14} />
              </span>
              <div>
                <strong>ליד חדש ממפות Google</strong>
                <small>קליניקת אסתטיקה · תל אביב</small>
              </div>
              <em>לפני 9 דק׳</em>
            </div>
          </div>
        </div>
      </div>

      <div className="float-chip float-chip--a">
        <Zap size={15} />
        אוטומציה פעילה
      </div>
      <div className="float-chip float-chip--b">
        <ShieldCheck size={15} />
        נתונים מאובטחים בענן
      </div>
    </div>
  );
}

/* ---------- מוקאפ מפת לידים ---------- */

function LeadsMapMock() {
  const pins = [
    { top: "22%", right: "30%", hot: true },
    { top: "48%", right: "14%" },
    { top: "38%", right: "58%", hot: true },
    { top: "66%", right: "42%" },
    { top: "58%", right: "72%" },
    { top: "78%", right: "20%" },
  ];
  return (
    <div className="map-mock" aria-hidden="true">
      <div className="map-grid" />
      <div className="map-roads" />
      {pins.map((pin, i) => (
        <span
          key={i}
          className={`map-pin ${pin.hot ? "map-pin--hot" : ""}`}
          style={{ top: pin.top, right: pin.right, animationDelay: `${i * 350}ms` }}
        >
          <MapPin size={14} />
        </span>
      ))}
      <div className="map-result">
        <Search size={13} />
        <div>
          <strong>38 עסקים נמצאו</strong>
          <small>קליניקות · מרכז תל אביב</small>
        </div>
        <span className="map-score">92</span>
      </div>
    </div>
  );
}

/* ---------- נתונים ---------- */

const navLinks = [
  { href: "#platform", label: "הפלטפורמה" },
  { href: "#solutions", label: "המערכות" },
  { href: "#process", label: "איך זה עובד" },
  { href: "/allincenter-pelecard", label: "חבילת פלאקארד" },
  { href: "/pricing", label: "מחירון" },
  { href: "/lp", label: "השארת פרטים" },
  { href: "/about", label: "מי אנחנו" },
];

const heroStats = [
  { value: "3", label: "מערכות חיות בפרודקשן" },
  { value: "40%−", label: "פחות עבודה ידנית" },
  { value: "24/7", label: "זמינות בענן" },
];

const bentoBlocks = [
  {
    id: "payments",
    size: "lg",
    icon: CreditCard,
    title: "תשלומים ודוחות הכנסה במקום אחד",
    text: "מעקב תשלומים בזמן אמת, סטטוסים, ביט וסליקה, ודוחות הכנסה לפי תקופה, שירות ולקוח — בלי גיליונות.",
    visual: "chart",
  },
  {
    id: "crm",
    size: "md",
    icon: Users,
    title: "CRM שמכיר כל לקוח",
    text: "כרטיס לקוח מלא: היסטוריה, תורים, תשלומים ותקשורת — הכול נגיש בלחיצה.",
  },
  {
    id: "leads",
    size: "tall",
    icon: MapPin,
    title: "איתור לידים ממפות Google",
    text: "סריקה חכמה של עסקים באזור שלך דרך Google Places, ציון התאמה אוטומטי והזרמה ישירה למערכת הלידים.",
    visual: "map",
  },
  {
    id: "automation",
    size: "md",
    icon: Bot,
    title: "אוטומציה שחוסכת שעות",
    text: "תזכורות, אישורי תורים וזרימות עבודה אוטומטיות — הצוות מתפנה לשירות ומכירה.",
  },
  {
    id: "scheduling",
    size: "md",
    icon: CalendarCheck,
    title: "יומן ותורים אונליין",
    text: "לקוחות קובעים תור לבד, המערכת מונעת התנגשויות ושומרת מרווחים.",
  },
  {
    id: "security",
    size: "lg",
    icon: ShieldCheck,
    title: "ענן מאובטח ומהיר",
    text: "פריסה על תשתית ענן מהירה, גיבויים והרשאות — בלי שרתים אצלך במשרד.",
  },
];

const solutions = [
  {
    id: "contact-center",
    icon: Headphones,
    kicker: "מוקדים וצוותים",
    title: "מוקד חכם",
    description:
      "ניהול זמינות נציגים, הפסקות, אילוצים ושיבוצי משמרות — עם תצוגת מצב חיה למנהלי מוקד ואחמ״שים.",
    bullets: ["לוח זמינות והפסקות בזמן אמת", "שיבוץ משמרות לפי אילוצים", "פחות תיאומים בוואטסאפ"],
    actions: [{ label: "לדמו החי", href: contactCenterDemoUrl, primary: true }],
  },
  {
    id: "mayaclinic",
    icon: CalendarCheck,
    kicker: "קליניקות ועסקי שירות",
    title: "מערכת ניהול תורים",
    description:
      "קביעת תורים אונליין, ניהול לקוחות, מעקב תשלומים ודוחות הכנסות — מערכת מלאה לקליניקה.",
    video: "/videos/maya-queue-management.mp4",
    bullets: ["הזמנת תור עצמאית ללקוח", "ממשק ניהול מלא", "דוחות הכנסות וייצוא"],
    actions: [
      { label: "דמו הזמנת תור", href: mayaClinicBookingUrl, primary: true },
      { label: "דמו ניהול", href: mayaClinicAdminUrl },
    ],
  },
  {
    id: "lead-scanner",
    icon: MapPin,
    kicker: "שיווק ומכירות",
    title: "מערכת לידים חכמה",
    description:
      "איתור עסקים רלוונטיים דרך Google Maps, ניקוד הזדמנויות אוטומטי, וניהול כל הלידים עד לסגירת עסקה.",
    bullets: ["סריקת עסקים לפי אזור ותחום", "ציון התאמה חכם לכל ליד", "מעקב סטטוס עד חתימת הסכם"],
    actions: [{ label: "לבקשת הדגמה", href: contactUrl, primary: true }],
  },
];

const processSteps = [
  {
    icon: Search,
    title: "אבחון קצר",
    text: "שיחה של 20 דקות על העסק: איפה הזמן הולך לאיבוד ומה כואב בתפעול.",
  },
  {
    icon: Sparkles,
    title: "דמו מותאם",
    text: "מקבלים סביבת הדגמה חיה עם התהליכים שלכם — רואים את המערכת לפני שמתחייבים.",
  },
  {
    icon: Zap,
    title: "עלייה לאוויר",
    text: "הקמה תוך 7–14 ימי עסקים, הדרכה לצוות וליווי שוטף אחרי ההשקה.",
  },
];

/* ---------- העמוד ---------- */

export default function MarketingHome() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page">
      <div className="bg-aurora" aria-hidden="true" />

      {/* ניווט */}
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <a className="nav__brand" href="#top">
            <img src="/assets/allincenter-logo.png" alt="AllInCenter" />
            <span>
              All<b>In</b>Center
            </span>
          </a>
          <nav className="nav__links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="btn btn--primary btn--sm" href={contactUrl}>
            לבקשת הדגמה
            <ArrowLeft size={16} />
          </a>
        </div>
      </header>

      {/* הירו */}
      <main id="top">
        <section className="hero">
          <div className="hero__copy">
            <Reveal>
              <span className="tag">
                <Sparkles size={14} />
                Connect · Manage · Grow
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1>
                העסק שלך.
                <br />
                <span className="gradient-text">מערכת אחת שמנהלת הכול.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="hero__sub">
                AllInCenter מפתחת מערכות ניהול מותאמות לעסקים בישראל — תשלומים, לקוחות, תורים ולידים
                במקום אחד. בלי גיליונות, בלי כפילויות, בלי לבזבז שעות צוות יקרות.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="hero__actions">
                <a className="btn btn--primary" href={contactUrl}>
                  לבקשת הדגמה חינם
                  <ArrowLeft size={18} />
                </a>
                <a className="btn btn--ghost" href="#solutions">
                  לצפייה במערכות החיות
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="hero__stats">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="hero__visual-wrap">
            <HeroDashboard />
          </Reveal>
        </section>

        {/* בנטו */}
        <section className="section" id="platform">
          <Reveal>
            <div className="section__head">
              <span className="kicker">הפלטפורמה</span>
              <h2>
                כל מה שהעסק צריך, <span className="gradient-text">בממשק אחד</span>
              </h2>
              <p>
                במקום חמישה כלים נפרדים ורשימות מפוזרות — מערכת אחת שמחברת תשלומים, לקוחות,
                יומן ולידים.
              </p>
            </div>
          </Reveal>

          <div className="bento">
            {bentoBlocks.map((block, i) => {
              const Icon = block.icon;
              return (
                <Reveal key={block.id} delay={i * 70} className={`bento__cell bento__cell--${block.size}`}>
                  <article className="bento-card">
                    <span className="bento-card__icon">
                      <Icon size={20} />
                    </span>
                    <h3>{block.title}</h3>
                    <p>{block.text}</p>
                    {block.visual === "chart" && (
                      <div className="bento-chart" aria-hidden="true">
                        {[35, 58, 44, 72, 60, 88, 70, 95].map((h, j) => (
                          <i key={j} style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    )}
                    {block.visual === "map" && <LeadsMapMock />}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* מערכות */}
        <section className="section" id="solutions">
          <Reveal>
            <div className="section__head">
              <span className="kicker">המערכות</span>
              <h2>
                שלוש מערכות. <span className="gradient-text">הדגמות חיות.</span>
              </h2>
              <p>לא מצגות — מערכות אמיתיות שרצות בפרודקשן. פתחו דמו וראו בעצמכם.</p>
            </div>
          </Reveal>

          <div className="solutions">
            {solutions.map((solution, i) => {
              const Icon = solution.icon;
              return (
                <Reveal key={solution.id} delay={i * 100}>
                  <article className="solution-card">
                    <div className="solution-card__top">
                      <span className="solution-card__icon">
                        <Icon size={22} />
                      </span>
                      <span className="solution-card__kicker">{solution.kicker}</span>
                    </div>
                    <h3>{solution.title}</h3>
                    <p>{solution.description}</p>
                    {solution.video ? (
                      <div className="solution-card__video">
                        <video
                          controls
                          playsInline
                          preload="metadata"
                          title={`סרטון ${solution.title}`}
                        >
                          <source src={solution.video} type="video/mp4" />
                        </video>
                      </div>
                    ) : null}
                    <ul>
                      {solution.bullets.map((bullet) => (
                        <li key={bullet}>
                          <CheckCircle2 size={16} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="solution-card__actions">
                      {solution.actions.map((action) =>
                        action.href.startsWith("mailto:") ? (
                          <a
                            key={action.label}
                            className={`btn ${action.primary ? "btn--primary" : "btn--ghost"} btn--sm`}
                            href={action.href}
                          >
                            {action.label}
                            <ArrowLeft size={15} />
                          </a>
                        ) : (
                          <a
                            key={action.label}
                            className={`btn ${action.primary ? "btn--primary" : "btn--ghost"} btn--sm`}
                            href={action.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {action.label}
                            <ExternalLink size={15} />
                          </a>
                        )
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* תהליך */}
        <section className="section" id="process">
          <Reveal>
            <div className="section__head">
              <span className="kicker">איך זה עובד</span>
              <h2>
                מהיכרות לעלייה לאוויר — <span className="gradient-text">בשלושה שלבים</span>
              </h2>
            </div>
          </Reveal>

          <div className="process">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={i * 120}>
                  <article className="process-card">
                    <span className="process-card__num">0{i + 1}</span>
                    <span className="process-card__icon">
                      <Icon size={20} />
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* טופס יצירת קשר */}
        <section className="section" id="contact">
          <Reveal>
            <div className="contact-section">
              <div className="contact-section__copy">
                <span className="kicker">בואו נדבר</span>
                <h2>
                  ספרו לנו מה העסק צריך, <span className="gradient-text">ונחזור עם כיוון</span>
                </h2>
                <p>
                  השאירו פרטים ונחזור לשיחת היכרות קצרה. הפנייה נכנסת ישירות למערכת הלידים
                  שלנו כדי שלא תלך לאיבוד.
                </p>
                <ul>
                  <li>
                    <CheckCircle2 size={18} />
                    שיחת אבחון קצרה וללא התחייבות
                  </li>
                  <li>
                    <CheckCircle2 size={18} />
                    דמו שמותאם לתהליכים של העסק
                  </li>
                  <li>
                    <CheckCircle2 size={18} />
                    הערכת זמן ועלות לפני שמתחילים
                  </li>
                </ul>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="section">
          <Reveal>
            <div className="cta">
              <div className="cta__glow" aria-hidden="true" />
              <span className="kicker kicker--light">מתחילים?</span>
              <h2>רוצים לראות איך זה נראה על העסק שלכם?</h2>
              <p>
                שלחו פרטים ותקבלו הדגמה חיה מותאמת — כולל הערכת חיסכון בזמן ובכסף, בלי
                התחייבות.
              </p>
              <div className="cta__actions">
                <a className="btn btn--light" href={contactUrl}>
                  לבקשת הדגמה חינם
                  <ArrowLeft size={18} />
                </a>
                <a className="btn btn--outline" href="#solutions">
                  עוד הצצה למערכות
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* פוטר */}
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
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <a href={contactUrl}>יצירת קשר</a>
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
