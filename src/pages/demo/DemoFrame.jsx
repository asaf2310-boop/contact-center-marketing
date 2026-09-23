import React from "react";
import { Link } from "react-router-dom";

export default function DemoFrame({ title, subtitle, children, extraNav }) {
  return (
    <div className="ad-app" dir="rtl" lang="he">
      <header className="ad-topbar">
        <Link className="ad-brand" to="/">
          <img src="/assets/allincenter-logo-clear.png" alt="" />
          <span>
            <strong>AllInCenter</strong>
            <small>Appointments</small>
          </span>
        </Link>
        <div className="ad-heading">
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        <span className="ad-badge">סביבת הדגמה</span>
        <nav className="ad-topnav" aria-label="ניווט הדמו">
          {extraNav}
          <Link className="ad-navlink" to="/">חזרה ל-AllInCenter</Link>
        </nav>
      </header>
      <main className="ad-main">{children}</main>
    </div>
  );
}
