import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarketingHome from "@/pages/MarketingHome";
import LandingLeads from "@/pages/LandingLeads";
import Pricing from "@/pages/Pricing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketingHome />} />
        <Route path="/lp" element={<LandingLeads />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
}
