import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarketingHome from "@/pages/MarketingHome";
import LandingLeads from "@/pages/LandingLeads";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketingHome />} />
        <Route path="/lp" element={<LandingLeads />} />
      </Routes>
    </BrowserRouter>
  );
}
