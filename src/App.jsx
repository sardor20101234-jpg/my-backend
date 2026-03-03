// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./compounds/Header";
import Footer from "./compounds/Footer";

import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Courses from "./pages/Courses";
import Exams from "./pages/Exams";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import SatPrep from "./pages/exams/SatPrep";
import GrePrep from "./pages/exams/GrePrep";
import GmatPrep from "./pages/exams/GmatPrep";

import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import AdminUsers from "./pages/AdminUsers";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

function AppShell() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Router>
      <div
        className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark
          ? "bg-slate-950 text-slate-50"
          : "bg-gray-50 text-slate-900"
          }`}
      >
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* exam sub-pages */}
            <Route path="/exams/sat" element={<SatPrep />} />
            <Route path="/exams/gre" element={<GrePrep />} />
            <Route path="/exams/gmat" element={<GmatPrep />} />

            {/* settings */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin/users" element={<AdminUsers />} />

            {/* fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </ThemeProvider>
  );
}
