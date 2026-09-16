import React from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function GuideShell({ children }) {
  return <div className="page guides-page" dir="rtl">
    <div className="bg-aurora" aria-hidden="true" />
    <SiteHeader />
    {children}
    <SiteFooter />
  </div>;
}
