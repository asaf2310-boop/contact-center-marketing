import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, BarChart3, CheckCircle2, Globe2, MessageCircle, Search, ShieldCheck, Sparkles, Zap } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SiteContactLine from "@/components/SiteContactLine";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getWhatsAppHref } from "@/lib/site";

const layers = [
  [Globe2, "בניית ושיפור אתר", "בונים או משפרים את אתר העסק כדי שיהיה ברור מי אתם, מה אתם מציעים ואיך פונים אליכם."],
  [Search, "SEO טכני ומבנה תוכן", "מתאימים את מבנה האתר, העמודים והתוכן לחיפושים רלוונטיים בגוגל — בלי הבטחה למיקום."],
  [Sparkles, "מידע ברור למנועי AI", "ישות, שירות, אזור ומידע מובנה עוזרים גם למנועי AI להבין את העסק. אין הבטחה להופעה בתשובות."],
  [Zap, "חיבור לפנייה או הזמנה", "אפשר לחבר את האתר לטופס, לבוט WhatsApp, למערכת תורים או למערכת הזמנות — בהתאם לתהליך העסק."],
];
const workSteps = [
  ["01", "בודקים מה קורה היום", "בוחנים את האתר הקיים, מבנה העמודים והדרך שבה לקוחות יכולים לפנות או להזמין."],
  ["02", "בונים או משפרים את האתר", "עמודים ברורים, SEO טכני, תוכן לפי כוונת חיפוש ומבנה שקל לסרוק."],
  ["03", "מחברים למסלול פנייה", "מחברים את האתר לטופס, WhatsApp, מערכת תורים או מערכת הזמנות — לפי מה שמתאים לעסק."],
  ["04", "מגדירים מדידה והמשך", "ממליצים איך לעקוב אחרי כניסות, פניות והזמנות ולשפר בהדרגה."],
];
const deliverables = [
  "בדיקת האתר והנוכחות הקיימת.",
  "בנייה או שיפור של עמודי האתר.",
  "SEO טכני ומבנה תוכן.",
  "עמודי שירות המותאמים לכוונת החיפוש.",
  "חיבור לטופס, WhatsApp, מערכת תורים או מערכת הזמנות.",
  "הגדרת מסלול ברור מחיפוש לפנייה.",
  "המלצות להמשך שיפור ומדידה.",
];
const audiences = ["שינניות ומרפאות", "קוסמטיקאיות", "מטפלים", "קליניקות", "בעלי מקצוע", "מסעדות ובתי עסק מקומיים", "עסקים שנותנים שירות באזור גיאוגרפי מסוים"];
const technical = ["SEO metadata", "HTML סמנטי ונגיש לסריקה", "sitemap.xml ו‑robots.txt", "כתובות canonical", "Structured Data / Schema", "חוויית מובייל מהירה", "Search Console ו‑Analytics", "נגישות ל‑OAI‑SearchBot", "קישורים פנימיים ומבנה תוכן"];
const metrics = ["הופעות בגוגל", "קליקים ושאילתות חיפוש", "כניסות לעמודי שירות", "שליחות טופס", "לחיצות WhatsApp ושיחות", "קביעות תור או הזמנות", "תנועה ממנועי AI כשניתן לזהות אותה"];
const faqs = [
  ["האם אפשר להבטיח מקום ראשון בגוגל?", "לא. אף גורם רציני אינו יכול להבטיח מיקום ראשון, לידים או הכללה בתשובות של מנועי AI. אנחנו בונים אתר ותשתית SEO ומחזקים את הסיכוי להופיע בחיפושים רלוונטיים לאורך זמן."],
  ["כמה זמן לוקח לראות תוצאות?", "נראות אורגנית נבנית בהדרגה ותלויה בתחרות, באתר הקיים, בתוכן ובגורמים נוספים. אין לוח זמנים מובטח."],
  ["האם אתם מנהלים Google Business או ביקורות?", "לא. השירות מתמקד באתר, ב‑SEO ובחיבור למסלול פנייה או הזמנה. ניהול פרופיל Google Business או ביקורות אינו חלק מהשירות."],
  ["האם אפשר לקדם עסק גם ב‑ChatGPT?", "אי אפשר להבטיח הכללה בתשובות. אפשר לבנות אתר ומידע ציבורי ברורים שמקלים על מנועי AI לגלות ולהבין את העסק."],
  ["האם חייבים אתר?", "כן, זה הבסיס. אפשר לבנות אתר חדש או לשפר אתר קיים כחלק מהשירות."],
  ["האם אפשר לחבר את האתר למערכת תורים או ל‑WhatsApp?", "כן. ניתן לחבר את האתר לטופס, לבוט WhatsApp, למערכת תורים או למערכת הזמנות — בהתאם לתהליך העסק."],
  ["למי השירות מתאים?", "לעסקים מקומיים ונותני שירות שלקוחות מחפשים לפי שירות ואזור, ורוצים מסלול ברור מחיפוש לפנייה או הזמנה."],
];

export default function GoogleAiVisibility() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const f=()=>setScrolled(window.scrollY>24); f(); window.addEventListener("scroll",f,{passive:true}); return()=>window.removeEventListener("scroll",f); }, []);
  const whatsapp = getWhatsAppHref("היי, אשמח לבדוק את האתר ואת מסלול הלידים מהחיפוש");
  return <div className="page visibility-page" dir="rtl"><div className="bg-aurora" aria-hidden="true" />
    <SiteHeader />
    <main>
      <section className="visibility-hero"><div><span className="tag"><Sparkles size={15}/> אתר · SEO · חיבור לפנייה</span><h1>בניית אתר, SEO וחיבור למערכת תורים או הזמנות</h1><p className="visibility-hero__lead">כדי להפוך חיפושים בגוגל ובמנועי AI לפניות וללקוחות.</p><p>AllInCenter בונה או משפרת את אתר העסק, מתאימה את המבנה והתוכן לחיפושים רלוונטיים, ומחברת את האתר לטופס, ל‑WhatsApp, למערכת תורים או למערכת הזמנות. המטרה היא מסלול מדיד מחיפוש לפנייה — בלי הבטחה לדירוג, ללידים או להופעה בתשובות AI.</p><div className="visibility-actions"><a className="btn btn--primary" href="#contact">בדיקת האתר ומסלול הלידים <ArrowLeft size={18}/></a><a className="btn btn--ghost" href={whatsapp} target="_blank" rel="noreferrer">לתיאום שיחה <MessageCircle size={18}/></a></div></div><div className="visibility-search-card" aria-label="מסלול מחיפוש ללקוח"><Search size={28}/><strong>מחיפוש לפנייה</strong><span>Google Search</span><span>מנועי AI</span><span>אתר → פנייה או הזמנה</span></div></section>

      <section className="visibility-section" id="service"><div className="visibility-heading"><span className="kicker">מה אנחנו עושים בפועל</span><h2>אתר, חיפוש וחיבור למערכת של העסק</h2><p>לא מנהלים פרופיל Google Business ולא מנהלים ביקורות. מתמקדים באתר, ב‑SEO ובמסלול שמחבר חיפוש לפנייה.</p></div><div className="visibility-grid">{layers.map(([Icon,title,text])=><article className="visibility-card" key={title}><span><Icon size={21}/></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="visibility-section" id="deliverables"><div className="visibility-heading"><span className="kicker">תוצרים</span><h2>מה מקבלים</h2></div><ul className="visibility-checks">{deliverables.map((item)=><li key={item}><CheckCircle2 size={17}/>{item}</li>)}</ul></section>

      <section className="visibility-section" id="process"><div className="visibility-heading"><span className="kicker">תהליך מסודר</span><h2>איך זה עובד?</h2></div><ol className="visibility-steps">{workSteps.map(([n,t,x])=><li key={n}><span>{n}</span><h3>{t}</h3><p>{x}</p></li>)}</ol></section>

      <section className="visibility-section visibility-flow"><div className="visibility-heading"><span className="kicker">Search → Inquiry</span><h2>לא רק להביא תנועה — להפוך אותה לפנייה</h2><p>היתרון הוא שהנראות לא נעצרת בחיפוש. אפשר לחבר את האתר ישירות לטופס, לבוט WhatsApp, למערכת תורים או למערכת הזמנות — בהתאם לתהליך העסק.</p></div><div className="visibility-flow__track">{["חיפוש בגוגל / AI","הגעה לאתר ברור","בחירת שירות","טופס / WhatsApp / קביעת תור","פנייה או הזמנה"].map((x,i)=><React.Fragment key={x}><span>{x}</span>{i<4&&<ArrowDown aria-hidden="true"/>}</React.Fragment>)}</div></section>

      <section className="visibility-section"><div className="visibility-split"><div><span className="kicker">עסקים מקומיים</span><h2>למי השירות מתאים?</h2><p>השירות מתאים במיוחד לעסקים שבהם לקוחות מחפשים ספק לפי שירות + אזור, ורוצים שהחיפוש יוביל לפנייה או להזמנה.</p><ul className="visibility-tags">{audiences.map(x=><li key={x}>{x}</li>)}</ul></div><div><span className="kicker">כוונת חיפוש</span><h2>על אילו חיפושים אנחנו עובדים?</h2><ul className="visibility-examples">{["שיננית בראשון לציון","שיננית מומלצת בראשון לציון","ניקוי אבנית בראשון לציון","קוסמטיקאית בחולון","טיפול פנים באזור שלי","קליניקה מומלצת בפתח תקווה"].map(x=><li key={x}><Search size={16}/>{x}</li>)}</ul><p className="visibility-note">אלה דוגמאות לכוונות חיפוש — לא הבטחה למיקום, ללידים או להופעה במנועי AI.</p></div></div></section>

      <section className="visibility-section visibility-ai"><div className="visibility-heading"><span className="kicker">Google + AI</span><h2>למה צריך היום לחשוב גם על Google וגם על AI?</h2><p>אנשים כבר לא מחפשים רק בצורה אחת. חלק נכנסים לגוגל וחלק שואלים מנוע AI. אתר ברור עם מידע על הישות, השירות והאזור עוזר לשני המסלולים — בלי הבטחה לציטוט.</p></div><div className="visibility-split"><div><h3>מידע ברור ועקבי</h3><ul className="visibility-checks">{["מי העסק","איזה שירות הוא נותן","באיזה אזור","איך יוצרים קשר","איך קובעים תור או מזמינים"].map(x=><li key={x}><CheckCircle2 size={17}/>{x}</li>)}</ul></div><div><h3>דוגמאות לשאלות במנועי AI</h3><blockquote>“תמליץ לי על שיננית טובה בראשון לציון”</blockquote><blockquote>“איפה אפשר לעשות ניקוי אבנית באזור?”</blockquote><blockquote>“איזו קליניקה באזור מאפשרת לקבוע תור אונליין?”</blockquote><p className="visibility-note">אין אפשרות להבטיח הופעה קבועה בתשובות AI.</p></div></div></section>

      <section className="visibility-section"><div className="visibility-split"><div><span className="kicker">תשתית נכונה</span><h2>מאחורי הקלעים</h2><ul className="visibility-checks">{technical.map(x=><li key={x}><CheckCircle2 size={17}/>{x}</li>)}</ul></div><div><span className="kicker">מדידה</span><h2>איך יודעים אם זה עובד?</h2><ul className="visibility-checks">{metrics.map(x=><li key={x}><BarChart3 size={17}/>{x}</li>)}</ul><p className="visibility-note">לא כל אזכור במנוע AI ניתן לזיהוי או למדידה, ואין הבטחה לתוצאה מסוימת.</p></div></div></section>

      <section className="visibility-section visibility-honesty"><ShieldCheck size={34}/><div><h2>בלי הבטחות למקום ראשון</h2><p>אף גורם רציני לא יכול להבטיח מקום ראשון בגוגל, כמות לידים או הופעה קבועה בתשובות של מנועי AI.</p><p>המטרה היא לבנות אתר, SEO ומסלול פנייה ברור — ולמדוד האם החשיפה הופכת לפניות ולהזמנות.</p></div></section>

      <section className="visibility-section visibility-faq" id="faq"><div className="visibility-heading"><span className="kicker">שאלות נפוצות</span><h2>מה חשוב לדעת לפני שמתחילים?</h2></div>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>

      <section className="visibility-section" id="contact"><div className="contact-section"><div className="contact-section__copy"><span className="kicker">בדיקת אתר ומסלול לידים</span><h2>רוצים לבדוק את האתר ואת הדרך מחיפוש לפנייה?</h2><p>נבדוק את האתר הקיים, את מבנה העמודים ואת מסלול הפנייה — ונציע כיוון שמתאים לעסק.</p><a className="btn btn--ghost" href={whatsapp} target="_blank" rel="noreferrer">דברו איתי ב‑WhatsApp <MessageCircle size={18}/></a></div><ContactForm source="google-ai-visibility" defaultInterest="בניית אתר, SEO ומסלול לידים" hideInterest submitLabel="בדיקת האתר ומסלול הלידים" messageLabel="ספרו לנו על העסק, האתר הקיים והאזור שבו אתם פועלים" /></div></section>
    </main>
    <SiteFooter />
  </div>;
}
