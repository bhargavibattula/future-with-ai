"use client";

import { useState, useEffect } from "react";

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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Initial fetch
    setUser(getStoredUser());
    setLoading(false);

    // Listen for custom auth-state-change event across components
    const handleAuthChange = () => {
      setUser(getStoredUser());
    };

    window.addEventListener("auth-state-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("auth-state-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const login = (name: string, email: string) => {
    const profile: UserProfile = {
      name: name.trim() || email.split("@")[0],
      email: email.trim(),
    };
    setStoredUser(profile);
    setUser(profile);
  };

  const logout = () => {
    removeStoredUser();
    setUser(null);
  };

  return { user, login, logout, loading };
}
