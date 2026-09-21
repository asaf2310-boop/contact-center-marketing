import React from "react";

const media = {
  "how-to-choose-appointment-system": ["home-appointment-ui.jpg", "ממשק מערכת ניהול התורים של AllInCenter"],
  "restaurant-reservation-system": ["home-restaurant-dashboard.jpg", "לוח הבקרה של מערכת ההזמנות למסעדות"],
  "ai-automation-small-business": ["guide-ai-editorial.webp", "המחשה רעיונית של פנייה, מיון והעברה לטיפול"],
  "seo-ai-visibility-business": ["guide-seo-editorial.webp", "המחשה רעיונית של שכבות מידע באתר וגילוי בחיפוש"],
};
function Screenshot({ file, caption, hero = false, conceptual = false }) {
  return <figure className={`ge-media ${conceptual ? "ge-media-concept" : "ge-media-product"}`}>
    <div className="ge-media-label" aria-hidden="true">AllInCenter <span>{conceptual ? "EDITORIAL / מדריך מעשי" : "מבט מתוך המערכת"}</span></div>
    <a href={`/assets/${file}`} target="_blank" rel="noreferrer" aria-label={`${caption} — פתיחת התמונה המלאה`}><img src={`/assets/${file}`} alt={caption} width={conceptual ? 1200 : file === "home-appointment-ui.jpg" ? 1440 : 1920} height={conceptual ? 800 : 1080} loading={hero ? "eager" : "lazy"} decoding="async" /></a>
    <figcaption>{caption}</figcaption>
  </figure>;
}
export default function GuideVisual({ slug }) {
  const [file, caption] = media[slug];
  return <Screenshot file={file} caption={caption} hero conceptual={slug.startsWith("ai-") || slug.startsWith("seo-")} />;
}
function Flow({ steps, label, layers = false }) {
  return <div className={`ge-flow ${layers ? "ge-layers" : ""}`} aria-label={label}>
    <span className="ge-panel-label">{label}</span>
    <ol>{steps.map((step, index) => <li key={step}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}</ol>
  </div>;
}
export function GuideInsert({ slug, index }) {
  if (slug === "restaurant-reservation-system") {
    if (index === 1) return <Screenshot file="restaurant-guest-booking.jpg" caption="הצד של האורח: מסך הזמנת שולחן" />;
    if (index === 4) return <Screenshot file="restaurant-table-map.jpg" caption="הצד של הצוות: מפת שולחנות ואזורי ישיבה" />;
  }
  if (slug === "ai-automation-small-business" && index === 0) return <Flow label="מהפנייה לפעולה" steps={["פנייה נכנסת", "כלל / AI", "פעולה", "מערכת / אדם"]} />;
  if (slug === "seo-ai-visibility-business") {
    if (index === 0) return <Flow layers label="ארבע השכבות של המדריך" steps={["יסודות טכניים", "איכות תוכן", "בהירות העסק / הישות", "נראות ב-AI"]} />;
    if (index === 8) return <Flow label="סדר העבודה" steps={["סריקה", "מבנה עמודים", "תוכן", "קישורים", "Schema", "מסלול פנייה"]} />;
  }
  return null;
}
