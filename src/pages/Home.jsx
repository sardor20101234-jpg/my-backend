import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, Rocket, CheckCircle2, ArrowRight, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

import heroImg from "../assets/about.png";
import student1 from "../assets/student1.jpg";
import student2 from "../assets/student2.jpg";
import student3 from "../assets/student3.jpg";

const testimonials = [
  {
    name: "Aisha",
    role: "High school student",
    text: "This website helped me organise my study plan and feel less stressed before exams.",
    img: student1,
  },
  {
    name: "David",
    role: "University applicant",
    text: "I like how everything is in one place: exams, tips and clear explanations.",
    img: student2,
  },
  {
    name: "Sofia",
    role: "Busy learner",
    text: "Short, focused sections make it easy to study even when I don’t have much time.",
    img: student3,
  },
];

export default function Home() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Check if user is "new" (registered today) or returning
  const parseDate = (d) => (d ? new Date(d) : new Date());
  const createdDate = parseDate(user?.createdAt);
  const lastLoginDate = parseDate(user?.lastLogin);

  const isReturning = user && user.lastLogin && (lastLoginDate - createdDate > 120000); // More than 2 mins difference
  const isNew = user && (!user.lastLogin || (lastLoginDate - createdDate <= 120000));

  return (
    <main className={`min-h-screen pt-28 pb-16 transition-colors duration-300 ${isDark ? "bg-slate-950" : "bg-gradient-to-b from-[#F8E7F6] via-[#E0D7F9] to-[#f3f4f6]"
      }`}>
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Left side text */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {user ? (
            <>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-indigo-600 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
                <Star size={14} className="fill-indigo-600" />
                {isReturning ? "Welcome back! mainpage" : "Welcome! mainpage"}
              </p>

              <h1 className={`text-4xl md:text-6xl font-black mb-6 leading-[1.1] ${isDark ? "text-white" : "text-slate-900"}`}>
                {isReturning ? (
                  <>Ready to <span className="text-indigo-500 underline decoration-indigo-500/30">continue</span> your journey?</>
                ) : (
                  <>Let's get <span className="text-indigo-600">started</span> with Agiedus.</>
                )}
              </h1>

              <div className="space-y-4 mb-8">
                {isNew ? (
                  <div className="grid gap-4">
                    {[
                      { title: "Personalize Profile", desc: "Set your exam focus and choose an avatar.", icon: <Users size={18} />, link: "/settings" },
                      { title: "Explore Courses", desc: "Browse our library of structured learning content.", icon: <BookOpen size={18} />, link: "/courses" },
                      { title: "Track Progress", desc: "Start your first lesson to see your daily stats.", icon: <Rocket size={18} />, link: "/courses" }
                    ].map((step, i) => (
                      <Link to={step.link} key={i} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all hover:scale-[1.02] ${isDark ? "bg-slate-900/50 border-slate-800 hover:border-indigo-500/50" : "bg-white border-slate-100 hover:border-indigo-200 shadow-sm"
                        }`}>
                        <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 shrink-0">
                          {step.icon}
                        </div>
                        <div>
                          <h4 className={`font-bold text-sm ${isDark ? "text-slate-200" : "text-slate-900"}`}>{step.title}</h4>
                          <p className="text-xs text-slate-400 mt-1">{step.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className={`text-lg transition-opacity ${isDark ? "text-slate-400" : "text-slate-700"}`}>
                    You're making great progress. Pick up where you left off or explore new courses to keep the momentum going.
                  </p>
                )}
              </div>

              {!isNew && (
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/courses"
                    className="px-8 py-4 rounded-2xl text-base font-bold bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all hover:-translate-y-1"
                  >
                    Continue Learning
                  </Link>
                  <Link
                    to="/settings"
                    className={`px-8 py-4 rounded-2xl text-base font-bold border transition-all hover:bg-slate-50 ${isDark ? "border-slate-700 text-slate-200 bg-slate-900" : "border-slate-200 text-slate-700 bg-white"
                      }`}
                  >
                    My Settings
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`inline-flex items-center text-xs font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 transition-colors shadow-sm ${isDark
                    ? "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20"
                    : "text-indigo-700 bg-indigo-50 border border-indigo-100"
                  }`}
              >
                <Star size={14} className={`mr-2 ${isDark ? "fill-indigo-400" : "fill-indigo-700"}`} />
                Small project, big goals
              </motion.p>

              <h1 className={`text-4xl md:text-6xl font-black mb-6 leading-[1.1] transition-colors ${isDark ? "text-white" : "text-slate-900"
                }`}>
                Your friendly place to{" "}
                <span className="text-indigo-600 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  learn, plan and grow
                </span>.
              </h1>

              <p className={`text-lg mb-8 max-w-xl leading-relaxed transition-colors ${isDark ? "text-slate-400" : "text-slate-600"
                }`}>
                This educational website is built to help students stay organised,
                understand key topics, and prepare for exams with less stress. Clear
                sections, simple language, and practical tips – all in one place.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/courses"
                  className="px-8 py-4 rounded-2xl text-base font-bold bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all hover:-translate-y-1 active:scale-95"
                >
                  Explore courses
                </Link>
                <Link
                  to="/signup"
                  className={`px-8 py-4 rounded-2xl text-base font-bold border transition-all active:scale-95 ${isDark
                      ? "border-slate-700 text-slate-200 bg-slate-900 hover:border-indigo-500/50"
                      : "border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm"
                    }`}
                >
                  Join now free
                </Link>
              </div>
            </>
          )}

          <div className="mt-8 flex flex-wrap gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <p className={isDark ? "text-slate-400" : "text-slate-600"}>Flexible study pace</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <p className={isDark ? "text-slate-400" : "text-slate-600"}>Personalized focus</p>
            </div>
          </div>
        </motion.div>

        {/* Right side image / card */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full max-w-md">
            <div className={`rounded-[2.5rem] overflow-hidden shadow-2xl border transition-colors ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-indigo-100"
              }`}>
              <img
                src={heroImg}
                alt="Student studying"
                className="w-full h-72 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />)}
                  </div>
                  <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    +1,200 students joined
                  </p>
                </div>
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  Study smarter, not harder
                </h3>
                <p className={`mt-3 text-sm leading-relaxed transition-colors ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Break big goals into small steps, track your progress, and
                  keep your motivation high.
                </p>
              </div>
            </div>

            {/* Floating mini cards */}
            <motion.div
              className={`absolute -bottom-4 -left-6 shadow-xl rounded-2xl px-5 py-4 border transition-colors ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
                }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Rocket size={20} />
                </div>
                <div>
                  <p className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>Daily Streak</p>
                  <p className="text-xs text-slate-400">12 days and counting!</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-6 -right-6 bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 rounded-2xl px-6 py-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="font-bold text-lg mb-1">98%</p>
              <p className="text-[10px] text-indigo-100 uppercase tracking-widest font-black">Score Boost</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS / FEATURES */}
      <section className="mt-20 max-w-6xl mx-auto px-6">
        <motion.h2
          className={`text-2xl md:text-3xl font-bold text-center ${isDark ? "text-white" : "text-slate-900"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How this website helps you
        </motion.h2>

        <motion.p
          className={`mt-3 text-center max-w-2xl mx-auto ${isDark ? "text-slate-400" : "text-slate-600"}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Everything is organised into clear sections so you can quickly find
          what you need – from courses and exam tips to extra resources.
        </motion.p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: "Clear learning", desc: "Read simple explanations of key topics, without heavy academic language or confusing details.", icon: <BookOpen className="w-8 h-8 text-indigo-600" /> },
            { title: "Built for real students", desc: "Content is designed for everyday learners, not experts. You can use it alone or together with your teacher.", icon: <Users className="w-8 h-8 text-indigo-600" /> },
            { title: "Step-by-step progress", desc: "Move from basics to more advanced ideas in a logical order, so you can build strong knowledge over time.", icon: <Rocket className="w-8 h-8 text-indigo-600" /> }
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl shadow-md p-5 border transition-all ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-indigo-50"}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {item.icon}
              <h3 className={`mt-3 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{item.title}</h3>
              <p className={`mt-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTIONS OVERVIEW */}
      <section className="mt-20 max-w-6xl mx-auto px-6">
        <motion.h2
          className={`text-2xl md:text-3xl font-bold text-center ${isDark ? "text-white" : "text-slate-900"}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Main sections of the website
        </motion.h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: "Courses", desc: "Browse the list of subjects and topics. Each course will later include lessons, tasks, and tips.", link: "/courses", linkText: "Go to Courses →" },
            { title: "Exams & practice", desc: "Learn how to prepare for tests and exams with short, focused practice ideas and strategies.", link: "/exams", linkText: "Go to Exams →" },
            { title: "Features & tools", desc: "Discover how the platform is organised and what tools you can use to track your learning.", link: "/features", linkText: "See Features →" }
          ].map((section, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl shadow-md p-5 border flex flex-col justify-between transition-all ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div>
                <h3 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{section.title}</h3>
                <p className={`mt-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  {section.desc}
                </p>
              </div>
              <Link
                to={section.link}
                className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {section.linkText}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mt-24 bg-slate-950 text-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What students say
          </motion.h2>
          <motion.p
            className="mt-3 text-center text-sm md:text-base text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            These are example comments to show how real feedback will look in
            the future when more learners use the platform.
          </motion.p>

          <div className="mt-10 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                className="min-w-[260px] max-w-sm bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-xl snap-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-50">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-200 italic">
                  “{t.text}”
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={`transition-colors ${isDark ? "bg-slate-900/50" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className={`text-xl md:text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
              Ready to explore the rest of the website?
            </h3>
            <p className={`mt-2 text-sm md:text-base ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Start with the Courses page or simply read more details on the
              About page. You can grow this project step by step.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/about"
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${isDark ? "border-slate-700 text-slate-200 bg-slate-800 hover:bg-slate-700" : "border-slate-200 text-slate-800 bg-white hover:bg-slate-50"}`}
            >
              About this project
            </Link>
            <Link
              to="/courses"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-md"
            >
              Go to Courses
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
