import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const quickLinks = [
  { name: "Features", path: "/features" },
  { name: "Courses", path: "/courses" },
  { name: "Pricing", path: "/pricing" },
  { name: "Testimonials", path: "/testimonials" },
];

const supportLinks = [
  { name: "Contact", path: "/contact" },
  { name: "Login", path: "/login" },
  { name: "Sign up", path: "/signup" },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 text-slate-300">
      <div className="border-t border-indigo-500/40" />
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Agiedus logo" className="w-10 h-10 rounded-xl" />
            <span className="font-bold text-lg text-white">Agiedus</span>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            A small educational platform helping learners stay motivated,
            organised and confident.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.path}>
                <Link className="hover:text-indigo-300" to={l.path}>
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">
            Support
          </h4>
          <ul className="space-y-2 text-sm">
            {supportLinks.map((l) => (
              <li key={l.path}>
                <Link className="hover:text-indigo-300" to={l.path}>
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / social */}
        <div className="space-y-3 text-sm">
          <h4 className="text-sm font-semibold text-white">Stay in touch</h4>
          <p className="text-slate-400">
            Email: <a href="mailto:info@agiedus.com" className="hover:text-indigo-300">
              info@agiedus.com
            </a>
          </p>
          <p className="text-slate-400">Phone: +1 (555) 123-4567</p>
          <div className="flex gap-3 pt-2 text-lg">
            <a href="#" className="hover:text-indigo-300">🌐</a>
            <a href="#" className="hover:text-indigo-300">📘</a>
            <a href="#" className="hover:text-indigo-300">🐦</a>
            <a href="#" className="hover:text-indigo-300">📸</a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>© {new Date().getFullYear()} Agiedus. All rights reserved.</span>
          <span>Built with ❤️ for learners.</span>
        </div>
      </div>
    </footer>
  );
}
