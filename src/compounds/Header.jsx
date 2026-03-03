import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Settings as SettingsIcon, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Courses", path: "/courses" },
  { name: "Exams", path: "/exams" },
  { name: "Pricing", path: "/pricing" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
];

// Reusable avatar component: shows photo or coloured initials fallback
const AvatarCircle = ({ user, initials, size = "sm" }) => {
  const [imgError, setImgError] = useState(false);
  const dim = size === "lg" ? "w-14 h-14 min-w-[3.5rem] text-xl" : size === "md" ? "w-9 h-9 min-w-[2.25rem] text-sm" : "w-7 h-7 min-w-[1.75rem] text-xs";

  // Reset error state when avatar changes
  useEffect(() => {
    setImgError(false);
  }, [user?.avatar]);

  // Fallback if image fails or is missing
  const showFallback = !user?.avatar || imgError;

  return (
    <div className={`${dim} rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center text-white font-bold shrink-0 shadow-inner`}>
      {showFallback ? (
        initials
      ) : (
        <img
          src={user.avatar}
          alt="User avatar"
          className="w-full h-full object-cover"
          onError={() => {
            console.error("[Avatar] Failed to load image");
            setImgError(true);
          }}
        />
      )}
    </div>
  );
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const { theme } = useTheme();
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const avatarRef = useRef(null);
  const isDark = theme === "dark";

  // Close avatar dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    setAvatarOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  const navItemClasses = ({ isActive }) =>
    `px-3 py-1.5 rounded-full text-sm font-medium transition ${isActive
      ? "bg-indigo-600 text-white shadow"
      : isDark
        ? "text-slate-200 hover:bg-slate-800 hover:text-white"
        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  const initials = user ? user.name.charAt(0).toUpperCase() : "";

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] md:w-[90%]">
        <div
          className={`backdrop-blur-md border shadow-lg rounded-2xl px-4 md:px-8 py-3 flex items-center justify-between transition-colors ${isDark
            ? "bg-slate-900/80 border-slate-700"
            : "bg-white/90 border-indigo-100"
            }`}
        >
          {/* left: hamburger + logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(true)}
              className={`inline-flex lg:hidden items-center justify-center w-9 h-9 rounded-full border text-sm transition ${isDark
                ? "border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200"
                : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                }`}
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src={Logo} alt="Agiedus logo" className="w-8 h-8 md:w-9 md:h-9 rounded-xl" />
              <span className="font-bold text-base md:text-lg lg:text-xl text-indigo-500 truncate">Agiedus</span>
            </Link>
          </div>

          {/* center nav (desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-4">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={navItemClasses}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* right: auth section */}
          <div className="hidden lg:flex items-center gap-3">
            {loading ? (
              /* Loading State: subtle pulse placeholder */
              <div className="flex items-center gap-3">
                <div className={`w-14 h-6 rounded-full animate-pulse ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
                <div className={`w-24 h-10 rounded-full animate-pulse ${isDark ? "bg-slate-800" : "bg-indigo-100"}`} />
              </div>
            ) : user ? (
              /* Logged-in: avatar + dropdown */
              <div className="relative" ref={avatarRef}>
                <button
                  onClick={() => setAvatarOpen(!avatarOpen)}
                  className="p-0.5 rounded-full transition hover:scale-105 active:scale-95"
                >
                  <AvatarCircle user={user} initials={initials} size="md" />
                </button>

                <AnimatePresence>
                  {avatarOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(10px)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className={`absolute right-0 top-12 w-56 rounded-2xl border shadow-2xl overflow-hidden z-50 ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
                        }`}
                    >
                      <div className={`px-4 py-4 border-b ${isDark ? "bg-slate-800/50 border-slate-700" : "bg-indigo-50/50 border-slate-100"}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <AvatarCircle user={user} initials={initials} size="md" />
                          <div className="min-w-0">
                            <p className={`text-sm font-bold truncate ${isDark ? "text-white" : "text-slate-900"}`}>{user.name}</p>
                            <p className="text-xs text-slate-400 truncate">@{user.username || 'user'}</p>
                          </div>
                        </div>
                        {!user.isVerified && (
                          <Link
                            to="/verify-email"
                            onClick={() => setAvatarOpen(false)}
                            className="block mt-2 px-2 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-[10px] text-yellow-600 font-bold hover:bg-yellow-500/20 transition text-center"
                          >
                            Verify your email to secure account
                          </Link>
                        )}
                      </div>

                      <div className="p-2 space-y-1">
                        <Link
                          to="/settings"
                          onClick={() => setAvatarOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${isDark ? "text-slate-200 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-50"}`}
                        >
                          <SettingsIcon className="w-4 h-4 opacity-70" /> Settings
                        </Link>

                        {user.isAdmin && (
                          <Link
                            to="/admin/users"
                            onClick={() => setAvatarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${isDark ? "text-slate-200 hover:bg-slate-800" : "text-slate-700 hover:bg-slate-50"}`}
                          >
                            <User className="w-4 h-4 opacity-70" /> User List
                          </Link>
                        )}

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                        >
                          <LogOut className="w-4 h-4" /> Log out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Logged-out: login + signup */
              <>
                <Link
                  to="/login"
                  className={`text-sm font-medium ${isDark ? "text-slate-200 hover:text-indigo-300" : "text-slate-600 hover:text-indigo-600"
                    }`}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-indigo-600 text-white shadow-md hover:bg-indigo-500"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* mobile user hint (right) */}
          <div className="lg:hidden flex items-center gap-2">
            {user ? (
              <button
                onClick={() => setMenuOpen(true)}
                className="transition hover:scale-105 active:scale-95"
              >
                <AvatarCircle user={user} initials={initials} size="sm" />
              </button>
            ) : (
              <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Menu</div>
            )}
          </div>
        </div>
      </header>

      {/* Side drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/40" />

            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className={`relative z-10 w-72 max-w-[80%] h-full border-r p-5 flex flex-col gap-4 ${isDark
                ? "bg-slate-900 border-slate-700 text-slate-100"
                : "bg-white border-slate-200 text-slate-900"
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* top: logo + close */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img src={Logo} alt="Agiedus logo" className="w-8 h-8 rounded-xl" />
                  <div className="text-sm">
                    <p className="font-semibold">Agiedus</p>
                    <p className="text-xs text-slate-400">Learn, plan and grow.</p>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User info if logged in */}
              {user && (
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${isDark ? "bg-slate-800" : "bg-indigo-50"}`}>
                  <AvatarCircle user={user} initials={initials} size="md" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                </div>
              )}

              {/* links */}
              <nav className="space-y-1 flex-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-xl text-sm font-medium ${isActive
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              <div className={`border-t pt-3 mt-3 space-y-2 ${isDark ? "border-slate-700" : "border-slate-200"}`}>
                <Link
                  to="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <SettingsIcon className="w-4 h-4" />
                  <span>Settings</span>
                </Link>

                {loading ? (
                  <div className={`w-full h-10 rounded-xl animate-pulse ${isDark ? "bg-slate-800" : "bg-slate-100"}`} />
                ) : user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                  </button>
                ) : (
                  <div className="flex gap-3 pt-1">
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 text-xs font-medium text-center px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 text-xs font-semibold text-center px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500"
                    >
                      Get started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
