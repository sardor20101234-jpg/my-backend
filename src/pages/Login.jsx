import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, AlertCircle, CheckCircle2, User } from "lucide-react";
import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[Login] Attempting sign in with:", formData.email);
    setLoading(true);
    setError("");

    try {
      const result = await login(formData.email, formData.password);
      console.log("[Login] Result:", result);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate("/"), 800);
      } else {
        setError(result.error || "Incorrect email or password.");
        setLoading(false);
      }
    } catch (err) {
      console.error("[Login] Submit error:", err);
      setError("An unexpected error occurred. Please check your connection.");
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border outline-none transition text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${isDark
    ? "bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
    : "bg-slate-50/50 border-slate-200 text-slate-900 placeholder:text-slate-400"
    }`;

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-20 transition-colors ${isDark
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
        }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl ${isDark ? "bg-indigo-900/20" : "bg-indigo-200/30"}`} />
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl ${isDark ? "bg-purple-900/20" : "bg-purple-200/30"}`} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative backdrop-blur-xl rounded-[2.5rem] shadow-2xl border p-10 w-full max-w-md transition-all ${isDark
          ? "bg-slate-900/80 border-slate-800 shadow-black/40"
          : "bg-white/95 border-white/50"
          }`}
      >
        {/* Logo & heading */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <img src={Logo} alt="Agiedus" className="w-10 h-10 object-contain" />
            </div>
          </div>
          <h1 className={`text-2xl font-bold ${isDark ? "text-slate-50" : "text-slate-900"}`}>
            Welcome back
          </h1>
          <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Sign in to your Agiedus account
          </p>
        </div>

        {/* Success banner */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-sm"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Login successful! Redirecting…</span>
          </motion.div>
        )}

        {/* Error banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm border ${isDark
              ? "bg-red-500/10 border-red-500/30 text-red-400"
              : "bg-red-50 border-red-200 text-red-700"
              }`}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email / Username */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              Email or Username
            </label>
            <div className="relative group">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition appearance-none outline-none ${isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-white border-slate-200 text-slate-900 focus:border-indigo-600 shadow-sm"
                  }`}
              />
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className={`${inputClass} pr-12`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 transition p-1 ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex justify-end mt-1.5">
              <Link to="/forgot-password" className="text-xs font-medium text-indigo-500 hover:text-indigo-400 transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Remember me</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Signing in…
              </span>
            ) : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${isDark ? "border-slate-700" : "border-slate-200"}`} />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className={`px-3 transition-colors ${isDark ? "bg-slate-900 text-slate-500" : "bg-white text-slate-400"}`}>
              New to Agiedus?
            </span>
          </div>
        </div>

        <Link
          to="/signup"
          className={`block w-full text-center px-4 py-3 rounded-xl border text-sm font-medium transition ${isDark
            ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-indigo-500"
            : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-indigo-300"
            }`}
        >
          Create a free account
        </Link>

      </motion.div>
    </div>
  );
}
