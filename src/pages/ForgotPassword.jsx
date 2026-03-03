import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, Key } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function ForgotPassword() {
    const { theme } = useTheme();
    const { forgotPassword, resetPassword } = useAuth();
    const isDark = theme === "dark";

    const [step, setStep] = useState(1); // 1: Email, 2: Code & New Pass
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSendCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const res = await forgotPassword(email);
        setLoading(false);
        if (res.success) {
            setMessage(res.message);
            setStep(2);
        } else {
            setError(res.error);
        }
    };

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const res = await resetPassword(email, code, newPassword);
        setLoading(false);
        if (res.success) {
            setStep(3); // Success state
        } else {
            setError(res.error);
        }
    };

    return (
        <div className={`min-h-[80vh] flex items-center justify-center px-4 py-20 ${isDark ? "bg-slate-950" : "bg-gray-50"}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`w-full max-w-md p-10 rounded-[2.5rem] border shadow-2xl backdrop-blur-xl transition-all ${isDark
                    ? "bg-slate-900/80 border-slate-800 shadow-black/40"
                    : "bg-white border-indigo-100"
                    }`}
            >
                <div className="text-center mb-8">
                    <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${isDark ? "bg-indigo-500/10" : "bg-indigo-50"}`}>
                        <Key className="w-8 h-8 text-indigo-500" />
                    </div>
                    <h1 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                        {step === 3 ? "Password Reset!" : "Forgot Password?"}
                    </h1>
                    <p className="text-sm text-slate-400">
                        {step === 1 && "Enter your email and we'll send you a 6-digit recovery code."}
                        {step === 2 && "Enter the code we sent to your email and your new password."}
                        {step === 3 && "Your password has been successfully updated."}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {message && step === 2 && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3 text-green-500 text-sm">
                        <CheckCircle2 size={18} />
                        {message}
                    </div>
                )}

                {step === 1 && (
                    <form onSubmit={handleSendCode} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 opacity-70">Email Address</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="name@example.com"
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition outline-none ${isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-white border-slate-200 focus:border-indigo-600"
                                        }`}
                                />
                                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition" />
                            </div>
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-500 transition disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send Recovery Code"}
                            <ArrowRight size={18} />
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleReset} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-1.5 opacity-70">6-Digit Code</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, "");
                                        if (val.length <= 6) setCode(val);
                                    }}
                                    required
                                    maxLength={6}
                                    placeholder="123456"
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition outline-none tracking-[0.5em] font-mono text-center ${isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-white border-slate-200 focus:border-indigo-600"
                                        }`}
                                />
                                <Key size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5 opacity-70">New Password</label>
                            <div className="relative group">
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    placeholder="••••••••"
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition outline-none ${isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-white border-slate-200 focus:border-indigo-600"
                                        }`}
                                />
                                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition" />
                            </div>
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-500 transition disabled:opacity-50"
                        >
                            {loading ? "Resetting..." : "Update Password"}
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <CheckCircle2 size={64} className="text-green-500" />
                        </div>
                        <Link
                            to="/login"
                            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
                        >
                            Back to Login
                        </Link>
                    </div>
                )}

                {step !== 3 && (
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                        <Link to="/login" className="text-sm font-medium text-indigo-500 hover:text-indigo-400">
                            Wait, I remember it! Back to Login
                        </Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
