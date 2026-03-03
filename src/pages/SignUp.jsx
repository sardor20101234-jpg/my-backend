import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
  CheckCircle2,
  ShieldCheck,
  AtSign,
  AlertCircle
} from "lucide-react";
import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function getPasswordStrength(password) {
  if (!password) return { label: "", color: "", width: "0%" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "25%" };
  if (score === 2) return { label: "Fair", color: "bg-yellow-500", width: "50%" };
  if (score === 3) return { label: "Good", color: "bg-blue-500", width: "75%" };
  return { label: "Strong", color: "bg-emerald-500", width: "100%" };
}

export default function SignUp() {
  const { signup } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({ name: "", username: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.username.trim()) { setError("Username is required."); return; }
    if (formData.password !== formData.confirmPassword) { setError("Passwords do not match."); return; }
    if (formData.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    console.log("[SignUp] Attempting account creation for:", formData.email);

    try {
      const result = await signup(formData.name, formData.username, formData.email, formData.password);
      console.log("[SignUp] Result:", result);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate("/verify-email"), 1500);
      } else {
        console.error("[SignUp] Failed:", result.error);
        setError(result.error);
        setLoading(false);
      }
    } catch (err) {
      console.error("[SignUp] Unexpected Exception:", err);
      setError("An unexpected error occurred during signup.");
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
            Create your account
          </h1>
          <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Join thousands of students on Agiedus
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
            <span>Account created! Redirecting…</span>
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
          {/* Full Name */}
          <div>
            <label htmlFor="name" className={`block text-sm font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              Full Name
            </label>
            <div className="relative">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" className={`${inputClass} pl-11`} placeholder="Your full name" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" className={`${inputClass} pl-11`} placeholder="you@example.com" />
            </div>
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className={`block text-sm font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              Username
            </label>
            <div className="relative">
              <AtSign className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required autoComplete="username" className={`${inputClass} pl-11`} placeholder="example_username" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
              <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} required autoComplete="new-password" className={`${inputClass} pl-11 pr-12`} placeholder="Create a strong password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-3 top-1/2 -translate-y-1/2 transition p-1 ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}>
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>Strength</span>
                  <span className={`text-xs font-medium ${strength.label === "Weak" ? "text-red-500" : strength.label === "Fair" ? "text-yellow-500" : strength.label === "Good" ? "text-blue-500" : "text-emerald-500"}`}>
                    {strength.label}
                  </span>
                </div>
                <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-700" : "bg-slate-100"}`}>
                  <motion.div className={`h-full rounded-full ${strength.color}`} initial={{ width: 0 }} animate={{ width: strength.width }} transition={{ duration: 0.3 }} />
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              Confirm Password
            </label>
            <div className="relative">
              <ShieldCheck className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-slate-500" : "text-slate-400"}`} />
              <input type={showConfirm ? "text" : "password"} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required autoComplete="new-password" className={`${inputClass} pl-11 pr-12`} placeholder="Repeat your password" />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className={`absolute right-3 top-1/2 -translate-y-1/2 transition p-1 ${isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"}`}>
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input type="checkbox" id="terms" required className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
            <label htmlFor="terms" className={`text-sm leading-snug ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              I agree to the{" "}
              <Link to="#" className="text-indigo-500 hover:text-indigo-400 font-medium">Terms and Conditions</Link>
              {" "}and{" "}
              <Link to="#" className="text-indigo-500 hover:text-indigo-400 font-medium">Privacy Policy</Link>
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
                Creating account…
              </span>
            ) : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${isDark ? "border-slate-700" : "border-slate-200"}`} />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className={`px-3 transition-colors ${isDark ? "bg-slate-900 text-slate-500" : "bg-white text-slate-400"}`}>
              Already have an account?
            </span>
          </div>
        </div>

        <Link
          to="/login"
          className={`block w-full text-center px-4 py-3 rounded-xl border text-sm font-medium transition ${isDark
            ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-indigo-500"
            : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-indigo-300"
            }`}
        >
          Sign in instead
        </Link>
      </motion.div>
    </div>
  );
}
