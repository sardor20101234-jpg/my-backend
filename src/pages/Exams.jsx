import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Exams() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const exams = [
    {
      id: "sat",
      title: "SAT",
      desc: "The SAT is used mainly for undergraduate admission to universities, especially in the United States. It tests reading, writing and maths.",
      path: "/exams/sat",
    },
    {
      id: "gre",
      title: "GRE",
      desc: "The GRE is for students who want to apply to master's or PhD programmes. It tests verbal reasoning, quantitative reasoning and analytical writing.",
      path: "/exams/gre",
    },
    {
      id: "gmat",
      title: "GMAT",
      desc: "The GMAT is mainly for business schools (MBA and similar programmes). It tests reasoning skills in a business context.",
      path: "/exams/gmat",
    },
  ];

  return (
    <main className={`pt-28 pb-16 min-h-screen transition-all duration-500 ${isDark ? "bg-slate-950" : "bg-gradient-to-b from-indigo-50/50 to-white"}`}>
      <section className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`text-4xl md:text-5xl font-black mb-6 leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            International <span className="text-indigo-600">Exams</span> Overview
          </h1>
          <p className={`text-lg mb-10 max-w-3xl leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Ready to take your next big step? Whether you're aiming for higher education or global career opportunities,
            we provide the resources you need to master the world's most recognized exams.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {exams.map((exam, i) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative rounded-[2rem] p-8 border transition-all duration-300 ${isDark
                  ? "bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 shadow-2xl shadow-black/20"
                  : "bg-white border-slate-100 hover:border-indigo-200 shadow-xl shadow-indigo-600/5"
                }`}
            >
              <div className="mb-6 w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Rocket size={24} />
              </div>
              <h2 className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"}`}>
                {exam.title}
              </h2>
              <p className={`text-sm mb-8 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {exam.desc}
              </p>
              <Link
                to={exam.path}
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Learn More <span>→</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={`mt-16 p-8 rounded-3xl border border-dashed transition-colors ${isDark ? "bg-slate-900/30 border-slate-800" : "bg-indigo-50/30 border-indigo-100"
            }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className={`text-sm italic text-center ${isDark ? "text-slate-500" : "text-slate-500"}`}>
            "Success is the sum of small efforts, repeated day in and day out." — More detailed study plans, mock tests, and
            interactive prep modules are coming soon for each major exam.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
