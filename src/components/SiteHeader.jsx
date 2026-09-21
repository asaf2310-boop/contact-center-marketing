import React from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";

const links = [
  [/^\/$/, "/", "דף הבית"],
  [/^\/about(?:\/|$)/, "/about", "מי אנחנו"],
  [/^\/systems(?:\/|$)/, "/systems", "מערכות"],
  [/^\/(?:services|ai|google-ai-visibility)(?:\/|$)/, "/services", "שירותים"],
  [/^\/guides(?:\/|$)/, "/guides", "מרכז הידע"],
];

export default function SiteHeader() {
  const { pathname } = useLocation();

  return (
    <header className="nav nav--scrolled site-header">
      <div className="nav__inner">
        <a className="nav__brand" href="/" aria-label="AllInCenter - דף הבית">
          <img src="/assets/allincenter-logo-clear.png" alt="AllInCenter" />
        </a>
        <nav className="nav__links" aria-label="ניווט ראשי">
          {links.map(([pattern, href, label]) => (
            <a key={href} href={href} aria-current={pattern.test(pathname) ? "page" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <a className="btn btn--primary btn--sm" href="/#contact">
          לבקשת הדגמה <ArrowLeft size={16} />
        </a>
      </div>
    </header>
  );
}
