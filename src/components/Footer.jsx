import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { Rocket, Mail, Phone, Github } from "lucide-react";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`py-16 transition-colors ${isDark ? "bg-slate-950 border-t border-slate-900" : "bg-indigo-50 border-t border-indigo-100"
      }`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Rocket size={16} />
            </div>
            <span className={`text-lg font-black ${isDark ? "text-white" : "text-slate-900"}`}>
              Agiedus
            </span>
          </div>
          <p className={`max-w-sm mb-8 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Empowering students to achieve their academic goals through structured learning, focused practice, and expert guidance.
          </p>
          <div className="flex gap-4">
            {[Github, Mail, Phone].map((Icon, i) => (
              <button key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${isDark ? "border-slate-800 text-slate-400 hover:border-indigo-500 hover:text-indigo-400" : "border-indigo-200 text-indigo-600 hover:border-indigo-400 hover:bg-white"
                }`}>
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className={`font-bold mb-6 ${isDark ? "text-slate-200" : "text-slate-900"}`}>Platform</h4>
          <ul className="space-y-4">
            {['Courses', 'Exams', 'Features', 'Pricing'].map(item => (
              <li key={item}>
                <Link to={`/${item.toLowerCase()}`} className={`text-sm transition-colors ${isDark ? "text-slate-500 hover:text-indigo-400" : "text-slate-600 hover:text-indigo-600"
                  }`}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={`font-bold mb-6 ${isDark ? "text-slate-200" : "text-slate-900"}`}>Support</h4>
          <ul className="space-y-4">
            {['About', 'Contact', 'Privacy', 'Terms'].map(item => (
              <li key={item}>
                <Link to={`/${item.toLowerCase()}`} className={`text-sm transition-colors ${isDark ? "text-slate-500 hover:text-indigo-400" : "text-slate-600 hover:text-indigo-600"
                  }`}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-dashed border-slate-800/10 dark:border-slate-800 text-center">
        <p className={`text-sm ${isDark ? "text-slate-600" : "text-slate-400"}`}>
          © {new Date().getFullYear()} Agiedus. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
