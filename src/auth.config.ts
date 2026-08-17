import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
      const isAdminRoute =
        nextUrl.pathname.startsWith("/admin") && nextUrl.pathname !== "/admin/login";

      if (isDashboardRoute || isAdminRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect to /login
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "Learner";
        token.coins = (user as any).coins || 0;
        token.xp = (user as any).xp || 0;
        token.twoFactorVerified = true;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
        (session.user as any).coins = token.coins as number;
        (session.user as any).xp = token.xp as number;
        (session.user as any).twoFactorVerified = token.twoFactorVerified as boolean;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
