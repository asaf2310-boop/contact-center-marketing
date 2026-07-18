import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarketingHome from "@/pages/MarketingHome";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketingHome />} />
      </Routes>
    </BrowserRouter>
  );
}
