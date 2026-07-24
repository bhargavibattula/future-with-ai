"use client";

import { useState, useEffect } from "react";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}

const AUTH_STORAGE_KEY = "future_ai_user_session";

export function getStoredUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(AUTH_STORAGE_KEY);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    return null;
  }
}

export function setStoredUser(user: UserProfile) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("auth-state-change"));
  } catch (e) {
    console.error("Failed to save user session:", e);
  }
}

export function removeStoredUser() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new Event("auth-state-change"));
  } catch (e) {
    console.error("Failed to clear user session:", e);
  }
}

export function useAuth() {
  const { data: session, status } = useSession();
  const [localUser, setLocalUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLocalUser(getStoredUser());
    setLoading(false);

    const handleAuthChange = () => {
      setLocalUser(getStoredUser());
    };

    window.addEventListener("auth-state-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("auth-state-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  // Compute active user: prioritize NextAuth OAuth session if present, fallback to local session
  const activeUser: UserProfile | null = session?.user
    ? {
        name: session.user.name || session.user.email?.split("@")[0] || "Learner",
        email: session.user.email || "",
        avatarUrl: session.user.image || undefined,
      }
    : localUser;

  const login = (name: string, email: string) => {
    const profile: UserProfile = {
      name: name.trim() || email.split("@")[0],
      email: email.trim(),
    };
    setStoredUser(profile);
    setLocalUser(profile);
  };

  const logout = () => {
    removeStoredUser();
    setLocalUser(null);
    nextAuthSignOut({ callbackUrl: "/login" });
  };

  return {
    user: activeUser,
    login,
    logout,
    loading: loading || status === "loading",
  };
}
