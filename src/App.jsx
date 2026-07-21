import React, { useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MarketingHome from "@/pages/MarketingHome";
import LandingLeads from "@/pages/LandingLeads";
import Pricing from "@/pages/Pricing";
import { trackPageView } from "@/lib/fbpixel";

function RouteChangeTracker() {
  const location = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // The base snippet in index.html already fires the first PageView,
    // so skip the initial render to avoid double-counting it.
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    trackPageView();
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteChangeTracker />
      <Routes>
        <Route path="/" element={<MarketingHome />} />
        <Route path="/lp" element={<LandingLeads />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
}
