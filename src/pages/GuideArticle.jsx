import React from "react";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import GuideShell from "@/components/GuideShell";
import { getGuideBySlug } from "@/data/guides";
import NotFoundPage from "@/pages/NotFound";

export default function GuideArticle() {
  const { slug } = useParams();
  const guide = getGuideBySlug(slug);
  if (!guide) return <NotFoundPage />;
  return <GuideShell><main className="guide-main">
    <nav className="breadcrumbs" aria-label="פירורי לחם"><a href="/">AllInCenter</a><span>›</span><a href="/guides">מרכז הידע</a><span>›</span><span aria-current="page">{guide.shortTitle}</span></nav>
    <article className="guide-article"><header><span className="kicker">{guide.category}</span><h1>{guide.title}</h1></header>
      <div className="guide-content">{guide.intro.map((p) => <p key={p}>{p}</p>)}{guide.sections.map(([heading, paragraphs]) => <section key={heading}><h2>{heading}</h2>{paragraphs.map((p) => <p key={p}>{p}</p>)}</section>)}</div>
      <aside className="guide-cta"><h2>רוצים לראות איך זה עובד בפועל?</h2><a className="btn btn--primary" href="/appointment-management">לצפייה במערכת ניהול התורים של AllInCenter <ArrowLeft size={18} /></a></aside>
      <a className="guide-back" href="/guides">חזרה למרכז הידע</a>
    </article>
  </main></GuideShell>;
}
