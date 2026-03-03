import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Sun,
  Moon,
  Bell,
  BellOff,
  BookOpen,
  LogOut,
  CheckCircle2,
  Lock,
  Camera,
  Trash2,
  Upload,
} from "lucide-react";

const examOptions = ["General", "SAT", "GRE", "GMAT", "IELTS", "TOEFL", "MCAT", "LSAT", "ACT"];

function Section({ title, description, icon: Icon, children }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      className={`rounded-2xl border p-6 transition-colors ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
        }`}
    >
      <div className="flex items-start gap-3 mb-5">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isDark ? "bg-indigo-500/20" : "bg-indigo-50"}`}>
          <Icon className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h2 className={`font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{title}</h2>
          {description && (
            <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { user, logout, updateProfile, loading } = useAuth();
  const navigate = useNavigate();
  const isDark = theme === "dark";
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [examFocus, setExamFocus] = useState(user?.examFocus || "General");
  const [notifications, setNotifications] = useState(user?.notifications ?? true);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [avatarError, setAvatarError] = useState("");

  // Password Change state
  const { changePassword } = useAuth();
  const [passData, setPassData] = useState({ current: "", new: "", confirm: "" });
  const [passLoading, setPassLoading] = useState(false);
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");

  // Loading state
  if (loading) {
    return (
      <main className="pt-28 pb-16 min-h-screen flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl border-4 border-t-indigo-600 animate-spin ${isDark ? "border-slate-800" : "border-slate-200"}`} />
          <p className={`text-sm font-medium animate-pulse ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Loading your settings...
          </p>
        </div>
      </main>
    );
  }

  // Not logged in guard
  if (!user) {
    return (
      <main className="pt-28 pb-16 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl border p-10 max-w-md w-full text-center shadow-lg ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
            }`}
        >
          <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-5">
            <Lock className="w-8 h-8 text-indigo-500" />
          </div>
          <h1 className={`text-xl font-bold mb-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
            Sign in to access Settings
          </h1>
          <p className={`text-sm mb-6 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            You need to be logged in to view and edit your settings.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/login" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition">
              Log in
            </Link>
            <Link
              to="/signup"
              className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition ${isDark ? "border-slate-600 text-slate-300 hover:bg-slate-800" : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
            >
              Sign up
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  // ── Avatar helpers ──────────────────────────────────────────────────────────
  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarError("");

    // Validate size (max 2 MB)
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError("Image must be smaller than 2 MB.");
      return;
    }
    // Validate type
    if (!file.type.startsWith("image/")) {
      setAvatarError("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatarPreview(ev.target.result);
      setAvatarChanged(true);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setAvatarChanged(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Save ────────────────────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    if (!name.trim()) return;
    setSaving(true);

    const updates = { name: name.trim(), username: username.trim(), examFocus, notifications };
    if (avatarChanged) updates.avatar = avatarPreview; // null = remove, string = new avatar

    const result = await updateProfile(updates);
    setSaving(false);
    if (result.success) {
      setAvatarChanged(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } else {
      setSaveError(result.error);
      setTimeout(() => setSaveError(""), 5000);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess("");

    if (!passData.current || !passData.new || !passData.confirm) {
      setPassError("All fields are required.");
      return;
    }

    if (passData.new !== passData.confirm) {
      setPassError("New passwords do not match.");
      return;
    }

    if (passData.new.length < 6) {
      setPassError("New password must be at least 6 characters.");
      return;
    }

    setPassLoading(true);
    const result = await changePassword(passData.current, passData.new);
    setPassLoading(false);

    if (result.success) {
      setPassSuccess("Password updated successfully!");
      setPassData({ current: "", new: "", confirm: "" });
    } else {
      setPassError(result.error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user.name.charAt(0).toUpperCase();

  const inputBase = `w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${isDark
    ? "bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500"
    : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
    }`;

  return (
    <main className="pt-28 pb-16 min-h-screen px-4">
      <section className="max-w-2xl mx-auto space-y-6">
        {/* Heading */}
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>Settings</h1>
          <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Manage your profile, appearance and preferences.
          </p>
        </div>

        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              key="toast-success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Settings saved successfully!</span>
            </motion.div>
          )}
          {saveError && (
            <motion.div
              key="toast-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
            >
              <Lock className="w-4 h-4 shrink-0" />
              <span>{saveError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Profile + Avatar Section ── */}
        <Section title="Profile" description="Update your photo and display name" icon={User}>
          <div className="space-y-5">
            {/* Avatar picker */}
            <div className="flex items-end gap-5">
              {/* Avatar preview */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-indigo-500/20 shadow-md">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                      {initials}
                    </div>
                  )}
                </div>
                {/* Camera overlay button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-500 transition"
                  title="Upload photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarFileChange}
                />
              </div>

              {/* Upload/remove buttons */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition ${isDark
                    ? "border-slate-600 text-slate-300 hover:border-indigo-500 hover:text-indigo-400"
                    : "border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600"
                    }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload photo
                </button>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-500/10 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove photo
                  </button>
                )}
                {avatarError && (
                  <p className="text-xs text-red-500 mt-0.5">{avatarError}</p>
                )}
                <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  JPG, PNG or GIF · Max 2 MB
                </p>
              </div>
            </div>

            {/* Name + email */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputBase}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                Username
              </label>
              <div className="relative">
                <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`${inputBase} pl-8 font-mono`}
                  placeholder="username"
                />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                Email Address
              </label>
              <input
                type="email"
                value={user.email}
                readOnly
                className={`${inputBase} opacity-60 cursor-not-allowed`}
              />
            </div>
          </div>
        </Section>

        {/* Appearance / Theme */}
        <Section title="Appearance" description="Choose light or dark mode" icon={isDark ? Moon : Sun}>
          <div className="flex gap-3">
            <button
              onClick={() => setTheme("light")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition ${!isDark
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                : "text-slate-300 border-slate-600 hover:border-slate-500"
                }`}
            >
              <Sun className="w-4 h-4" /> Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition ${isDark
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                : "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
                }`}
            >
              <Moon className="w-4 h-4" /> Dark
            </button>
          </div>
        </Section>

        {/* Exam Focus */}
        <Section title="Exam Focus" description="Personalise content around your main exam goal" icon={BookOpen}>
          <div className="flex flex-wrap gap-2">
            {examOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setExamFocus(opt)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${examFocus === opt
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                  : isDark
                    ? "bg-slate-800 text-slate-300 border-slate-600 hover:border-indigo-500"
                    : "bg-white text-slate-700 border-slate-200 hover:border-indigo-400 hover:text-indigo-600"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </Section>

        {/* Notifications */}
        <Section
          title="Notifications"
          description="Control study reminders and emails"
          icon={notifications ? Bell : BellOff}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${notifications ? "bg-indigo-600" : isDark ? "bg-slate-700" : "bg-slate-300"
                }`}
              role="switch"
              aria-checked={notifications}
            >
              <motion.span
                layout
                className="inline-block w-5 h-5 rounded-full bg-white shadow"
                animate={{ x: notifications ? 22 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              {notifications ? "Notifications enabled" : "Notifications disabled"}
            </span>
          </div>
        </Section>

        {/* ── Security / Password Section ── */}
        <Section title="Security" description="Protect your account with a secure password" icon={Lock}>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            {passError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
                <Lock className="w-3 h-3" /> {passError}
              </div>
            )}
            {passSuccess && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-200/20 text-emerald-500 text-xs shadow-sm shadow-emerald-500/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {passSuccess}
              </div>
            )}

            <div>
              <label className={`block text-xs font-medium mb-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Current Password</label>
              <input
                type="password"
                value={passData.current}
                onChange={(e) => setPassData({ ...passData, current: e.target.value })}
                className={inputBase}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>New Password</label>
                <input
                  type="password"
                  value={passData.new}
                  onChange={(e) => setPassData({ ...passData, new: e.target.value })}
                  className={inputBase}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>Confirm New Password</label>
                <input
                  type="password"
                  value={passData.confirm}
                  onChange={(e) => setPassData({ ...passData, confirm: e.target.value })}
                  className={inputBase}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={passLoading}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm ${isDark
                ? "bg-slate-800 hover:bg-slate-700 text-white shadow-black/20"
                : "bg-slate-100 hover:bg-slate-200 text-slate-900 shadow-slate-200/50"
                } disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2 min-w-[160px]`}
            >
              {passLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Updating...
                </>
              ) : "Update Password"}
            </button>
          </form>
        </Section>

        {/* Save */}
        <button
          onClick={handleSaveProfile}
          disabled={saving || !name.trim()}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-[0.99] transition-all shadow-lg shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Saving…
            </span>
          ) : "Save Changes"}
        </button>

        {/* Logout section */}
        <div className={`rounded-2xl border p-6 ${isDark ? "bg-slate-900 border-red-900/40" : "bg-white border-red-100"}`}>
          <h2 className={`font-semibold mb-1 ${isDark ? "text-slate-100" : "text-slate-900"}`}>Sign out</h2>
          <p className={`text-xs mb-4 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            You will be signed out of your account on this device.
          </p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:scale-[0.98] transition-all"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </section>
    </main>
  );
}
