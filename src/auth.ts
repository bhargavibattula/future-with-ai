import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "@/auth.config";

import { CredentialsSignin } from "next-auth";

class CustomAuthError extends CredentialsSignin {
  constructor(msg: string) {
    super();
    this.code = msg;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    ...authConfig.providers,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        twoFactorCode: { label: "2FA Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new CustomAuthError("Please provide both email and password.");
        }

        const emailStr = String(credentials.email).toLowerCase().trim();
        const passwordStr = String(credentials.password);

        // 1. Fetch user from database
        const user = await prisma.user.findUnique({
          where: { email: emailStr },
        });

        if (!user || !user.password) {
          throw new CustomAuthError("Invalid email or password.");
        }

        // 2. Validate Password via bcrypt
        const isPasswordValid = await bcrypt.compare(passwordStr, user.password);
        if (!isPasswordValid) {
          throw new CustomAuthError("Invalid email or password.");
        }

        // 3. Enforce 2FA verification step if enabled
        if (user.twoFactorEnabled) {
          const code = credentials.twoFactorCode ? String(credentials.twoFactorCode).trim() : "";

          // If no 2FA code passed yet, trigger frontend to show 2FA screen
          if (!code) {
            throw new CustomAuthError("Please complete the 2FA verification.");
          }

          // Verify 2FA OTP code against database
          const stored = await prisma.verificationToken.findFirst({
            where: { identifier: emailStr },
          });

          if (!stored || Date.now() > stored.expires.getTime() || stored.token !== code) {
            throw new CustomAuthError("Invalid 6-digit OTP code. Please check your email and try again.");
          }

          // Clear used 2FA code
          await prisma.verificationToken.delete({
            where: { token: stored.token },
          });
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
});
