import React from "react";
import SiteContactLine from "@/components/SiteContactLine";

export default function GuideShell({ children }) {
  return <div className="page guides-page" dir="rtl">
    <div className="bg-aurora" aria-hidden="true" />
    <header className="nav nav--scrolled"><div className="nav__inner">
      <a className="nav__brand" href="/" aria-label="AllInCenter - דף הבית"><img src="/assets/allincenter-logo.png" alt="AllInCenter" /><span>All<b>In</b>Center</span></a>
      <a className="btn btn--ghost btn--sm" href="/">חזרה לאתר</a>
    </div></header>
    {children}
    <footer className="footer"><div className="footer__inner">
      <div className="footer__brand"><img src="/assets/allincenter-logo.png" alt="AllInCenter" /><div><strong>AllInCenter</strong><small>Connect · Manage · Grow</small></div></div>
      <nav className="footer__links" aria-label="ניווט תחתון"><a href="/">דף הבית</a><a href="/guides">מרכז הידע</a><a href="/appointment-management">מערכת ניהול תורים</a><a href="/#contact">יצירת קשר</a></nav>
      <SiteContactLine /><small className="footer__note">© {new Date().getFullYear()} AllInCenter · allincenter.co.il · מערכות ניהול מותאמות לעסקים בישראל</small>
    </div></footer>
  </div>;
}
