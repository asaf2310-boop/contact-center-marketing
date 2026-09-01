import React, { useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MarketingHome from "@/pages/MarketingHome";
import LandingLeads from "@/pages/LandingLeads";
import Pricing from "@/pages/Pricing";
import PelecardBrochure from "@/pages/PelecardBrochure";
import AiConsulting from "@/pages/AiConsulting";
import About from "@/pages/About";
import NotFoundPage from "@/pages/NotFound";
import Seo from "@/components/Seo";
import { trackPageView } from "@/lib/fbpixel";

function RouteChangeTracker() {
  const location = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    trackPageView();
  }, [location.pathname, location.search]);

  return null;
}

export function AppRoutes() {
  return (
    <>
      <Seo />
      <RouteChangeTracker />
      <Routes>
        <Route path="/" element={<MarketingHome />} />
        <Route path="/lp" element={<LandingLeads />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/allincenter-pelecard" element={<PelecardBrochure />} />
        <Route path="/ai" element={<AiConsulting />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
