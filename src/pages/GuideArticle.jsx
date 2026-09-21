import React, { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import GuideShell from "@/components/GuideShell";
import {
  getGuideBySlug,
  guideReadingMinutes,
  normalizeSection,
} from "@/data/guides";
import GuideVisual, { GuideInsert } from "@/components/GuideVisual";
import "@/guide-editorial.css";
import NotFoundPage from "@/pages/NotFound";

function RichText({ text }) {
  const parts = String(text).split(/\[\[(.+?)\]\]/g);
  return parts.map((part, index) => {
    if (index % 2 === 0) return part;
    const [href, label] = part.split("|");
    return <a key={`${href}-${index}`} href={href}>{label}</a>;
  });
}

function Paragraphs({ items }) {
  if (!items?.length) return null;
  return items.map((item) => <p key={item}><RichText text={item} /></p>);
}

function ItemList({ items }) {
  if (!items?.length) return null;
  return (
    <ul>
      {items.map((item) => <li key={item}><RichText text={item} /></li>)}
    </ul>
  );
}

export default function GuideArticle() {
  const { slug } = useParams();
  const tocRef = useRef(null);
  useEffect(() => {
    if (tocRef.current) tocRef.current.open = window.matchMedia("(min-width: 1001px)").matches;
  }, [slug]);
  const guide = getGuideBySlug(slug);
  if (!guide) return <NotFoundPage />;
  const related = (guide.related || []).map(getGuideBySlug).filter(Boolean);

  return (
    <GuideShell>
      <main className="guide-main guide-editorial">
        <nav className="breadcrumbs" aria-label="פירורי לחם">
          <a href="/">AllInCenter</a><span>›</span>
          <a href="/guides">מרכז הידע</a><span>›</span>
          <span aria-current="page">{guide.shortTitle}</span>
        </nav>
        <article className="guide-article">
          <header className="ge-hero"><div className="ge-hero-copy">
            <span className="kicker">{guide.category}</span>
            <h1>{guide.title}</h1>
            <p className="guide-lead">{guide.excerpt}</p>
            <p className="kc-meta">{guideReadingMinutes(guide)} דקות קריאה</p>
          </div><GuideVisual slug={slug} /></header>
          <div className="ge-reading-layout">
          <details className="ge-toc" ref={tocRef}>
            <summary>במדריך הזה</summary>
            <nav aria-label="תוכן עניינים">
              {guide.sections.map((raw, index) => <a key={index} href={`#section-${index + 1}`}>{normalizeSection(raw).heading}</a>)}
              {guide.checklist && <a href="#guide-checklist-title">{guide.checklist.title}</a>}
              {!!guide.faq?.length && <a href="#guide-faq-title">שאלות נפוצות</a>}
            </nav>
          </details>
          <div className="guide-content">
            <Paragraphs items={guide.intro} />
            {guide.sections.map((raw, index) => {
              const item = normalizeSection(raw);
              return (
                <section key={item.heading} id={`section-${index + 1}`} className={`${item.heading.includes("Schema:") || item.heading.includes("איפה AI") ? "ge-comparison" : ""} ${item.heading.includes("למפות תהליך") ? "ge-questions" : ""}`}>
                  <h2>{item.heading}</h2>
                  <Paragraphs items={item.paragraphs} />
                  <ItemList items={item.list} />
                  {(item.h3s || []).map((block) => (
                    <div key={block.heading}>
                      <h3>{block.heading}</h3>
                      <Paragraphs items={block.paragraphs} />
                      <ItemList items={block.list} />
                    </div>
                  ))}
                  <GuideInsert slug={slug} index={index} />
                  {item.callout && (
                    <aside className="guide-callout">
                      <strong>{item.callout.title}</strong>
                      <p>{item.callout.text}</p>
                    </aside>
                  )}
                </section>
              );
            })}
            {guide.checklist && (
              <section className="ge-checklist-panel">
                <h2 id="guide-checklist-title">{guide.checklist.title}</h2>
                <ol className="guide-checklist">
                  {guide.checklist.items.map((item) => <li key={item}>{item}</li>)}
                </ol>
              </section>
            )}
            {guide.faq?.length ? (
              <section className="guide-faq" aria-labelledby="guide-faq-title">
                <h2 id="guide-faq-title">שאלות נפוצות</h2>
                <div>
                  {guide.faq.map(([question, answer]) => (
                    <details key={question}>
                      <summary>{question}</summary>
                      <p>{answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
          </div>
          {related.length ? (
            <section className="guide-related" aria-labelledby="guide-related-title">
              <h2 id="guide-related-title">מדריכים קשורים</h2>
              <ul>
                {related.map((item) => (
                  <li key={item.slug}><a href={`/guides/${item.slug}`}><span className="ge-related-category">{item.category}</span><strong>{item.title}</strong><p>{item.excerpt}</p><span className="ge-related-link">לקריאת המדריך <ArrowLeft size={18} aria-hidden="true" /></span></a></li>
                ))}
              </ul>
            </section>
          ) : null}
          <aside className="guide-cta">
            <h2>רוצים לראות איך זה מתחבר לעסק שלכם?</h2>
            <div className="guide-cta__actions">
              <a className="btn btn--primary" href={guide.cta.href}>{guide.cta.label} <ArrowLeft size={18} /></a>
              <a className="btn btn--ghost" href="/#contact">לשיחה קצרה</a>
            </div>
          </aside>
          <a className="guide-back" href="/guides">חזרה למרכז הידע</a>
        </article>
      </main>
    </GuideShell>
  );
}
