import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  Map,
  SlidersHorizontal,
  TableProperties,
  UsersRound,
  Utensils,
} from "lucide-react";
import SiteContactLine from "@/components/SiteContactLine";

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
  { icon: CalendarDays, title: "הזמנת שולחן אונליין", text: "האורחים יכולים להתחיל הזמנה דיגיטלית ולמסור את פרטי ההזמנה בלי תיאום ידני." },
  { icon: Clock3, title: "בחירת תאריך ושעה", text: "תהליך ההזמנה מאפשר לבחור תאריך ושעה מתוך המועדים המוצגים לאורח." },
  { icon: UsersRound, title: "מספר סועדים", text: "האורח מציין את מספר הסועדים כחלק מפרטי ההזמנה." },
  { icon: Map, title: "אזורי ישיבה", text: "האורח יכול לבחור בין אזורי הישיבה שמוגדרים עבור המסעדה ובשעות הזמינות." },
  { icon: LayoutDashboard, title: "ניהול הזמנות", text: "הצוות מרכז את ההזמנות במסכי הניהול ועובד מתוך תמונת מצב אחת." },
  { icon: TableProperties, title: "ניהול שולחנות", text: "מפת השולחנות מאפשרת לראות ולנהל את מצב ההושבה במסעדה." },
];

const supportingCapabilities = [
  { icon: Utensils, title: "חוויית אורח דיגיטלית", text: "תהליך ברור מרכז את פרטי ההזמנה עבור האורח לפני העברתם למסעדה." },
  { icon: SlidersHorizontal, title: "שליטה בתהליך ההזמנה", text: "מסכי הניהול מרכזים את העבודה עם הזמנות, אורחים ושולחנות במקום אחד." },
];

const faqs = [
  ["מהי מערכת הזמנות למסעדות?", "מערכת שמאפשרת לאורחים להזמין שולחן אונליין ולמסעדה לנהל את ההזמנות והשולחנות מתוך ממשק אחד."],
  ["האם האורחים יכולים להזמין שולחן אונליין?", "כן. האורחים יכולים לבחור מספר סועדים, תאריך, שעה ואזור ישיבה בתהליך הזמנה דיגיטלי."],
  ["האם ניתן לנהל את ההזמנות מתוך מערכת אחת?", "כן. מסכי הניהול מרכזים את ההזמנות ואת תמונת המצב של המסעדה במקום אחד."],
  ["האם המערכת כוללת ניהול שולחנות?", "כן. המערכת כוללת מפת שולחנות ומסכי ניהול שמאפשרים לצוות לראות ולנהל את מצב ההושבה."],
  ["האם המערכת מתאימה למסעדות בישראל?", "כן. המערכת מיועדת למסעדות בישראל וכוללת ממשק בעברית."],
  ["האם ניתן להתאים את מערכת ההזמנות לצורת העבודה של המסעדה?", "כן. ניתן להתאים את תהליך ההזמנה והניהול לאופן העבודה של המסעדה."],
  ["האם המערכת מחליפה ניהול ידני של הזמנות?", "המערכת מרכזת את תהליך ההזמנה והניהול הדיגיטלי וכך מפחיתה את הצורך לנהל מידע ידנית בין מקומות שונים."],
];

export default function RestaurantReservations() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page appointment-page restaurant-page" dir="rtl">
      <div className="bg-aurora" aria-hidden="true" />
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <a className="nav__brand" href="/" aria-label="AllInCenter - דף הבית"><img src="/assets/allincenter-logo.png" alt="AllInCenter" /><span>All<b>In</b>Center</span></a>
          <nav className="nav__links" aria-label="ניווט ראשי">{navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
          <a className="btn btn--primary btn--sm" href="/#contact">לבקשת הדגמה <ArrowLeft size={16} /></a>
        </div>
      </header>

      <main>
        <section className="appointment-hero restaurant-hero">
          <div className="appointment-hero__copy">
            <span className="tag"><Utensils size={16} /> מערכת הזמנות וניהול שולחנות למסעדות</span>
            <h1>מערכת הזמנות למסעדות</h1>
            <p>מערכת שמאפשרת לאורחים להזמין שולחן אונליין ולמסעדה לנהל הזמנות, שולחנות וחוויית אורח מתוך ממשק אחד.</p>
            <div className="appointment-actions">
              <a className="btn btn--primary" href="#restaurant-video">צפו במערכת בפעולה <ArrowLeft size={18} /></a>
              <a className="btn btn--ghost" href="/#contact">לתיאום הדגמה</a>
            </div>
          </div>
          <div className="appointment-hero__points" aria-label="יכולות מרכזיות">
            {["הזמנת שולחן אונליין", "בחירת תאריך ושעה", "ניהול הזמנות ושולחנות", "ממשק עברי למסעדות בישראל"].map((item) => <span key={item}><CheckCircle2 size={17} />{item}</span>)}
          </div>
        </section>

        <section className="appointment-section appointment-demo" id="restaurant-video" aria-labelledby="restaurant-video-title">
          <div className="appointment-heading"><span className="kicker">המערכת בפעולה</span><h2 id="restaurant-video-title">מהזמנת שולחן ועד למסכי הניהול</h2></div>
          <div className="appointment-demo__layout">
            <div className="appointment-video restaurant-video">
              <video controls playsInline preload="metadata" title="הדגמת מערכת הזמנות למסעדות">
                <source src="/videos/restaurant-reservations.mp4" type="video/mp4" />
              </video>
            </div>
            <p>בסרטון ניתן לראות את חוויית ההזמנה מצד האורח ואת ממשק הניהול של המסעדה — החל מבחירת מועד להזמנה ועד לניהול ההזמנות והשולחנות מתוך מערכת אחת.</p>
          </div>
        </section>

        <section className="appointment-section" aria-labelledby="restaurant-capabilities-title">
          <div className="appointment-heading"><span className="kicker">יכולות מרכזיות</span><h2 id="restaurant-capabilities-title">מה אפשר לנהל במערכת?</h2></div>
          <div className="appointment-capabilities restaurant-capabilities">{capabilities.map(({ icon: Icon, title, text }) => <article key={title}><span><Icon size={22} /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="restaurant-capabilities__summary">
            {supportingCapabilities.map(({ icon: Icon, title, text }) => <div key={title}><Icon size={18} aria-hidden="true" /><p><strong>{title}:</strong> {text}</p></div>)}
          </div>
        </section>

        <section className="appointment-section" aria-labelledby="restaurant-how-title">
          <div className="appointment-heading"><span className="kicker">תהליך ההזמנה</span><h2 id="restaurant-how-title">איך ההזמנה עובדת?</h2></div>
          <ol className="appointment-steps restaurant-steps">
            <li><span>01</span><h3>האורח נכנס לעמוד ההזמנה</h3><p>מתחיל תהליך הזמנה דיגיטלי המותאם למסעדה.</p></li>
            <li><span>02</span><h3>בוחר מועד ופרטי הזמנה</h3><p>בוחר מספר סועדים, תאריך, שעה ואזור ישיבה זמין.</p></li>
            <li><span>03</span><h3>ההזמנה נכנסת למערכת</h3><p>פרטי ההזמנה עוברים לממשק הניהול של המסעדה.</p></li>
            <li><span>04</span><h3>הצוות מנהל את ההזמנה והשולחן</h3><p>הצוות עובד עם ההזמנה ועם תמונת מצב השולחנות במקום אחד.</p></li>
          </ol>
        </section>

        <section className="appointment-section restaurant-value" aria-labelledby="restaurant-value-title">
          <div className="appointment-heading"><span className="kicker">עבודה מסודרת יותר</span><h2 id="restaurant-value-title">למה מסעדה צריכה מערכת הזמנות מסודרת?</h2></div>
          <ul>{["פחות עבודה ידנית", "מידע מרוכז במקום אחד", "שליטה טובה יותר בהזמנות", "תכנון שולחנות", "חוויית הזמנה פשוטה יותר לאורח"].map((item) => <li key={item}><CheckCircle2 size={18} />{item}</li>)}</ul>
        </section>

        <section className="appointment-section restaurant-tables" aria-labelledby="tables-title">
          <div className="restaurant-tables__copy">
            <span className="kicker">מפת רצפה</span><h2 id="tables-title">ניהול שולחנות ותמונת מצב במסעדה</h2>
            <p>ממשק הניהול כולל מפת שולחנות ותמונת מצב של ההזמנות במסעדה. הצוות יכול לראות את השולחנות ואזורי הישיבה, ולעבוד עם נתוני ההזמנות מתוך מסך מרכזי. ניהול ההושבה נשאר בשליטת צוות המסעדה.</p>
          </div>
          <figure className="restaurant-tables__visual">
            <img src="/assets/restaurant-table-map.jpg" alt="מפת השולחנות ואזורי הישיבה בממשק הניהול של המסעדה" width="1920" height="1080" loading="lazy" />
          </figure>
        </section>

        <section className="appointment-section" aria-labelledby="restaurant-audience-title">
          <div className="appointment-heading"><span className="kicker">מיקוד במסעדות</span><h2 id="restaurant-audience-title">למי המערכת מתאימה?</h2></div>
          <div className="appointment-audiences restaurant-audiences">
            <article><h3>מסעדות</h3><p>לניהול הזמנות, אורחים ושולחנות מתוך מערכת אחת.</p></article>
            <article><h3>ברים עם הזמנת מקומות</h3><p>לקבלת הזמנות מראש ולניהול אזורי ישיבה ושעות זמינות.</p></article>
            <article><h3>בתי קפה שעובדים עם הזמנות</h3><p>לתהליך הזמנה דיגיטלי ותמונת מצב מסודרת לצוות.</p></article>
            <article><h3>מסעדות עם מספר אזורי ישיבה</h3><p>להצגת אפשרויות ישיבה ולעבודה עם מפת השולחנות במסכי הניהול.</p></article>
          </div>
        </section>

        <section className="appointment-section appointment-custom" aria-labelledby="restaurant-custom-title">
          <div><span className="kicker">התאמה למסעדה</span><h2 id="restaurant-custom-title">מערכת שמתאימה לאופן שבו המסעדה עובדת</h2></div>
          <p>כל מסעדה מנהלת הזמנות והושבה בצורה מעט שונה. AllInCenter מאפשרת להתאים את תהליך ההזמנה והניהול לאופן העבודה של המסעדה, במקום לנסות להתאים את המסעדה למערכת קבועה.</p>
        </section>

        <section className="appointment-section restaurant-guest" aria-labelledby="restaurant-guest-title">
          <figure className="restaurant-guest__visual">
            <img src="/assets/restaurant-guest-booking.jpg" alt="מסך בחירת שעה ואזור ישיבה בתהליך הזמנת שולחן מצד האורח" width="1920" height="1080" loading="lazy" />
          </figure>
          <div className="restaurant-guest__copy">
            <span className="kicker">חוויית האורח</span>
            <h2 id="restaurant-guest-title">כך נראית ההזמנה מצד האורח</h2>
            <p>האורח בוחר את פרטי ההזמנה מתוך הממשק — מספר סועדים, מועד ואזור ישיבה — וההזמנה מועברת למערכת הניהול של המסעדה.</p>
          </div>
        </section>

        <section className="appointment-section appointment-live restaurant-cta" aria-labelledby="restaurant-cta-title">
          <div className="appointment-heading"><span className="kicker">רוצים לראות יותר?</span><h2 id="restaurant-cta-title">הדגמה מותאמת למערכת ההזמנות</h2><p>אפשר לצפות בווידאו של המערכת או לתאם הדגמה בהתאם לתהליך העבודה של המסעדה.</p></div>
          <div className="appointment-actions"><a className="btn btn--ghost" href="#restaurant-video">צפו במערכת בפעולה</a><a className="btn btn--primary" href="/#contact">לתיאום הדגמה <ArrowLeft size={18} /></a></div>
          <a className="appointment-back" href="/#solutions">לכל המערכות של AllInCenter <ArrowLeft size={16} /></a>
        </section>

        <section className="appointment-section appointment-faq" aria-labelledby="restaurant-faq-title">
          <div className="appointment-heading"><span className="kicker">שאלות נפוצות</span><h2 id="restaurant-faq-title">מידע נוסף על מערכת ההזמנות למסעדות</h2></div>
          <div className="appointment-faq__list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </section>
      </main>

      <footer className="footer"><div className="footer__inner"><div className="footer__brand"><img src="/assets/allincenter-logo.png" alt="AllInCenter" /><div><strong>AllInCenter</strong><small>Connect · Manage · Grow</small></div></div><nav className="footer__links" aria-label="ניווט תחתון"><a href="/">דף הבית</a><a href="/pricing">מחירון</a><a href="/about">מי אנחנו</a><a href="/#contact">יצירת קשר</a><a href="/ai">ייעוץ AI ואוטומציה</a></nav><SiteContactLine /><small className="footer__note">© {new Date().getFullYear()} AllInCenter · allincenter.co.il · מערכות ניהול מותאמות לעסקים בישראל</small></div></footer>
    </div>
  );
}
