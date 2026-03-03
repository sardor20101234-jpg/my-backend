import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function SatPrep() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className={`pt-28 pb-16 min-h-screen transition-colors ${isDark ? "bg-slate-950" : "bg-white"}`}>
      <section className="max-w-5xl mx-auto px-6">
        <h1 className={`text-3xl font-bold mb-3 ${isDark ? "text-slate-50" : "text-slate-900"}`}>
          SAT Preparation
        </h1>
        <p className={`mb-4 ${isDark ? "text-slate-400" : "text-slate-700"}`}>
          This page will later include SAT courses, topic lists, and practice
          tests. For now, it is a simple placeholder to show structure.
        </p>
        <ul className={`list-disc list-inside text-sm space-y-1 ${isDark ? "text-slate-400" : "text-slate-700"}`}>
          <li>Reading and Writing skills</li>
          <li>Math (with and without calculator)</li>
          <li>Timing tips and exam strategy</li>
        </ul>
      </section>
    </main>
  );
}
