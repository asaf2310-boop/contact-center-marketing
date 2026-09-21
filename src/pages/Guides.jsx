import React, { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import GuideShell from "@/components/GuideShell";
import { GUIDE_CATEGORIES, guideReadingMinutes, guides } from "@/data/guides";

function KnowledgeIndex() {
  return (
    <div className="kc-index" role="img" aria-label="רשימת נושאים במרכז הידע: תורים, הזמנות, אוטומציה ו-SEO">
      <div className="kc-index__bar" aria-hidden="true"><span /><span /><span /><small>מרכז הידע</small></div>
      <ol>
        {guides.map((guide) => (
          <li key={guide.slug}>
            <small>{guide.category}</small>
            <strong>{guide.shortTitle}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Guides() {
  const [category, setCategory] = useState("הכל");
  const featured = guides.find((guide) => guide.featured) || guides[0];
  const filtered = useMemo(
    () => (category === "הכל" ? guides : guides.filter((guide) => (guide.categories || [guide.category]).includes(category))),
    [category],
  );

  return (
    <GuideShell>
      <main className="kc-main">
        <section className="kc-hero">
          <div className="kc-hero__copy">
            <span className="kicker">מרכז הידע</span>
            <h1>ידע שעוזר לעסק לעבוד חכם יותר</h1>
            <p>מדריכים מעשיים על מערכות ניהול, אוטומציה, AI, אתרים ותהליכים דיגיטליים — כדי להבין מה מתאים לעסק ואיך ליישם נכון.</p>
          </div>
          <div className="kc-hero__visual">
            <KnowledgeIndex />
          </div>
        </section>

        {category === "הכל" && (
        <section className="kc-featured" aria-labelledby="kc-featured-title">
          <p className="kc-featured__label">מדריך נבחר</p>
          <article>
            <span className="home-eyebrow">{featured.category}</span>
            <h2 id="kc-featured-title">{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <p className="kc-meta">{guideReadingMinutes(featured)} דקות קריאה</p>
            <a className="btn btn--primary" href={`/guides/${featured.slug}`}>לקריאת המדריך <ArrowLeft size={16} /></a>
          </article>
        </section>
        )}

        <section className="kc-list" aria-labelledby="kc-list-title">
          <div className="kc-list__head">
            <h2 id="kc-list-title">כל המדריכים</h2>
            <div className="kc-filters" role="group" aria-label="סינון לפי נושא">
              {GUIDE_CATEGORIES.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={item === category ? "is-active" : undefined}
                  aria-pressed={item === category}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {filtered.length === 0 ? (
            <p className="kc-empty">אין עדיין מדריך בקטגוריה הזו.</p>
          ) : (
            <div className="kc-grid">
              {filtered.map((guide) => (
                <article className="kc-card" key={guide.slug}>
                  <span>{guide.category}</span>
                  <h3>{guide.title}</h3>
                  <p>{guide.excerpt}</p>
                  <small>{guideReadingMinutes(guide)} דקות קריאה</small>
                  <a href={`/guides/${guide.slug}`}>לקריאת המדריך <ArrowLeft size={16} /></a>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </GuideShell>
  );
}
