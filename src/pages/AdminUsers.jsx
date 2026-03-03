import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Mail, Calendar, ShieldCheck, ShieldAlert, Search, RefreshCw, User as UserIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../supabase";

export default function AdminUsers() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setUsers(data || []);
        } catch (err) {
            console.error("Fetch users error:", err);
            setError("Failed to fetch users from Supabase. Ensure you've run the SQL migration.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (user.username?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`min-h-screen py-24 px-4 md:px-8 transition-all duration-500 ${isDark ? "bg-slate-950 text-slate-100" : "bg-gray-50 text-slate-900"}`}>
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-4 mb-3">
                            <div className={`p-3 rounded-2xl shadow-lg transition-colors ${isDark ? "bg-indigo-600/20 shadow-indigo-500/10" : "bg-indigo-600 shadow-indigo-600/20"}`}>
                                <Users className={isDark ? "text-indigo-400 w-6 h-6" : "text-white w-6 h-6"} />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Registered <span className="text-indigo-600 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Users</span></h1>
                        </div>
                        <p className={`text-sm md:text-base font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>Manage and view all registered accounts on Agiedus.</p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={fetchUsers}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold border transition-all active:scale-95 ${isDark
                            ? "border-slate-800 bg-slate-900 text-slate-300 hover:border-indigo-500 hover:text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50 shadow-sm"
                            }`}
                    >
                        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                        Refresh Data
                    </motion.button>
                </div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`mb-10 p-1.5 rounded-2xl border transition-all ${isDark
                        ? "bg-slate-900/50 border-slate-800 focus-within:border-indigo-500/50 focus-within:bg-slate-900 shadow-xl shadow-black/20"
                        : "bg-white border-slate-200 focus-within:border-indigo-400 shadow-lg shadow-indigo-600/5"
                        }`}
                >
                    <div className="flex items-center gap-4 px-5">
                        <Search size={20} className="text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by name, username or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 py-4 bg-transparent outline-none text-sm font-medium placeholder:text-slate-500"
                        />
                    </div>
                </motion.div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 mb-10 flex items-center gap-4"
                    >
                        <ShieldAlert size={24} />
                        <span className="font-bold text-sm">{error}</span>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`rounded-[2.5rem] border overflow-hidden transition-all ${isDark ? "bg-slate-900/40 border-slate-800 shadow-2xl shadow-black/40" : "bg-white border-slate-100 shadow-2xl shadow-indigo-600/5"
                        }`}
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className={isDark ? "bg-slate-800/30" : "bg-indigo-50/50"}>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-slate-500">User Profile</th>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Username</th>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Email</th>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Status</th>
                                    <th className="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Member Since</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y transition-colors ${isDark ? "divide-slate-800/50" : "divide-slate-100"}`}>
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan="5" className="px-8 py-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full" />
                                                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-16 text-center">
                                            <p className="text-slate-500 font-bold">No users match your search.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className={`group transition-all ${isDark ? "hover:bg-slate-800/40" : "hover:bg-indigo-50/30"}`}>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center border-2 transition-transform group-hover:scale-110 ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-indigo-100 shadow-sm"}`}>
                                                        {user.avatar ? (
                                                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-sm font-black text-indigo-500">{user.name.charAt(0).toUpperCase()}</span>
                                                        )}
                                                    </div>
                                                    <span className={`font-bold text-sm ${isDark ? "text-slate-200" : "text-slate-900"}`}>{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`text-sm font-medium ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>@{user.username || 'user'}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`flex items-center gap-2 text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                                    <Mail size={14} className="opacity-50" />
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                {user.is_verified ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                                        <ShieldCheck size={12} />
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                                        <ShieldAlert size={12} />
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-8 py-6 font-medium text-sm text-slate-500">
                                                {new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
