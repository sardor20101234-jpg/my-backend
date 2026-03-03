import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main className={`pt-28 pb-16 min-h-screen transition-all duration-500 ${isDark ? "bg-slate-950" : "bg-white"}`}>
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-indigo-500/10">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop"
              alt="Students Learning"
              className="w-full h-[450px] object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? "from-slate-950/80 to-transparent" : "from-indigo-900/20 to-transparent"}`} />
          </div>

          {/* Decorative elements */}
          <div className={`absolute -top-6 -left-6 w-32 h-32 rounded-full blur-3xl opacity-20 ${isDark ? "bg-indigo-400" : "bg-indigo-600"}`} />
          <div className={`absolute -bottom-6 -right-6 w-40 h-40 rounded-full blur-3xl opacity-10 ${isDark ? "bg-purple-400" : "bg-purple-600"}`} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/10 text-indigo-600 text-xs font-black uppercase tracking-widest mb-6">
            Our Mission
          </span>
          <h1 className={`text-4xl md:text-5xl font-black mb-8 leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            About <span className="text-indigo-600 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Agiedus</span>
          </h1>
          <div className={`space-y-6 text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            <p>
              Agiedus was born from a simple idea: education should be clear, organized, and focused on the student's personal growth.
              We believe that every learner has a unique path, and our platform is designed to support that journey.
            </p>
            <p>
              By combining high-quality structured content with interactive tools and personalized progress tracking,
              we help students bridge the gap between where they are and where they want to be.
            </p>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div>
              <p className={`text-3xl font-black ${isDark ? "text-white" : "text-indigo-600"}`}>1.2k+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Students</p>
            </div>
            <div className={`w-px h-10 ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
            <div>
              <p className={`text-3xl font-black ${isDark ? "text-white" : "text-indigo-600"}`}>50+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Courses</p>
            </div>
            <div className={`w-px h-10 ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
            <div>
              <p className={`text-3xl font-black ${isDark ? "text-white" : "text-indigo-600"}`}>100%</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Digital</p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
