import React from "react";
import {
  ArrowLeft,
  ArrowUpLeft,
  CalendarDays,
  Clock3,
  LayoutDashboard,
  Search,
  SlidersHorizontal,
  TableProperties,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const capabilities = [
  { icon: CalendarDays, title: "הזמנה אונליין ופרטי ההזמנה", text: "האורחים בוחרים מספר סועדים, תאריך ושעה בתהליך דיגיטלי." },
  { icon: LayoutDashboard, title: "ניהול הזמנות ותמונת מצב", text: "הצוות מרכז את ההזמנות ועובד מתוך מסכי ניהול משותפים." },
  { icon: TableProperties, title: "מפת שולחנות ואזורי ישיבה", text: "רואים ומנהלים את השולחנות ואזורי הישיבה מתוך המערכת." },
  { icon: Clock3, title: "זמינות ותהליך העבודה של הצוות", text: "המועדים המוצגים לאורח מתחברים לתהליך הניהול במסעדה." },
  { icon: SlidersHorizontal, title: "התאמה לאופן שבו המסעדה עובדת", text: "מתאימים את תהליך ההזמנה והניהול לצורת העבודה במסעדה." },
];

const audiences = [
  "מסעדות",
  "ברים עם הזמנת מקומות",
  "בתי קפה שעובדים עם הזמנות",
  "מסעדות עם מספר אזורי ישיבה",
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

const journey = ["חיפוש או אתר", "בחירת תאריך ושעה", "הזמנה", "ניהול במסעדה"];

export default function RestaurantReservations() {
  return (
    <div className="page restaurant-editorial" dir="rtl">
      <SiteHeader />
      <main>
        <section className="restaurant-product-hero" aria-labelledby="restaurant-title">
          <div className="restaurant-product-hero__copy">
            <span className="restaurant-index">01 / RESERVATIONS</span>
            <p className="restaurant-product-hero__eyebrow">מהחיפוש לשולחן מסודר</p>
            <h1 id="restaurant-title">מערכת הזמנות למסעדות</h1>
            <p className="restaurant-product-hero__lead">אורחים עוברים מאתר המסעדה להזמנת שולחן דיגיטלית, והצוות מנהל הזמנות ושולחנות בסביבה אחת שמותאמת לאופן העבודה במסעדה.</p>
            <div className="restaurant-actions">
              <a className="btn btn--primary" href="/#contact">לתיאום הדגמה <ArrowLeft size={18} /></a>
              <a className="btn btn--ghost" href="#restaurant-proof">צפו במערכת בפעולה</a>
            </div>
          </div>

          <figure className="restaurant-product-hero__visual">
            <div className="restaurant-product-hero__bar" aria-hidden="true"><i /><i /><i /><span>AllInCenter / RESTAURANTS</span></div>
            <video controls playsInline preload="metadata" title="הדגמת מערכת הזמנות למסעדות">
              <source src="/videos/restaurant-reservations.mp4#t=10" type="video/mp4" />
            </video>
            <figcaption>תהליך ההזמנה הדיגיטלי בפעולה — בחירת סועדים, מועד ואזור ישיבה.</figcaption>
          </figure>
        </section>

        <section className="restaurant-journey" aria-labelledby="restaurant-journey-title">
          <div className="restaurant-heading">
            <span className="restaurant-index">02 / GUEST JOURNEY</span>
            <h2 id="restaurant-journey-title">מסלול ברור מהחיפוש ועד לניהול במסעדה.</h2>
            <p>האתר או עמוד הנחיתה מובילים לפעולת הזמנה ממשית. פרטי ההזמנה עוברים לסביבת הניהול, שבה הצוות עובד עם ההזמנות והשולחנות.</p>
          </div>
          <div className="restaurant-journey__track" aria-label="תהליך מחיפוש לניהול הזמנה במסעדה">
            {journey.map((item, index) => <React.Fragment key={item}><div><span>0{index + 1}</span><strong>{item}</strong></div>{index < journey.length - 1 && <ArrowUpLeft aria-hidden="true" />}</React.Fragment>)}
          </div>
          <p className="restaurant-journey__summary">חוויית ההזמנה של האורח וממשק הניהול של המסעדה הם שני צדדים של אותו תהליך: הפרטים שנבחרים בהזמנה עוברים לסביבת העבודה של הצוות.</p>
        </section>

        <section className="restaurant-proof" id="restaurant-proof" aria-labelledby="restaurant-proof-title">
          <div className="restaurant-heading">
            <span className="restaurant-index">03 / PRODUCT PROOF</span>
            <h2 id="restaurant-proof-title">שלושה מסכים. תהליך אחד.</h2>
            <p>כל ממשק מציג שלב אחר בתהליך — מההזמנה מצד האורח ועד לניהול השולחנות במסעדה.</p>
          </div>

          <article className="restaurant-proof-row restaurant-proof-row--guest">
            <figure><img src="/assets/restaurant-guest-booking.jpg" alt="מסך בחירת שעה ואזור ישיבה בתהליך הזמנת שולחן מצד האורח" width="1920" height="1080" /><figcaption>בחירת שעה ואזור ישיבה במסך ההזמנה לאורח.</figcaption></figure>
            <div><span>01 / GUEST BOOKING</span><h3>חוויית ההזמנה מצד האורח</h3><p>האורח רואה את פרטי ההזמנה ובוחר שעה ואזור ישיבה מתוך האפשרויות המוצגות.</p></div>
          </article>

          <article className="restaurant-proof-row restaurant-proof-row--dashboard">
            <figure><img src="/assets/home-restaurant-dashboard.jpg" alt="לוח הבקרה של מערכת ההזמנות למסעדות" width="1920" height="1080" loading="lazy" /><figcaption>לוח בקרה מרכזי להזמנות ולפעילות המסעדה.</figcaption></figure>
            <div><span>02 / OPERATIONS</span><h3>לוח הבקרה של המסעדה</h3><p>תמונת מצב מרכזית של ההזמנות והפעילות, מתוך ממשק הניהול בעברית.</p></div>
          </article>

          <article className="restaurant-proof-row restaurant-proof-row--tables">
            <figure><img src="/assets/restaurant-table-map.jpg" alt="מפת השולחנות ואזורי הישיבה בממשק הניהול של המסעדה" width="1920" height="1080" loading="lazy" /><figcaption>מפת השולחנות ואזורי הישיבה בממשק הניהול.</figcaption></figure>
            <div><span>03 / TABLE MAP</span><h3>מפת שולחנות ואזורי ישיבה</h3><p>הצוות רואה את אזורי הישיבה והשולחנות ועובד עם מצב ההושבה מתוך מסך מרכזי. ניהול ההושבה נשאר בשליטת צוות המסעדה.</p></div>
          </article>
        </section>

        <section className="restaurant-operations" aria-labelledby="restaurant-capabilities-title">
          <div className="restaurant-heading restaurant-heading--sticky">
            <span className="restaurant-index">04 / OPERATIONS</span>
            <h2 id="restaurant-capabilities-title">מערכת תפעולית להזמנות ולשולחנות.</h2>
            <p>היכולות מתחברות לסביבת עבודה אחת שניתן להתאים לצורת העבודה של המסעדה.</p>
          </div>
          <div className="restaurant-capability-list">
            {capabilities.map(({ icon: Icon, title, text }, index) => <article key={title}><span>0{index + 1}</span><Icon size={21} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </div>
        </section>

        <section className="restaurant-audience" aria-labelledby="restaurant-audience-title">
          <div className="restaurant-heading">
            <span className="restaurant-index">05 / FIT</span>
            <h2 id="restaurant-audience-title">למקומות שבהם ההזמנה צריכה להתחבר לשירות.</h2>
            <p>למסעדות ומקומות אירוח שרוצים לרכז את ההזמנה והניהול בתהליך ברור לצוות.</p>
          </div>
          <div className="restaurant-audience__list">
            {audiences.map((title, index) => <div key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong></div>)}
          </div>
          <aside className="restaurant-adaptation"><h3>התאמה למסעדה</h3><p>מתאימים את תהליך ההזמנה, הזמינות וניהול השולחנות לאופן שבו הצוות עובד.</p></aside>
        </section>

        <section className="restaurant-search-connection" aria-labelledby="restaurant-search-title">
          <div className="restaurant-search-connection__lead"><span className="restaurant-index">06 / SEARCH TO RESERVATION</span><Search size={34} aria-hidden="true" /><h2 id="restaurant-search-title">חיבור האתר לתהליך ההזמנה</h2></div>
          <div className="restaurant-search-connection__copy">
            <p>אפשר לבנות או לשפר את אתר המסעדה ולחבר מבקרים שמגיעים מגוגל או ממנועי AI ישירות לתהליך הזמנת השולחן.</p>
            <a href="/google-ai-visibility">איך אתר, SEO וחיפוש מתחברים למסלול ההזמנה? <ArrowLeft size={16} /></a>
          </div>
        </section>

        <section className="restaurant-conversion" aria-labelledby="restaurant-conversion-title">
          <span className="restaurant-index">07 / NEXT STEP</span>
          <h2 id="restaurant-conversion-title">רוצים להפוך חיפוש שולחן להזמנה מסודרת?</h2>
          <p>נראה לכם את חוויית האורח ואת סביבת הניהול ונבדוק איך להתאים את התהליך למסעדה.</p>
          <div className="restaurant-actions"><a className="btn btn--primary" href="/#contact">לתיאום הדגמה <ArrowLeft size={18} /></a><a className="btn btn--ghost" href="#restaurant-proof">צפו במערכת בפעולה</a></div>
          <a className="restaurant-conversion__back" href="/systems">לכל המערכות של AllInCenter <ArrowLeft size={16} /></a>
        </section>

        <section className="restaurant-faq" aria-labelledby="restaurant-faq-title">
          <div className="restaurant-heading"><span className="restaurant-index">08 / FAQ</span><h2 id="restaurant-faq-title">מידע נוסף על מערכת ההזמנות למסעדות</h2></div>
          <div className="restaurant-faq__list">{faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}</summary><p>{answer}</p></details>)}</div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
