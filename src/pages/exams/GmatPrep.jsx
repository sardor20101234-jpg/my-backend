import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function GmatPrep() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className={`pt-28 pb-16 min-h-screen transition-colors ${isDark ? "bg-slate-950" : "bg-white"}`}>
      <section className="max-w-5xl mx-auto px-6">
        <h1 className={`text-3xl font-bold mb-3 ${isDark ? "text-slate-50" : "text-slate-900"}`}>
          GMAT Preparation
        </h1>
        <p className={`mb-4 ${isDark ? "text-slate-400" : "text-slate-700"}`}>
          This page will later show GMAT-related content: courses, practice
          tasks and exam strategies for future business students.
        </p>
        <ul className={`list-disc list-inside text-sm space-y-1 ${isDark ? "text-slate-400" : "text-slate-700"}`}>
          <li>Quantitative and verbal reasoning</li>
          <li>Integrated reasoning</li>
          <li>Writing and time management tips</li>
        </ul>
      </section>
    </main>
  );
}
