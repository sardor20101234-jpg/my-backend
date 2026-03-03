// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Helper: Fetch Profile with Timeout & Auto-Repair ──────────────────
  const fetchProfileAndRepair = async (session) => {
    if (!session?.user) return { data: null, error: null };
    const userId = session.user.id;

    // 1. Create a timeout promise (5 seconds)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("DB_TIMEOUT")), 5000)
    );

    try {
      console.log(`[AuthContext] Fetching profile for ${userId}...`);
      const fetchPromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      // Race the fetch against the timeout
      const { data: profile, error: profileError } = await Promise.race([fetchPromise, timeoutPromise]);

      // 2. If profile is missing (PGRST116) or fetch failed/timed out, try to REPAIR/CREATE it
      if (!profile || (profileError && profileError.code === 'PGRST116') || profileError?.message === "DB_TIMEOUT") {
        console.log("[AuthContext] Profile missing or fetch timed out, attempting auto-repair...");
        const { data: repaired, error: repairError } = await supabase
          .from('profiles')
          .upsert({
            id: userId,
            name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || '',
            username: session.user.user_metadata?.username || 'user',
            email: session.user.email,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' })
          .select()
          .single();

        if (!repairError) {
          console.log("[AuthContext] Profile auto-repaired successfully.");
          return { data: repaired, error: null };
        }
        console.warn("[AuthContext] Profile repair failed:", repairError);
      }

      return { data: profile, error: profileError };
    } catch (err) {
      console.error("[AuthContext] Profile fetch/repair caught error:", err.message);
      return { data: null, error: err };
    }
  };

  useEffect(() => {
    // 1. Check for active session on mount
    const checkUser = async () => {
      try {
        console.log("[AuthContext] Checking session...");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (session?.user) {
          const { data: profile, error: profileError } = await fetchProfileAndRepair(session);

          if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "No rows found"
            console.warn("[AuthContext] Profile fetch error:", profileError);
          }

          setUser({
            ...session.user,
            ...(profile || {}), // Ensure profile is an object even if null
            // Map Supabase names to our frontend's expected format
            name: profile?.name || session.user.user_metadata?.name || '',
            username: profile?.username || session.user.user_metadata?.username || '',
            avatar: profile?.avatar_url || session.user.user_metadata?.avatar || null,
            examFocus: profile?.exam_focus || 'General',
            notifications: profile?.notifications ?? true,
            isVerified: !!session.user.email_confirmed_at,
            isAdmin: profile?.is_admin || false,
          });
        } else {
          console.log("[AuthContext] No active session.");
        }
      } catch (error) {
        console.error("[AuthContext] Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // 2. Listen for auth changes (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`[AuthContext] Auth event triggered: ${event}`, { userId: session?.user?.id });
      setLoading(true);

      try {
        if (session?.user) {
          const { data: profile, error: profileError } = await fetchProfileAndRepair(session);

          console.log("[AuthContext] Profile fetch/repair completed", { hasProfile: !!profile });

          if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "No rows found"
            console.warn("[AuthContext] Profile change error:", profileError);
          }

          setUser({
            ...session.user,
            ...(profile || {}), // Ensure profile is an object even if null
            name: profile?.name || session.user.user_metadata?.name || '',
            username: profile?.username || session.user.user_metadata?.username || '',
            avatar: profile?.avatar_url || null,
            examFocus: profile?.exam_focus || 'General',
            notifications: profile?.notifications ?? true,
            isVerified: !!session.user.email_confirmed_at,
            isAdmin: profile?.is_admin || false,
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("[AuthContext] onAuthStateChange callback error:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── signup ──────────────────────────────────────────────────────────────────
  const signup = async (name, username, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, username }
        }
      });

      if (error) throw error;
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // ── login ───────────────────────────────────────────────────────────────────
  const login = async (email, password) => {
    try {
      console.log("[AuthContext] login call started...");
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("[AuthContext] signInWithPassword resolved:", { hasData: !!data, error });

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error("[AuthContext] login function error:", err);
      return { success: false, error: err.message };
    }
  };

  // ── login with magic link (optional) ───────────────
  // ... can be added later

  // ── verifyEmail (Supabase handles this via link) ───────────────────────────
  const verifyEmail = async () => {
    // Supabase handles email verification via a magic link sent to the user.
    // The user clicks the link, and Supabase verifies them automatically.
    return { success: true };
  };

  // ── forgotPassword ─────────────────────────────────────────────────────────
  const forgotPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      return { success: true, message: "Check your email for the reset link!" };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // ── changePassword (for logged-in users) ──────────────────────────────────
  const changePassword = async (currentPassword, newPassword) => {
    try {
      // 1. Re-authenticate to verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) throw new Error("Current password incorrect.");

      // 2. Update to new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      return { success: true, message: "Password updated successfully!" };
    } catch (err) {
      console.error("[AuthContext] Password change failed:", err);
      return { success: false, error: err.message };
    }
  };

  // ── resetPassword ──────────────────────────────────────────────────────────
  const resetPassword = async (email, code, newPassword) => {
    try {
      // Supabase expects the user to be on the reset-password page via the link
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      return { success: true, message: "Password updated successfully!" };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // ── logout ──────────────────────────────────────────────────────────────────
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // ── updateProfile ───────────────────────────────────────────────────────────
  const updateProfile = async (updates) => {
    try {
      console.log("[AuthContext] updateProfile called with:", Object.keys(updates));

      // 1. Update auth metadata (name/username/avatar)
      const authUpdates = {};
      if (updates.name) authUpdates.name = updates.name;
      if (updates.username) authUpdates.username = updates.username;
      // Also update avatar in metadata for redundancy
      if (updates.avatar !== undefined) authUpdates.avatar = updates.avatar;

      if (Object.keys(authUpdates).length > 0) {
        console.log("[AuthContext] Updating auth metadata...");
        const { error: authError } = await supabase.auth.updateUser({ data: authUpdates });
        if (authError) console.warn("[AuthContext] Auth metadata update warning:", authError.message);
      }

      // 2. Update profiles table
      const profileUpdates = {
        updated_at: new Date().toISOString(),
      };
      if (updates.name) profileUpdates.name = updates.name;
      if (updates.username) profileUpdates.username = updates.username;
      if (updates.examFocus) profileUpdates.exam_focus = updates.examFocus;
      if (updates.notifications !== undefined) profileUpdates.notifications = updates.notifications;
      if (updates.avatar !== undefined) profileUpdates.avatar_url = updates.avatar;

      console.log("[AuthContext] Updating profiles table for ID:", user.id);
      const { error: dbError } = await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('id', user.id);

      // 3. Manually update local state REGARDLESS of DB success (since metadata was updated)
      setUser(prev => {
        const newUser = {
          ...prev,
          ...updates,
          avatar: updates.avatar !== undefined ? updates.avatar : prev.avatar,
          name: updates.name || prev.name,
          username: updates.username || prev.username,
          examFocus: updates.examFocus || prev.examFocus,
          notifications: updates.notifications !== undefined ? updates.notifications : prev.notifications,
        };
        console.log("[AuthContext] Local state updated (resilient mode):", { hasAvatar: !!newUser.avatar });
        return newUser;
      });

      if (dbError) {
        console.warn("[AuthContext] Database update failed, but metadata/local state saved:", dbError.message);
        // If it's a missing column error, tell the user through the returned error
        if (dbError.message.includes("column") && dbError.message.includes("not found")) {
          return {
            success: false,
            error: `Database mismatch: ${dbError.message}. Please run the SQL migration script to add missing columns.`
          };
        }
        throw dbError;
      }

      return { success: true };
    } catch (err) {
      console.error("[AuthContext] Profile update failed:", err);
      return { success: false, error: err.message || "Failed to save profile details." };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup, updateProfile, verifyEmail, forgotPassword, resetPassword, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
