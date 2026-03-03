import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Courses() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className={`pt-28 pb-16 min-h-screen transition-all duration-500 ${isDark ? "bg-slate-950" : "bg-gradient-to-b from-indigo-50/50 to-white"}`}>
      <section className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/10 text-indigo-600 text-xs font-black uppercase tracking-widest mb-6">
            Learning Library
          </span>
          <h1 className={`text-4xl md:text-5xl font-black mb-8 leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            Explore Our <span className="text-indigo-600">Courses</span>
          </h1>
          <p className={`text-lg mb-16 max-w-2xl mx-auto leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            From foundational math to advanced programming, our interactive modules
            provide real-time feedback and structured learning paths.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Math", "Science", "History", "English", "Programming", "Art"].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-8 rounded-[2rem] border transition-all duration-300 text-left flex flex-col justify-between ${isDark
                ? "bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 shadow-2xl shadow-black/20"
                : "bg-white border-slate-100 hover:border-indigo-200 shadow-xl shadow-indigo-600/5"
                }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${isDark ? "bg-slate-800 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}>
                  <BookOpen size={20} />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                  {c}
                </h3>
                <p className={`text-sm leading-relaxed mb-8 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Master {c.toLowerCase()} with our engaging lessons and expert-curated interactive projects.
                </p>
              </div>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-500 transition-colors flex items-center gap-2">
                View Course <span>→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
