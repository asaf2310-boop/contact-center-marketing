import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, BarChart3, CheckCircle2, Globe2, MapPin, MessageCircle, Search, ShieldCheck, Sparkles, Star, Zap } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SiteContactLine from "@/components/SiteContactLine";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getWhatsAppHref } from "@/lib/site";

const layers = [
  [Globe2, "אתר שמותאם לחיפוש", "מבנה, תוכן ועמודי שירות שעוזרים לגוגל ולמנועי AI להבין מי העסק, איפה הוא פועל ומה הוא מציע."],
  [MapPin, "Google Business", "אופטימיזציה של פרופיל העסק, שירותים, תמונות, שעות, קישורים ופרטי קשר."],
  [Search, "Local SEO", "חיזוק הנראות בחיפושים מקומיים כמו „שיננית בראשון לציון”, „קוסמטיקאית באזור” ו„קליניקה קרובה אליי”."],
  [Sparkles, "נראות במנועי AI", "בניית תוכן ברור, שאלות ותשובות, ישויות ונתונים שעוזרים למנועי AI להבין ולהציג את העסק."],
  [Star, "ביקורות", "יצירת תהליך מסודר לבקשת ביקורות מלקוחות אמיתיים."],
  [Zap, "המרה", "חיבור הגולש ישירות ל‑WhatsApp, טלפון, טופס או מערכת קביעת תורים."],
];
const workSteps = [
  ["01", "בודקים מה קורה היום", "בוחנים את האתר, Google Business, המתחרים והחיפושים הרלוונטיים."],
  ["02", "בונים את התשתית", "אתר או עמודים מותאמים, SEO טכני, Schema, sitemap, crawlability ותוכן."],
  ["03", "מחזקים את הנוכחות", "Google Business, ביקורות, תוכן ואזכורים רלוונטיים."],
  ["04", "מודדים ומשפרים", "בודקים אילו חיפושים מביאים חשיפה, פניות וקביעות ומשפרים בהתאם."],
];
const audiences = ["שינניות ומרפאות", "קוסמטיקאיות", "מטפלים", "קליניקות", "בעלי מקצוע", "מסעדות ובתי עסק מקומיים", "עסקים שנותנים שירות באזור גיאוגרפי מסוים"];
const technical = ["SEO metadata", "HTML סמנטי ונגיש לסריקה", "sitemap.xml ו‑robots.txt", "כתובות canonical", "Structured Data / Schema", "LocalBusiness כשמתאים", "חוויית מובייל מהירה", "Search Console ו‑Analytics", "נגישות ל‑OAI‑SearchBot", "קישורים פנימיים ומבנה תוכן"];
const metrics = ["הופעות בגוגל", "קליקים ושאילתות חיפוש", "ביצועי Google Business", "כניסות לעמודי שירות", "לחיצות WhatsApp ושיחות", "קביעות תור", "ביקורות חדשות", "תנועה ממנועי AI כשניתן לזהות אותה"];
const faqs = [
  ["האם אפשר להבטיח מקום ראשון בגוגל?", "לא. אף גורם רציני אינו יכול להבטיח מיקום ראשון. אנחנו בונים תשתית ומחזקים את הסיכוי להופיע בחיפושים רלוונטיים לאורך זמן."],
  ["כמה זמן לוקח לראות תוצאות?", "נראות אורגנית ומקומית נבנית בהדרגה ותלויה בתחרות, בנוכחות הקיימת, באתר, בביקורות ובגורמים נוספים."],
  ["האם השירות כולל Google Business?", "כן, כאשר הוא רלוונטי לחבילת השירות ולעסק."],
  ["האם אפשר לקדם עסק גם ב‑ChatGPT?", "אי אפשר להבטיח הכללה בתשובות, אך ניתן לבנות אתר ונוכחות ציבורית שמקלים על מנועי AI לגלות ולהבין את העסק."],
  ["האם חייבים אתר?", "אתר איכותי מומלץ מאוד, וניתן לבנות או לשפר אותו כחלק מהשירות."],
  ["האם אתם מטפלים גם בביקורות?", "ניתן ליצור תהליך לבקשת ביקורות אמיתיות מלקוחות לאחר קבלת השירות."],
  ["האם אפשר לחבר את זה למערכת התורים?", "כן. בשימוש במערכת התורים של AllInCenter ניתן לחבר קריאות לפעולה ותהליכי בקשת ביקורת."],
  ["למי השירות מתאים?", "לעסקים מקומיים ונותני שירות שלקוחות מחפשים לפי שירות ואזור."],
];

export default function GoogleAiVisibility() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const f=()=>setScrolled(window.scrollY>24); f(); window.addEventListener("scroll",f,{passive:true}); return()=>window.removeEventListener("scroll",f); }, []);
  const whatsapp = getWhatsAppHref("היי, אשמח לבדוק את הנראות של העסק שלי בגוגל ובמנועי AI");
  return <div className="page visibility-page" dir="rtl"><div className="bg-aurora" aria-hidden="true" />
    <SiteHeader />
    <main>
      <section className="visibility-hero"><div><span className="tag"><Sparkles size={15}/> Google + AI Visibility</span><h1>נראות בגוגל ובמנועי AI</h1><p className="visibility-hero__lead">אנחנו בונים לעסק שלכם נוכחות דיגיטלית שקל למצוא, להבין ולבחור בה — בגוגל, במפות ובמנועי AI.</p><p>לא מדובר רק באתר או בקידום. אנחנו מחברים בין אתר נכון, Google Business, תוכן, ביקורות, SEO טכני ונראות במנועי AI, כדי להפוך חיפושים לפניות וללקוחות.</p><div className="visibility-actions"><a className="btn btn--primary" href="#contact">בואו נבדוק את הנראות שלי <ArrowLeft size={18}/></a><a className="btn btn--ghost" href={whatsapp} target="_blank" rel="noreferrer">לתיאום שיחה <MessageCircle size={18}/></a></div></div><div className="visibility-search-card" aria-label="מסלול מחיפוש ללקוח"><Search size={28}/><strong>העסק שלכם, ברור ונגיש</strong><span>Google Search</span><span>Google Maps</span><span>AI Search</span></div></section>

      <section className="visibility-section" id="service"><div className="visibility-heading"><span className="kicker">מערכת נוכחות שלמה</span><h2>מה אנחנו בעצם עושים?</h2><p>מחברים כמה שכבות שעובדות יחד — מהאופן שבו מנועי חיפוש מבינים את העסק ועד לפעולה שהלקוח מבצע.</p></div><div className="visibility-grid">{layers.map(([Icon,title,text])=><article className="visibility-card" key={title}><span><Icon size={21}/></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="visibility-section" id="process"><div className="visibility-heading"><span className="kicker">תהליך מסודר</span><h2>איך זה עובד?</h2></div><ol className="visibility-steps">{workSteps.map(([n,t,x])=><li key={n}><span>{n}</span><h3>{t}</h3><p>{x}</p></li>)}</ol></section>

      <section className="visibility-section visibility-flow"><div className="visibility-heading"><span className="kicker">Search → Customer</span><h2>לא רק להביא תנועה — להפוך אותה ללקוחות</h2><p>היתרון של AllInCenter הוא שהנראות לא נעצרת בחיפוש. אפשר לחבר אותה ישירות למערכת התורים, WhatsApp, ניהול לידים ותהליכי follow-up.</p></div><div className="visibility-flow__track">{["חיפוש בגוגל / AI","העסק מופיע","כניסה לאתר","WhatsApp / טלפון / קביעת תור","לקוח מגיע","בקשת ביקורת","חיזוק הנראות"].map((x,i)=><React.Fragment key={x}><span>{x}</span>{i<6&&<ArrowDown aria-hidden="true"/>}</React.Fragment>)}</div></section>

      <section className="visibility-section"><div className="visibility-split"><div><span className="kicker">עסקים מקומיים</span><h2>למי השירות מתאים?</h2><p>השירות מתאים במיוחד לעסקים שבהם לקוחות מחפשים ספק לפי שירות + אזור.</p><ul className="visibility-tags">{audiences.map(x=><li key={x}>{x}</li>)}</ul></div><div><span className="kicker">כוונת חיפוש</span><h2>על אילו חיפושים אנחנו עובדים?</h2><ul className="visibility-examples">{["שיננית בראשון לציון","שיננית מומלצת בראשון לציון","ניקוי אבנית בראשון לציון","קוסמטיקאית בחולון","טיפול פנים באזור שלי","קליניקה מומלצת בפתח תקווה"].map(x=><li key={x}><Search size={16}/>{x}</li>)}</ul><p className="visibility-note">אלה דוגמאות לכוונות חיפוש — לא הבטחה למיקום.</p></div></div></section>

      <section className="visibility-section visibility-ai"><div className="visibility-heading"><span className="kicker">Google + AI</span><h2>למה צריך היום לחשוב גם על Google וגם על AI?</h2><p>אנשים כבר לא מחפשים רק בצורה אחת. חלק נכנסים לגוגל, חלק למפות וחלק שואלים ChatGPT או מנוע AI אחר.</p></div><div className="visibility-split"><div><h3>מידע ברור ועקבי</h3><ul className="visibility-checks">{["מי העסק","איזה שירות הוא נותן","באיזה אזור","איך יוצרים קשר","אילו שאלות הוא יודע לענות עליהן","אילו מקורות חיצוניים מחזקים את האמינות שלו"].map(x=><li key={x}><CheckCircle2 size={17}/>{x}</li>)}</ul></div><div><h3>דוגמאות לשאלות במנועי AI</h3><blockquote>“תמליץ לי על שיננית טובה בראשון לציון”</blockquote><blockquote>“איפה אפשר לעשות ניקוי אבנית באזור?”</blockquote><blockquote>“איזו קליניקה באזור מאפשרת לקבוע תור אונליין?”</blockquote><p className="visibility-note">אין אפשרות להבטיח הופעה קבועה בתשובות AI.</p></div></div></section>

      <section className="visibility-section"><div className="visibility-split"><div><span className="kicker">תשתית נכונה</span><h2>מאחורי הקלעים</h2><ul className="visibility-checks">{technical.map(x=><li key={x}><CheckCircle2 size={17}/>{x}</li>)}</ul></div><div><span className="kicker">מדידה</span><h2>איך יודעים אם זה עובד?</h2><ul className="visibility-checks">{metrics.map(x=><li key={x}><BarChart3 size={17}/>{x}</li>)}</ul><p className="visibility-note">לא כל אזכור במנוע AI ניתן לזיהוי או למדידה.</p></div></div></section>

      <section className="visibility-section visibility-reviews"><div><span className="kicker">מוניטין אמיתי</span><h2>ביקורות כחלק מהתהליך</h2><p>אחרי שהלקוח קיבל שירות, ניתן לחבר תהליך אוטומטי למערכת ניהול התורים של AllInCenter, כאשר הדבר מתאים.</p></div><div className="visibility-review-flow">{["טיפול הסתיים","המתנה מוגדרת","הודעת WhatsApp","קישור לביקורת Google"].map((x,i)=><React.Fragment key={x}><span>{x}</span>{i<3&&<ArrowLeft/>}</React.Fragment>)}</div><p className="visibility-note">הבקשה מיועדת לביקורת אמיתית מהלקוח ואינה מבטיחה או מבקשת דירוג חיובי.</p></section>

      <section className="visibility-section visibility-honesty"><ShieldCheck size={34}/><div><h2>בלי הבטחות למקום ראשון</h2><p>אף גורם רציני לא יכול להבטיח מקום ראשון בגוגל או הופעה קבועה בתשובות של מנועי AI.</p><p>המטרה שלנו היא לבנות ולחזק לאורך זמן את הסיכוי שהעסק יופיע בחיפושים הרלוונטיים — ולמדוד האם החשיפה הופכת לפניות וללקוחות.</p></div></section>

      <section className="visibility-section visibility-faq" id="faq"><div className="visibility-heading"><span className="kicker">שאלות נפוצות</span><h2>מה חשוב לדעת לפני שמתחילים?</h2></div>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>

      <section className="visibility-section" id="contact"><div className="contact-section"><div className="contact-section__copy"><span className="kicker">בדיקת נראות ראשונית</span><h2>רוצים לדעת איך העסק שלכם נראה היום בגוגל ובמנועי AI?</h2><p>נבדוק את הנוכחות הקיימת, המתחרים והזדמנויות השיפור ונבנה תוכנית שמתאימה לעסק.</p><a className="btn btn--ghost" href={whatsapp} target="_blank" rel="noreferrer">דברו איתי ב‑WhatsApp <MessageCircle size={18}/></a></div><ContactForm source="google-ai-visibility" defaultInterest="נראות בגוגל ובמנועי AI" hideInterest submitLabel="בדיקת נראות ראשונית" messageLabel="ספרו לנו על העסק והאזור שבו אתם פועלים" /></div></section>
    </main>
    <SiteFooter />
  </div>;
}
