import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Rocket } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Features() {
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
            Features
          </span>
          <h1 className={`text-4xl md:text-5xl font-black mb-8 leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            Tools for <span className="text-indigo-600">Modern</span> Learning
          </h1>
          <p className={`text-lg mb-16 max-w-3xl mx-auto leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Built from the ground up to empower students. Discover the features that make Agiedus
            the best place to grow your knowledge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <BookOpen size={24} />,
              title: "Interactive Courses",
              desc: "Learn with videos, quizzes, and projects designed for active, engaging experience.",
            },
            {
              icon: <Users size={24} />,
              title: "Community Support",
              desc: "Join a global network of students and mentors to share ideas and solve problems together.",
            },
            {
              icon: <Rocket size={24} />,
              title: "Career Growth",
              desc: "Boost your professional skills and land your dream job with confidence and guidance.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-10 rounded-[2.5rem] border transition-all duration-300 text-left ${isDark
                  ? "bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 shadow-2xl shadow-black/20"
                  : "bg-white border-slate-100 hover:border-indigo-200 shadow-xl shadow-indigo-600/5"
                }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {f.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                {f.title}
              </h3>
              <p className={`leading-relaxed text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
