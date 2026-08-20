"use client";

import { useSession, signOut as nextAuthSignOut } from "next-auth/react";

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  id?: string;
}

export function useAuth() {
  const { data: session, status } = useSession();

  // Compute active user from NextAuth session purely
  const activeUser: UserProfile | null = session?.user
    ? {
        id: session.user.id || "",
        name: session.user.name || session.user.email?.split("@")[0] || "Learner",
        email: session.user.email || "",
        avatarUrl: session.user.image || undefined,
      }
    : null;

  const logout = () => {
    nextAuthSignOut({ callbackUrl: "/login" });
  };

  return {
    user: activeUser,
    logout,
    loading: status === "loading",
  };
}
