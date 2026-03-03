import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const inputClass = `w-full p-3 rounded-lg border outline-none transition focus:ring-2 focus:ring-indigo-500 ${isDark
      ? "bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500"
      : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
    }`;

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto text-center">
      <h2 className={`text-4xl font-bold mb-8 ${isDark ? "text-slate-50" : "text-slate-900"}`}>
        Contact Us
      </h2>
      <p className={`text-lg ${isDark ? "text-slate-400" : "text-gray-600"}`}>
        Got questions? Reach out to our support team anytime.
      </p>

      <form className="mt-10 space-y-4">
        <input type="text" placeholder="Your Name" className={inputClass} />
        <input type="email" placeholder="Your Email" className={inputClass} />
        <textarea placeholder="Your Message" className={`${inputClass} h-32`} />
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition font-semibold">
          Send Message
        </button>
      </form>
    </section>
  );
}
