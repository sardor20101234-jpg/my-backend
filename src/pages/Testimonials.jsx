import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const testimonials = [
  { name: "Aisha", text: "Agiedus changed how I learn. It's amazing!", img: "https://i.pravatar.cc/150?img=1" },
  { name: "David", text: "Great community and well-structured courses.", img: "https://i.pravatar.cc/150?img=2" },
  { name: "Sofia", text: "The animations and interactive style make it fun!", img: "https://i.pravatar.cc/150?img=3" },
];

export default function Testimonials() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className={`py-20 text-center transition-colors ${isDark ? "bg-slate-900" : "bg-gray-100"}`}>
      <h2 className={`text-4xl font-bold mb-12 ${isDark ? "text-slate-50" : "text-slate-900"}`}>
        What Students Say
      </h2>

      <div className="flex overflow-x-auto gap-6 px-6 max-w-6xl mx-auto snap-x snap-mandatory">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className={`p-6 rounded-2xl shadow-lg min-w-[280px] snap-center transition-colors ${isDark ? "bg-slate-800 border border-slate-700" : "bg-white"
              }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full mx-auto" />
            <p className={`mt-4 italic ${isDark ? "text-slate-300" : "text-slate-700"}`}>"{t.text}"</p>
            <h4 className={`mt-2 font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{t.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
