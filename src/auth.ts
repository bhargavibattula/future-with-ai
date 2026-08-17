import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  // Explicitly set JWT strategy — this is critical to prevent PrismaAdapter
  // from trying to manage database sessions for credential-based logins.
  session: { strategy: "jwt" },
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
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error("[Auth] Missing email or password in credentials");
            return null;
          }

          const emailStr = String(credentials.email).toLowerCase().trim();
          const passwordStr = String(credentials.password);

          // 1. Fetch user from database
          const user = await prisma.user.findUnique({
            where: { email: emailStr },
          });

          if (!user || !user.password) {
            console.error(`[Auth] User not found or no password set for: ${emailStr}`);
            return null;
          }

          // 2. Validate Password via bcrypt
          const isPasswordValid = await bcrypt.compare(passwordStr, user.password);
          if (!isPasswordValid) {
            console.error(`[Auth] Invalid password for: ${emailStr}`);
            return null;
          }

          // 3. Enforce 2FA verification step if enabled
          if (user.twoFactorEnabled) {
            const code = credentials.twoFactorCode ? String(credentials.twoFactorCode).trim() : "";

            if (!code) {
              console.error(`[Auth] 2FA code missing for: ${emailStr}`);
              return null;
            }

            // Verify 2FA OTP code against database
            const stored = await prisma.verificationToken.findFirst({
              where: { identifier: emailStr },
            });

            if (!stored) {
              console.error(`[Auth] No OTP found in DB for: ${emailStr}`);
              return null;
            }

            if (Date.now() > stored.expires.getTime()) {
              console.error(`[Auth] OTP expired for: ${emailStr}`);
              // Clean up expired token
              await prisma.verificationToken.delete({
                where: { token: stored.token },
              });
              return null;
            }

            if (stored.token !== code) {
              console.error(`[Auth] Invalid OTP code for: ${emailStr}`);
              return null;
            }

            // Clear used 2FA code
            await prisma.verificationToken.delete({
              where: { token: stored.token },
            });
          }

          console.log(`[Auth] Credentials login successful for: ${emailStr}`);

          return {
            id: user.id,
            name: user.name || emailStr.split("@")[0],
            email: user.email,
            role: user.role || "Learner",
            coins: user.coins || 0,
            xp: user.xp || 0,
            image: user.image,
          };
        } catch (error) {
          console.error("[Auth] Unexpected error in authorize():", error);
          return null;
        }
      },
    }),
  ],
});
