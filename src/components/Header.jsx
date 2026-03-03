import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Sun, Moon, Rocket } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === "dark";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-md ${isDark ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-indigo-100"
      }`}>
      <nav className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
            <Rocket size={20} />
          </div>
          <span className={`text-xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            Agiedus
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "Home", path: "/" },
            { name: "Courses", path: "/courses" },
            { name: "Exams", path: "/exams" },
            { name: "About", path: "/about" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-bold transition-colors ${isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-indigo-600"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark ? "bg-slate-900 text-yellow-400 hover:bg-slate-800" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <Link
              to="/settings"
              className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-600/20 hover:scale-105 transition-transform"
            >
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover rounded-xl" />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </Link>
          ) : (
            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-all hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
