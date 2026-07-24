import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { otpStore } from "@/lib/email";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        twoFactorCode: { label: "2FA Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const emailStr = String(credentials.email).toLowerCase().trim();
        const passwordStr = String(credentials.password);

        // 1. Fetch user from database
        const user = await prisma.user.findUnique({
          where: { email: emailStr },
        });

        if (!user || !user.password) {
          // If no password set or user doesn't exist
          return null;
        }

        // 2. Validate Password via bcrypt
        const isPasswordValid = await bcrypt.compare(passwordStr, user.password);
        if (!isPasswordValid) {
          return null;
        }

        // 3. Enforce 2FA verification step if enabled
        if (user.twoFactorEnabled) {
          const code = credentials.twoFactorCode ? String(credentials.twoFactorCode).trim() : "";

          // If no 2FA code passed yet, trigger frontend to show 2FA screen
          if (!code) {
            throw new Error("2FA_REQUIRED");
          }

          // Verify 2FA OTP code against memory store
          const stored = otpStore.get(emailStr);
          if (!stored || Date.now() > stored.expiresAt || stored.otp !== code) {
            throw new Error("INVALID_2FA_CODE");
          }

          // Clear used 2FA code
          otpStore.delete(emailStr);
        }

        return {
          id: user.id,
          name: user.name || emailStr.split("@")[0],
          email: user.email,
          role: user.role || "Learner",
          coins: user.coins || 0,
          xp: user.xp || 0,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
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
});
