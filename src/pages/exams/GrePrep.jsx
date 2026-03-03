import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function GrePrep() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className={`pt-28 pb-16 min-h-screen transition-colors ${isDark ? "bg-slate-950" : "bg-white"}`}>
      <section className="max-w-5xl mx-auto px-6">
        <h1 className={`text-3xl font-bold mb-3 ${isDark ? "text-slate-50" : "text-slate-900"}`}>
          GRE Preparation
        </h1>
        <p className={`mb-4 ${isDark ? "text-slate-400" : "text-slate-700"}`}>
          This page is for future GRE courses and practice. You can later add
          sections for vocabulary, quant questions, and writing examples.
        </p>
        <ul className={`list-disc list-inside text-sm space-y-1 ${isDark ? "text-slate-400" : "text-slate-700"}`}>
          <li>Verbal reasoning and vocabulary</li>
          <li>Quantitative reasoning</li>
          <li>Analytical writing practice</li>
        </ul>
      </section>
    </main>
  );
}
