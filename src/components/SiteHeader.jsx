import React from "react";
import { ArrowLeft } from "lucide-react";

const links=[[/^\/systems/,"/systems","מערכות"],[/^\/(services|ai|google-ai-visibility)/,"/services","שירותים"],[/^\/guides/,"/guides","מרכז הידע"],[/^\/about/,"/about","מי אנחנו"]];

export default function SiteHeader(){const path=typeof window!=="undefined"?window.location.pathname:"";return <header className="nav nav--scrolled site-header"><div className="nav__inner"><a className="nav__brand" href="/" aria-label="AllInCenter - דף הבית"><img src="/assets/allincenter-logo.png" alt="AllInCenter"/><span>All<b>In</b>Center</span></a><nav className="nav__links" aria-label="ניווט ראשי">{links.map(([pattern,href,label])=><a key={href} href={href} aria-current={pattern.test(path)?"page":undefined}>{label}</a>)}</nav><a className="btn btn--primary btn--sm" href="/#contact">לבקשת הדגמה <ArrowLeft size={16}/></a></div></header>}
