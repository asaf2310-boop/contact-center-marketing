import React from "react";
import { SITE } from "@/lib/site";

export default function NotFoundPage() {
  return (
    <div className="page">
      <div className="bg-aurora" aria-hidden="true" />
      <header className="lp-nav">
        <a className="nav__brand" href="/">
          <img src="/assets/allincenter-logo.png" alt="AllInCenter" width="44" height="44" />
          <span>
            All<b>In</b>Center
          </span>
        </a>
      </header>
      <main className="not-found">
        <p className="kicker">404</p>
        <h1>העמוד לא נמצא</h1>
        <p>ייתכן שהכתובת השתנתה או שהקישור אינו מעודכן.</p>
        <a className="btn btn--primary" href="/">
          חזרה לדף הבית
        </a>
        <p className="not-found__contact">
          <a href={`tel:${SITE.phoneIntl}`}>{SITE.phoneDisplay}</a>
          {" · "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </main>
    </div>
  );
}
