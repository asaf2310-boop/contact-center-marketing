import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bell,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  SlidersHorizontal,
  UserRound,
  Zap,
} from "lucide-react";
import SiteContactLine from "@/components/SiteContactLine";

const demoRoot = import.meta.env.VITE_MAYACLINIC_DEMO_URL || "https://mayaclinic-demo.vercel.app";
const bookingDemoUrl = `${demoRoot.replace(/\/$/, "")}/book`;
const adminDemoUrl = `${demoRoot.replace(/\/$/, "")}/admin`;

const navLinks = [
  { href: "/about", label: "מי אנחנו" },
  { href: "/#platform", label: "הפלטפורמה" },
  { href: "/#solutions", label: "המערכות" },
  { href: "/#process", label: "איך זה עובד" },
  { href: "/allincenter-pelecard", label: "חבילת פלאקארד" },
  { href: "/pricing", label: "מחירון" },
  { href: "/lp", label: "השארת פרטים" },
];

const capabilities = [
  { icon: CalendarCheck, title: "ניהול וזימון תורים", text: "מרכזים את התורים ביומן אחד ומנהלים את הפעילות השוטפת בצורה מסודרת." },
  { icon: CalendarDays, title: "קביעת תור עצמאית", text: "לקוחות יכולים לבחור שירות וזמן פנוי ולקבוע תור אונליין, בלי תיאום ידני בכל הזמנה." },
  { icon: UserRound, title: "ניהול לקוחות", text: "שומרים את פרטי הלקוח והיסטוריית התורים לצד הפעילות הרלוונטית עבורו." },
  { icon: Bell, title: "תזכורות", text: "משלבים תזכורות ואישורי תורים כחלק מתהליך עבודה שמפחית מעקב ידני." },
  { icon: CreditCard, title: "תשלומים וקישורי תשלום", text: "עוקבים אחר תשלומים ומשלבים קישורי תשלום כחלק מתהליך השירות והניהול." },
  { icon: Zap, title: "אוטומציות", text: "מחברים פעולות חוזרות לזרימת עבודה אוטומטית כדי לחסוך זמן תפעולי." },
  { icon: CalendarDays, title: "ניהול יומן", text: "מנהלים זמינות, שעות פעילות ותמונה ברורה של התורים מתוך ממשק אחד." },
  { icon: SlidersHorizontal, title: "התאמה לעסק", text: "מתאימים את סוגי השירותים ואת תהליך העבודה לצרכים האמיתיים של העסק." },
];

const audiences = [
  ["קוסמטיקאיות ועסקי יופי", "לניהול טיפולים, זמינות, לקוחות ותורים בממשק אחד."],
  ["מטפלים עצמאיים", "לקביעת פגישות אונליין ולניהול מסודר של הלקוחות והיומן."],
  ["קליניקות", "לריכוז התורים, הלקוחות והתשלומים כחלק מהפעילות השוטפת."],
  ["נותני שירות", "לעסקים שמקבלים לקוחות לפי זמן ורוצים להפחית תיאומים ידניים."],
  ["עסקים קטנים שמנהלים תורים", "לניהול פשוט בעברית שניתן להתאים לתהליך הקיים בעסק."],
];

const faqs = [
  ["מהי מערכת ניהול וזימון תורים?", "מערכת שמרכזת קביעת תורים אונליין, ניהול יומן ומידע על לקוחות במקום אחד."],
  ["למי מתאימה מערכת זימון תורים של AllInCenter?", "לקוסמטיקאיות ועסקי יופי, מטפלים עצמאיים, קליניקות, נותני שירות ועסקים קטנים שמנהלים תורים."],
  ["האם הלקוחות יכולים לקבוע תור לבד?", "כן. הלקוחות יכולים לבחור שירות וזמן פנוי ולקבוע תור אונליין."],
  ["האם אפשר לנהל גם לקוחות ולא רק תורים?", "כן. המערכת משלבת ניהול לקוחות עם התורים והפעילות השוטפת של העסק."],
  ["האם המערכת מתאימה לקוסמטיקאיות ומטפלים?", "כן. ניתן להתאים את סוגי השירותים, זמני הפעילות ותהליך קביעת התור לעסקי יופי ולטיפולים."],
  ["האם ניתן להתאים את המערכת לתהליך העבודה של העסק?", "כן. המערכת מותאמת לסוגי השירותים, זמני הפעילות, אופן קביעת התורים והפעולות הנדרשות לאחר ההזמנה."],
  ["האם המערכת מתאימה לעסקים בישראל?", "כן. AllInCenter מפתחת את המערכת עבור עסקים בישראל ובממשק עברי."],
];

export default function AppointmentManagement() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page appointment-page" dir="rtl">
      <div className="bg-aurora" aria-hidden="true" />
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <a className="nav__brand" href="/" aria-label="AllInCenter - דף הבית">
            <img src="/assets/allincenter-logo.png" alt="AllInCenter" />
            <span>All<b>In</b>Center</span>
          </a>
          <nav className="nav__links" aria-label="ניווט ראשי">
            {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
          <a className="btn btn--primary btn--sm" href="/#contact">לבקשת הדגמה <ArrowLeft size={16} /></a>
        </div>
      </header>

      <main>
        <section className="appointment-hero">
          <div className="appointment-hero__copy">
            <span className="tag"><CalendarCheck size={16} /> מערכת תורים מותאמת לעסק</span>
            <h1>מערכת ניהול וזימון תורים לעסקים</h1>
            <p>מערכת אחת שמאפשרת ללקוחות להזמין תור אונליין ולעסק לנהל תורים, לקוחות ותהליכים במקום אחד — בהתאמה לדרך שבה העסק עובד.</p>
            <div className="appointment-actions">
              <a className="btn btn--primary" href="#demo-video">צפו במערכת בפעולה <ArrowLeft size={18} /></a>
              <a className="btn btn--ghost" href="/#contact">לתיאום הדגמה</a>
            </div>
          </div>
          <div className="appointment-hero__points" aria-label="יכולות מרכזיות">
            {["הזמנת תור אונליין", "ניהול לקוחות ויומן", "תשלומים ואוטומציות", "ממשק עברי לעסקים בישראל"].map((item) => (
              <span key={item}><CheckCircle2 size={17} />{item}</span>
            ))}
          </div>
        </section>

        <section className="appointment-section appointment-demo" id="demo-video" aria-labelledby="demo-title">
          <div className="appointment-heading">
            <span className="kicker">המערכת בפעולה</span>
            <h2 id="demo-title">כך נראה ניהול התורים במקום אחד</h2>
          </div>
          <div className="appointment-demo__layout">
            <div className="appointment-video">
              <video controls playsInline preload="metadata" title="הדגמת מערכת ניהול וזימון תורים">
                <source src="/videos/maya-queue-management.mp4" type="video/mp4" />
              </video>
            </div>
            <p>בווידאו ניתן לראות כיצד מנהלים את לוח התורים, הלקוחות והפעילות השוטפת מתוך ממשק אחד, וכיצד העסק יכול לעבוד בצורה מסודרת יותר בלי לנהל את המידע ידנית בין מספר מערכות.</p>
          </div>
        </section>

        <section className="appointment-section" aria-labelledby="capabilities-title">
          <div className="appointment-heading"><span className="kicker">יכולות מרכזיות</span><h2 id="capabilities-title">מה אפשר לנהל במערכת?</h2></div>
          <div className="appointment-capabilities">
            {capabilities.map(({ icon: Icon, title, text }) => (
              <article key={title}><span><Icon size={20} /></span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </section>

        <section className="appointment-section" aria-labelledby="how-title">
          <div className="appointment-heading"><span className="kicker">מהזמנה לניהול</span><h2 id="how-title">איך זה עובד?</h2></div>
          <ol className="appointment-steps">
            <li><span>01</span><h3>הלקוח בוחר שירות וזמן פנוי</h3><p>הלקוח נכנס למסך ההזמנה, בוחר את השירות ואת המועד שמתאים לו.</p></li>
            <li><span>02</span><h3>התור נכנס למערכת הניהול</h3><p>פרטי ההזמנה נשמרים ומופיעים ביומן ובממשק הניהול של העסק.</p></li>
            <li><span>03</span><h3>העסק מנהל את המשך התהליך</h3><p>מנהלים את הלקוח, התור והפעולות הבאות מתוך מקום אחד.</p></li>
          </ol>
        </section>

        <section className="appointment-section" aria-labelledby="audiences-title">
          <div className="appointment-heading"><span className="kicker">עסקים מבוססי תורים</span><h2 id="audiences-title">למי המערכת מתאימה?</h2></div>
          <div className="appointment-audiences">
            {audiences.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="appointment-section appointment-custom" aria-labelledby="custom-title">
          <div><span className="kicker">לא תבנית קבועה</span><h2 id="custom-title">המערכת מתאימה את עצמה לעסק</h2></div>
          <p>במקום להתאים את העסק למערכת קבועה, AllInCenter מאפשרת לבנות את תהליך העבודה סביב הצרכים של העסק — סוגי השירותים, זמני הפעילות, אופן קביעת התורים והפעולות שנדרשות לאחר ההזמנה.</p>
        </section>

        <section className="appointment-section appointment-live" aria-labelledby="live-title">
          <div className="appointment-heading"><span className="kicker">התנסות ישירה</span><h2 id="live-title">צפו בדמו של מערכת התורים</h2><p>אפשר להתנסות בנפרד בחוויית הזמנת התור של הלקוח ובממשק הניהול של העסק.</p></div>
          <div className="appointment-actions">
            <a className="btn btn--primary" href={bookingDemoUrl} target="_blank" rel="noreferrer">לצפייה בדמו הזמנה <ExternalLink size={17} /></a>
            <a className="btn btn--ghost" href={adminDemoUrl} target="_blank" rel="noreferrer">לצפייה בדמו ניהול <ExternalLink size={17} /></a>
          </div>
          <a className="appointment-back" href="/#solutions">לכל המערכות של AllInCenter <ArrowLeft size={16} /></a>
        </section>

        <section className="appointment-section appointment-faq" aria-labelledby="faq-title">
          <div className="appointment-heading"><span className="kicker">שאלות נפוצות</span><h2 id="faq-title">מידע נוסף על מערכת ניהול התורים</h2></div>
          <div className="appointment-faq__list">
            {faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand"><img src="/assets/allincenter-logo.png" alt="AllInCenter" /><div><strong>AllInCenter</strong><small>Connect · Manage · Grow</small></div></div>
          <nav className="footer__links" aria-label="ניווט תחתון"><a href="/">דף הבית</a><a href="/pricing">מחירון</a><a href="/about">מי אנחנו</a><a href="/#contact">יצירת קשר</a><a href="/ai">ייעוץ AI ואוטומציה</a></nav>
          <SiteContactLine />
          <small className="footer__note">© {new Date().getFullYear()} AllInCenter · allincenter.co.il · מערכות ניהול מותאמות לעסקים בישראל</small>
        </div>
      </footer>
    </div>
  );
}
