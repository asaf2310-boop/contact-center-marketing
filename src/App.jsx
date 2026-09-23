import React, { useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import MarketingHome from "@/pages/MarketingHome";
import LandingLeads from "@/pages/LandingLeads";
import Pricing from "@/pages/Pricing";
import PelecardBrochure from "@/pages/PelecardBrochure";
import AiConsulting from "@/pages/AiConsulting";
import About from "@/pages/About";
import AppointmentManagement from "@/pages/AppointmentManagement";
import RestaurantReservations from "@/pages/RestaurantReservations";
import Guides from "@/pages/Guides";
import GuideArticle from "@/pages/GuideArticle";
import GoogleAiVisibility from "@/pages/GoogleAiVisibility";
import SystemsHub from "@/pages/SystemsHub";
import ServicesHub from "@/pages/ServicesHub";
import NotFoundPage from "@/pages/NotFound";
import AppointmentBookingDemo from "@/pages/demo/AppointmentBookingDemo";
import AppointmentAdminDemo from "@/pages/demo/AppointmentAdminDemo";
import Seo from "@/components/Seo";
import { trackPageView } from "@/lib/fbpixel";
import { initAnalytics, installLeadLinkTracking, trackAnalyticsPageView } from "@/lib/analytics";

function RouteChangeTracker() {
  const location = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    initAnalytics();
    trackAnalyticsPageView();

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
        <Route path="/appointment-management" element={<AppointmentManagement />} />
        <Route path="/demo/appointments/booking" element={<AppointmentBookingDemo />} />
        <Route path="/demo/appointments/admin" element={<AppointmentAdminDemo />} />
        <Route path="/restaurant-reservations" element={<RestaurantReservations />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/guides/:slug" element={<GuideArticle />} />
        <Route path="/google-ai-visibility" element={<GoogleAiVisibility />} />
        <Route path="/systems" element={<SystemsHub />} />
        <Route path="/services" element={<ServicesHub />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  useEffect(() => installLeadLinkTracking(), []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
