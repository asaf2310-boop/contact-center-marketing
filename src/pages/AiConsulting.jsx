import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  Headphones,
  LayoutDashboard,
  MessageCircle,
  Plug,
  Search,
  Target,
  TrendingUp,
  UserRoundCog,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import CaseStudyCard from "@/components/CaseStudyCard";
import Reveal from "@/components/Reveal";
import SiteContactLine from "@/components/SiteContactLine";
import { getWhatsAppHref } from "@/lib/site";
import { aiCaseStudies } from "@/data/aiCaseStudies";

const experienceCards = [
  {
    value: "15+",
    unit: "שנים",
    title: "ניסיון בשירות ותפעול",
    text: "ניסיון מעשי בעולמות השירות, מוקדים, תהליכים עסקיים, לקוחות, מדדי ביצוע ועבודה בסביבה תפעולית מורכבת.",
    valueDir: "ltr",
  },
  {
    value: "12+",
    unit: "שנים",
    title: "ניסיון ניהולי",
    text: "ניהול עובדים ומנהלים, הובלת תהליכים, הטמעת שינויים, עבודה מול ממשקים והנעת פרויקטים.",
    valueDir: "ltr",
  },
  {
    value: "Hands-on",
    unit: "",
    title: "AI & Automation",
    text: "לא רק ייעוץ ומצגות. יכולת לאפיין, לבנות ולהטמיע מערכות, אוטומציות, אינטגרציות ופתרונות המבוססים על AI.",
    valueDir: "ltr",
  },
  {
    value: "Business First",
    unit: "",
    title: "קודם הבעיה, אחר כך הטכנולוגיה",
    text: "לא מחפשים איפה לדחוף AI. מתחילים מהבעיה העסקית ורק לאחר מכן בוחרים את הפתרון והטכנולוגיה המתאימים.",
    valueDir: "ltr",
  },
];

const workModels = [
  {
    num: "01",
    icon: Search,
    title: "AI & Automation Consultant",
    text: "אני נכנס לארגון, לומד את הפעילות והתהליכים ומזהה היכן AI ואוטומציה יכולים לחסוך עבודה ידנית, לשפר ביצועים ולייצר ערך עסקי.",
    items: ["מיפוי תהליכים", "זיהוי הזדמנויות", "בחינת כדאיות", "בניית Roadmap", "בחירת פתרונות וכלים"],
  },
  {
    num: "02",
    icon: ClipboardList,
    title: "AI & Automation Project Manager",
    text: "יש רעיון או צורך שכבר זוהה? אני לוקח אחריות על הובלת הפרויקט מהגדרת הבעיה ועד ההטמעה.",
    items: [
      "אפיון",
      "הגדרת יעדים",
      "תכנון הפתרון",
      "עבודה מול פיתוח וספקים",
      "APIs ואינטגרציות",
      "ניהול הפרויקט",
      "בדיקות",
      "הטמעה",
      "מדידת תוצאות",
    ],
  },
  {
    num: "03",
    icon: UserRoundCog,
    title: "Fractional AI & Operations",
    text: "פתרון לחברות שרוצות יכולות AI ואוטומציה בתוך הארגון בלי לגייס בשלב הזה משרה מלאה. אני משתלב בהיקף גמיש ומוביל באופן שוטף.",
    items: [
      "פרויקטי AI",
      "אוטומציות",
      "שיפור תהליכים",
      "בחינת כלים חדשים",
      "חיבור בין הצד העסקי לטכנולוגי",
      "יוזמות להתייעלות",
    ],
  },
];

const flowSteps = [
  { num: "01", title: "מבינים", text: "לומדים את הפעילות, האנשים, המערכות והבעיה העסקית." },
  { num: "02", title: "מזהים", text: "מאתרים תהליכים שבהם AI, אוטומציה או מערכת חדשה יכולים לייצר ערך." },
  { num: "03", title: "מאפיינים", text: "מגדירים פתרון, יעדים, KPI ואינטגרציות." },
  { num: "04", title: "בונים", text: "מפתחים או מחברים את הכלים והמערכות הנדרשים." },
  { num: "05", title: "מטמיעים", text: "מכניסים את הפתרון לתהליך העבודה האמיתי." },
  { num: "06", title: "מודדים ומשפרים", text: "בודקים את התוצאות וממשיכים לבצע אופטימיזציה." },
];

const expertiseAreas = [
  "ניהול ותפעול",
  "מוקדי שירות",
  "תהליכים עסקיים",
  "AI",
  "אוטומציה",
  "מערכות ואינטגרציות",
];

const fitSituations = [
  "יש אצלכם תהליכים ידניים שחוזרים על עצמם.",
  "צוותי שירות או מכירות מבזבזים זמן על משימות שאפשר לאוטומט.",
  "מידע עובר ידנית בין מספר מערכות.",
  "יש הרבה נתונים אבל קשה להפוך אותם לתובנות ניהוליות.",
  "אתם רוצים להתחיל להשתמש ב-AI אבל לא בטוחים מאיפה להתחיל.",
  "יש לכם רעיון לפרויקט AI או אוטומציה ואין כרגע מי שיוביל אותו מקצה לקצה.",
];

const domains = [
  {
    icon: Headphones,
    title: "שירות לקוחות",
    items: ["סיכום שיחות", "ניתוח פניות", "בקרת איכות", "ניהול ידע", "AI Assistants", "אוטומציה של משימות לאחר שיחה"],
  },
  {
    icon: TrendingUp,
    title: "מכירות ולידים",
    items: ["איסוף והעשרת לידים", "Lead Scoring", "Follow-up", "התאמת פניות", "ניתוח ביצועי מכירה", "אוטומציות CRM"],
  },
  {
    icon: FileText,
    title: "Back Office",
    items: ["עיבוד מסמכים", "חילוץ מידע", "טיפול במיילים", "הזנת נתונים", "בדיקות אוטומטיות", "תהליכי אישור"],
  },
  {
    icon: LayoutDashboard,
    title: "ניהול",
    items: ["Dashboards", "דוחות אוטומטיים", "זיהוי חריגים", "ניתוח נתונים", "תובנות ניהוליות"],
  },
  {
    icon: Plug,
    title: "אינטגרציות ואוטומציה",
    items: ["APIs", "CRM", "WhatsApp", "Email", "מערכות סליקה", "מערכות צד שלישי"],
  },
  {
    icon: Building2,
    title: "מערכות בהתאמה אישית",
    items: ["כלים ומערכות פנים-ארגוניות שמותאמים לתהליך העבודה של החברה במקום לנסות להתאים את העבודה למערכת קיימת."],
    prose: true,
  },
];

export default function AiConsulting() {
  const [scrolled, setScrolled] = useState(false);
  const whatsappHref = getWhatsAppHref(
    "היי אסף, ראיתי את עמוד הייעוץ ואשמח לבדוק תהליך שאפשר לשפר.",
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page ai-page">
      <div className="bg-aurora" aria-hidden="true" />

      <header className={`ai-nav ${scrolled ? "ai-nav--scrolled" : ""}`}>
        <nav className="ai-nav__inner">
          <a className="ai-nav__brand" href="/">
            <img src="/assets/allincenter-logo.png" alt="AllInCenter" width="44" height="44" />
            <span className="ai-nav__names">
              <strong>אסף אריאלי</strong>
              <em>×</em>
              <span>AllInCenter</span>
            </span>
          </a>
          <a className="btn btn--primary btn--sm" href="#opportunity">
            בואו נדבר
            <ArrowLeft size={16} />
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="ai-hero">
          <div className="ai-hero__copy">
            <Reveal>
              <span className="tag" dir="ltr">
                Business First. Technology Second.
              </span>
            </Reveal>
            <Reveal delay={70}>
              <p className="ai-hero__name">אסף אריאלי</p>
              <p className="ai-hero__role" dir="ltr">
                AI & Automation Project Manager
              </p>
            </Reveal>
            <Reveal delay={140}>
              <h1>
                מחברים בין ניסיון עסקי, תפעול ו-AI כדי להפוך תהליכים{" "}
                <span className="gradient-text">למדויקים, יעילים וחכמים יותר.</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="ai-hero__sub">
                אני עוזר לחברות לזהות איפה AI ואוטומציה יכולים לייצר ערך אמיתי — ומוביל את הדרך מהבעיה
                העסקית, דרך האפיון והפיתוח ועד לפתרון שעובד בפועל.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="ai-hero__actions">
                <a className="btn btn--primary" href="#opportunity">
                  בואו נדבר
                  <ArrowLeft size={18} />
                </a>
                <a className="btn btn--ghost" href="#work-together">
                  איך אני יכול לעזור?
                </a>
              </div>
              <p className="ai-hero__pills">ייעוץ • ניהול פרויקטים • Fractional AI • Automation</p>
            </Reveal>
          </div>

          <Reveal className="ai-hero__visual">
            <div className="ai-portrait">
              <img
                src="/assets/asaf-ariely.png"
                alt="אסף אריאלי, AI & Automation Project Manager"
                width="720"
                height="900"
              />
            </div>
          </Reveal>
        </section>

        <div className="ai-after-hero">
          <Reveal>
            <p className="ai-hook">
              לא צריך להגיע עם רעיון ל-AI. מספיק להגיע עם תהליך שאתם יודעים שאפשר לעשות טוב יותר.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <ul className="ai-expertise" aria-label="תחומי ניסיון">
              {expertiseAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <section className="section ai-section" id="experience">
          <Reveal>
            <div className="section__head">
              <span className="kicker">מה אני מביא</span>
              <h2>לא רק AI. ניסיון עסקי שמאפשר להבין איפה באמת צריך אותו.</h2>
              <p>
                הטכנולוגיה היא רק חלק מהפתרון. כדי לייצר שינוי אמיתי צריך להבין את האנשים, התהליכים,
                הלקוחות והיעדים העסקיים שמאחוריהם.
              </p>
            </div>
          </Reveal>
          <div className="ai-stats">
            {experienceCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 70}>
                <article className="ai-stat">
                  <div className="ai-stat__value">
                    <strong dir={card.valueDir}>{card.value}</strong>
                    {card.unit ? <span>{card.unit}</span> : null}
                  </div>
                  <h3 dir={/^[A-Za-z]/.test(card.title) ? "ltr" : undefined}>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section ai-section" id="problem">
          <Reveal>
            <div className="ai-problem">
              <span className="kicker">האתגר</span>
              <h2>רוצים להכניס AI לארגון — אבל לא בטוחים מאיפה להתחיל?</h2>
              <p>
                חברות רבות כבר מבינות שהן צריכות להשתמש ב-AI ובאוטומציה, אבל האתגר האמיתי הוא לא לבחור
                עוד כלי.
              </p>
              <p>
                צריך לזהות את התהליכים הנכונים, להבין איפה נמצא הערך העסקי, להגדיר פתרון שאפשר באמת
                ליישם — ולדאוג שהוא יגיע לשימוש בפועל.
              </p>
              <p className="ai-problem__highlight">כאן אני נכנס לתמונה.</p>
            </div>
          </Reveal>
        </section>

        <section className="section ai-section" id="work-together">
          <Reveal>
            <div className="section__head">
              <span className="kicker">שיתוף פעולה</span>
              <h2>איך אפשר לעבוד יחד?</h2>
            </div>
          </Reveal>
          <div className="ai-models">
            {workModels.map((model, index) => {
              const Icon = model.icon;
              return (
                <Reveal key={model.num} delay={index * 80}>
                  <article className="ai-model">
                    <div className="ai-model__top">
                      <span className="ai-model__num">{model.num}</span>
                      <span className="ai-model__icon">
                        <Icon size={20} />
                      </span>
                    </div>
                    <h3 dir={/^[A-Za-z]/.test(model.title) ? "ltr" : undefined}>{model.title}</h3>
                    <p>{model.text}</p>
                    <ul>
                      {model.items.map((item) => (
                        <li key={item}>
                          <CheckCircle2 size={15} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <Reveal>
            <div className="ai-inline-cta">
              <a className="btn btn--primary" href="#opportunity">
                בואו נבדוק איזה מודל מתאים לכם
                <ArrowLeft size={18} />
              </a>
            </div>
          </Reveal>
        </section>

        <section className="section ai-section" id="fit">
          <Reveal>
            <div className="section__head">
              <span className="kicker">התאמה</span>
              <h2>יכול להיות שכדאי לנו לדבר אם...</h2>
            </div>
          </Reveal>
          <div className="ai-fit">
            {fitSituations.map((item, index) => (
              <Reveal key={item} delay={index * 40}>
                <p className="ai-fit__item">
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section ai-section" id="flow">
          <Reveal>
            <div className="section__head">
              <span className="kicker">התהליך</span>
              <h2>מהבעיה העסקית לפתרון שעובד</h2>
            </div>
          </Reveal>
          <ol className="ai-flow">
            {flowSteps.map((step, index) => (
              <Reveal key={step.num} delay={index * 50} className="ai-flow__item-wrap">
                <li className="ai-flow__item">
                  <span>{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="section ai-section" id="domains">
          <Reveal>
            <div className="section__head">
              <span className="kicker">איפה מתחילים</span>
              <h2>איפה אפשר להתחיל?</h2>
              <p>לא צריך להגיע עם רעיון לפרויקט AI. מספיק להגיע עם תהליך שאתם יודעים שאפשר לעשות טוב יותר.</p>
            </div>
          </Reveal>
          <div className="ai-domains">
            {domains.map((domain, index) => {
              const Icon = domain.icon;
              return (
                <Reveal key={domain.title} delay={index * 60}>
                  <article className="ai-domain">
                    <span className="ai-domain__icon">
                      <Icon size={20} />
                    </span>
                    <h3>{domain.title}</h3>
                    {domain.prose ? (
                      <p>{domain.items[0]}</p>
                    ) : (
                      <ul>
                        {domain.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section ai-section" id="work">
          <Reveal>
            <div className="section__head">
              <span className="kicker">פרויקטים</span>
              <h2>מהרעיון למערכת עובדת</h2>
              <p>דוגמאות לפרויקטים שבהם בעיה עסקית הפכה לפתרון טכנולוגי מעשי.</p>
            </div>
          </Reveal>
          {aiCaseStudies.length > 0 ? (
            <div className="ai-cases">
              {aiCaseStudies.map((item) => (
                <Reveal key={item.title || item.problem}>
                  <CaseStudyCard {...item} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="ai-cases-empty">
                <Briefcase size={22} />
                <p>תיקי פרויקטים יתווספו כאן כשיהיו מוכנים להצגה — בלי מספרים מומצאים, רק עבודה אמיתית.</p>
              </div>
            </Reveal>
          )}
        </section>

        <section className="section ai-section" id="about">
          <Reveal>
            <div className="ai-about">
              <div className="ai-about__photo">
                <img src="/assets/asaf-ariely.png" alt="" width="480" height="600" />
              </div>
              <div className="ai-about__copy">
                <span className="kicker">קצת עליי</span>
                <p className="ai-hero__name">אסף אריאלי</p>
                <p className="ai-hero__role" dir="ltr">
                  AI & Automation Project Manager
                </p>
                <p>
                  מגיע מעולמות השירות, התפעול והניהול: הובלת אנשים, תהליכים עסקיים ומדדי ביצוע — ורק
                  אחר כך הטכנולוגיה שמשרתת אותם.
                </p>
                <p>
                  היום אני עובד בנקודת החיבור בין העסק לטכנולוגיה. מבין את הצורך העסקי מצד אחד, ויודע
                  לקחת אותו לפתרון טכנולוגי מעשי מצד שני: אפיון, הובלת פרויקט, AI, אוטומציה והטמעה בפועל.
                </p>
                <p className="ai-about__line">אני נמצא בנקודת החיבור בין העסק לטכנולוגיה.</p>
                <p className="ai-about__stack" dir="ltr">
                  Business + Operations + AI + Execution
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="section ai-section" id="opportunity">
          <Reveal>
            <div className="ai-scan">
              <div className="ai-scan__copy">
                <span className="kicker">
                  <Target size={14} />
                  בדיקת התאמה ראשונית
                </span>
                <h2>בואו נמצא את ההזדמנות הראשונה שלכם ל-AI</h2>
                <p>
                  לא צריך לדעת איזה כלי או טכנולוגיה אתם צריכים. ספרו לי על תהליך שמבזבז זמן, דורש הרבה
                  עבודה ידנית או פשוט לא עובד מספיק טוב — ונבדוק מה אפשר לעשות אחרת.
                </p>
                <ul>
                  <li>
                    <BarChart3 size={18} />
                    מתחילים מהתהליך, לא מהכלי
                  </li>
                  <li>
                    <CheckCircle2 size={18} />
                    שיחה קצרה, בלי מצגת ובלי התחייבות
                  </li>
                  <li>
                    <Target size={18} />
                    מטרה: הזדמנות אחת ברורה שאפשר לקדם
                  </li>
                </ul>
                <div className="ai-scan__direct">
                  <a
                    className="btn btn--ghost"
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle size={18} />
                    שלחו לי הודעה
                  </a>
                  <p className="ai-scan__direct-note">
                    מעדיפים שיחת היכרות? השאירו פרטים בטופס ואחזור לתיאום.
                  </p>
                </div>
              </div>
              <ContactForm
                source="ai-consulting"
                defaultInterest="ייעוץ AI ואוטומציה"
                showRole
                hideInterest
                emailRequired
                businessNameLabel="חברה"
                messageLabel="איזה תהליך הייתם רוצים לשפר?"
                messagePlaceholder="תהליך שמבזבז זמן, דורש עבודה ידנית, או פשוט לא עובד מספיק טוב"
                submitLabel="בואו נבדוק את זה"
                successTitle="הפנייה התקבלה"
                successBody="אחזור אליכם לתיאום שיחה קצרה — נתחיל מהתהליך שתרצו לשפר."
                note="בדיקת התאמה ראשונית · בלי התחייבות"
              />
            </div>
          </Reveal>
        </section>

        <section className="section ai-section">
          <Reveal>
            <div className="cta">
              <div className="cta__glow" aria-hidden="true" />
              <span className="kicker kicker--light">השלב הבא</span>
              <h2>יש לכם תהליך שאתם יודעים שאפשר לעשות טוב יותר?</h2>
              <p>בואו נדבר עליו. לפעמים פרויקט AI טוב מתחיל בכלל מבעיה תפעולית קטנה.</p>
              <div className="cta__actions">
                <a className="btn btn--light" href="#opportunity">
                  דברו איתי
                  <ArrowLeft size={18} />
                </a>
                <a className="btn btn--outline" href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle size={18} />
                  שלחו לי הודעה
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
              <strong>אסף אריאלי × AllInCenter</strong>
              <small>AI & Automation Project Manager</small>
            </div>
          </div>
          <nav className="footer__links">
            <a href="/">לאתר AllInCenter</a>
            <a href="#opportunity">יצירת קשר</a>
          </nav>
          <SiteContactLine />
          <small className="footer__note">
            © {new Date().getFullYear()} AllInCenter · ייעוץ, ניהול והובלת פרויקטי AI ואוטומציה
          </small>
        </div>
      </footer>
    </div>
  );
}
