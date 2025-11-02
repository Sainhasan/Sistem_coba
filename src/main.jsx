// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Regis from "./pages/Regis";
import ManageUser from "./pages/ManageUser";
import Navbar from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

function AppLayout() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/regis";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regis" element={<Regis />} />
        <Route path="/manage" element={<ManageUser />} />
      </Routes>

      <SpeedInsights />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </StrictMode>
);
