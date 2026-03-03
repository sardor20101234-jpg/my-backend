import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Pricing() {
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
          <h1 className={`text-4xl md:text-5xl font-black mb-6 leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            Simple, Transparent <span className="text-indigo-600">Pricing</span>
          </h1>
          <p className={`text-lg mb-12 max-w-2xl mx-auto leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Choose the plan that fits your learning journey. Upgrade or downgrade anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {[
            { tier: "Basic", price: "$9", features: ["Access to free courses", "Community Support", "Basic Analytics"] },
            { tier: "Pro", price: "$29", features: ["All Basic features", "Premium Courses", "AI Personalized Paths", "Offline Access"], popular: true },
            { tier: "Enterprise", price: "$99", features: ["All Pro features", "Team Management", "Dedicated Mentor", "Custom API Access"] },
          ].map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-[2.5rem] p-10 border transition-all duration-300 flex flex-col items-center ${plan.popular
                  ? "bg-indigo-600 shadow-2xl shadow-indigo-600/20 text-white border-transparent scale-105 z-10"
                  : isDark
                    ? "bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 shadow-2xl shadow-black/20"
                    : "bg-white border-slate-100 hover:border-indigo-200 shadow-xl shadow-indigo-600/5"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-indigo-600 text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              <h3 className={`text-2xl font-black mb-4 ${plan.popular ? "text-white" : isDark ? "text-slate-100" : "text-slate-900"}`}>
                {plan.tier}
              </h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className={`text-sm ${plan.popular ? "text-indigo-100" : "text-slate-500"}`}>/mo</span>
              </div>
              <ul className={`w-full space-y-4 mb-10 text-left ${plan.popular ? "text-indigo-50" : isDark ? "text-slate-400" : "text-slate-600"}`}>
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? "bg-white/20" : "bg-indigo-600/10 text-indigo-500"}`}>
                      <span className="text-[10px]">✔</span>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 ${plan.popular
                  ? "bg-white text-indigo-600 hover:bg-indigo-50"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"
                }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
