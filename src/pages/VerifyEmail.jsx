import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send } from "lucide-react";
import Logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";

export default function VerifyEmail() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

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
                className={`relative backdrop-blur-xl rounded-[2.5rem] shadow-2xl border p-10 w-full max-w-md transition-all text-center ${isDark
                    ? "bg-slate-900/80 border-slate-800 shadow-black/40"
                    : "bg-white/95 border-white/50"
                    }`}
            >
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <img src={Logo} alt="Agiedus" className="w-10 h-10 object-contain" />
                    </div>
                </div>

                <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${isDark ? "bg-indigo-500/10" : "bg-indigo-50"}`}>
                    <Mail className="w-10 h-10 text-indigo-500" />
                </div>

                <h1 className={`text-3xl font-bold mb-4 ${isDark ? "text-slate-50" : "text-slate-900"}`}>
                    Check your inbox
                </h1>
                <p className={`text-base mb-8 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    We've sent a verification link to your email address. Please click the link to activate your account.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-semibold hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                    >
                        <Send size={18} />
                        Resend verification email
                    </button>

                    <Link
                        to="/login"
                        className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl border font-medium transition ${isDark
                            ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-indigo-500"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-indigo-300"
                            }`}
                    >
                        <ArrowLeft size={18} />
                        Back to Sign In
                    </Link>
                </div>

                <p className={`mt-8 text-sm ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    Can't find the email? Check your spam folder or wait a few minutes.
                </p>
            </motion.div>
        </div>
    );
}
