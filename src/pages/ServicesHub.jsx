import React from "react";
import { ArrowLeft, Bot, Check, LayoutDashboard, Search, Workflow } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const services=[
 {icon:LayoutDashboard,title:"פיתוח מערכות ניהול מותאמות לעסק",text:"אפיון ופיתוח של סביבת ניהול שמחברת לקוחות, תורים, הזמנות ותהליכי עבודה.",points:["ממשקי ניהול", "ניהול לקוחות ותהליכים", "פתרונות מותאמים"],href:"/#contact"},
 {icon:Bot,title:"AI ואוטומציה לעסקים",text:"זיהוי הזדמנויות, אפיון והובלת פתרונות AI ואוטומציה בהתאם לצורך העסקי.",points:["אפיון תהליך", "חיבור פעולות חוזרות", "ליווי עד ההטמעה"],href:"/ai"},
 {icon:Search,title:"נראות בגוגל ובמנועי AI",text:"בניית נוכחות דיגיטלית שקל למצוא ולהבין בגוגל, במפות ובמנועי AI.",points:["SEO ותשתית אתר", "Google Business", "תוכן וביקורות"],href:"/google-ai-visibility"},
 {icon:Workflow,title:"אינטגרציות וחיבור מערכות",text:"חיבור מערכות ניהול, תשלומים, APIs ואוטומציות לתהליך עבודה רציף.",points:["חיבורי API", "תשלומים ומערכות ניהול", "זרימות אוטומטיות"],href:"/#contact"},
];
export default function ServicesHub(){return <div className="page hub-page"><SiteHeader/><main><section className="hub-hero"><span className="kicker">שירותים מקצועיים</span><h1>שירותי AllInCenter לעסקים</h1><p>AllInCenter עוזרת לעסקים לבנות, לחבר ולייעל תהליכי עבודה באמצעות מערכות ניהול מותאמות, אוטומציה ו‑AI.</p></section><section className="service-story-list">{services.map((s,i)=><article className={`service-story ${i%2?"service-story--reverse":""}`} key={s.title}><div className="service-story__copy"><small>0{i+1}</small><h2>{s.title}</h2><p>{s.text}</p><div className="service-story__flow" aria-label={`יכולות: ${s.title}`}>{s.points.map((x,j)=><React.Fragment key={x}><span>{x}</span>{j<s.points.length-1&&<ArrowLeft size={14} aria-hidden="true"/>}</React.Fragment>)}</div><a className="home-text-link" href={s.href}>{s.href==="/#contact"?"לבקשת הדגמה":"לעמוד השירות"}<ArrowLeft size={16}/></a></div><div className="service-story__mark" aria-hidden="true"><s.icon size={34}/></div></article>)}</section><section className="hub-cta"><h2>מחפשים דרך לחבר ולייעל את העבודה בעסק?</h2><a className="btn btn--primary" href="/#contact">לבקשת הדגמה <ArrowLeft size={17}/></a></section></main><SiteFooter/></div>}
