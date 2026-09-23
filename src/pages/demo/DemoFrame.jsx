import React from "react";
import { Link } from "react-router-dom";
import { CLINIC } from "@/lib/appointmentDemoStore";

export default function DemoFrame({
  variant = "admin",
  title,
  subtitle,
  switchTo,
  switchLabel,
  children,
}) {
  const clinic = variant === "clinic";

  return (
    <div className={`ad-app${clinic ? " ad-app--clinic" : " ad-app--admin"}`} dir="rtl" lang="he">
      <header className="ad-topbar">
        {clinic ? (
          <div className="ad-brand ad-brand--clinic">
            <span className="ad-clinic-mark" aria-hidden="true">LIV</span>
            <span>
              <strong>{CLINIC.name}</strong>
              <small>{CLINIC.tagline}</small>
            </span>
          </div>
        ) : (
          <Link className="ad-brand" to="/">
            <img src="/assets/allincenter-logo-clear.png" alt="" />
            <span>
              <strong>AllInCenter</strong>
              <small>Appointments</small>
            </span>
          </Link>
        )}
        <div className="ad-heading">
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
          {clinic ? <p className="ad-powered">Powered by AllInCenter</p> : null}
        </div>
        <span className="ad-badge">סביבת הדגמה</span>
        <nav className="ad-topnav" aria-label="ניווט ההדגמה">
          {switchTo && switchLabel ? <Link className="ad-navlink" to={switchTo}>{switchLabel}</Link> : null}
          <Link className="ad-navlink ad-navlink--quiet" to="/">חזרה ל-AllInCenter</Link>
        </nav>
      </header>
      <main className="ad-main">{children}</main>
    </div>
  );
}
