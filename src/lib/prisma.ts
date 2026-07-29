import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () =>
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? [
            { emit: "event", level: "error" },
            { emit: "event", level: "warn" },
          ]
        : [{ emit: "event", level: "error" }],
  });

export const prisma =
  globalForPrisma.prisma &&
  (globalForPrisma.prisma as any).certificate &&
  (globalForPrisma.prisma as any).promptCategory &&
  (globalForPrisma.prisma as any).milestone &&
  (globalForPrisma.prisma as any).userProgress
    ? globalForPrisma.prisma
    : createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Filter out harmless Neon serverless idle socket closure notifications ("kind: Closed")
(prisma as any).$on?.("error", (e: { message: string }) => {
  if (e.message && e.message.includes("kind: Closed")) {
    return;
  }
  console.error("Prisma Error:", e.message || e);
});

(prisma as any).$on?.("warn", (e: { message: string }) => {
  console.warn("Prisma Warning:", e.message || e);
});
