import React from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import GuideShell from "@/components/GuideShell";
import { guides } from "@/data/guides";

export default function Guides() {
  return <GuideShell><main>
    <section className="guides-hero"><span className="tag"><BookOpen size={16} /> ידע מעשי לעסקים</span><h1>מרכז הידע של AllInCenter</h1><p>מידע מעשי על מערכות ניהול, אוטומציה ו-AI לעסקים.<br />מדריכים שיעזרו להבין אילו תהליכים אפשר לייעל, איך לבחור את המערכת המתאימה לעסק ואיך לצמצם עבודה ידנית.</p></section>
    <section className="guides-list" aria-labelledby="guides-list-title"><h2 id="guides-list-title">המדריכים שלנו</h2><div className="guides-grid">{guides.map((guide) => <article className="guide-card" key={guide.slug}><span>{guide.category}</span><h3>{guide.title}</h3><p>{guide.excerpt}</p><a href={`/guides/${guide.slug}`}>לקריאת המדריך <ArrowLeft size={17} /></a></article>)}</div></section>
  </main></GuideShell>;
}
