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

const isValidPrismaClient = (client: unknown): client is PrismaClient => {
  const c = client as Record<string, Record<string, unknown>> | undefined;
  return (
    !!c &&
    typeof c.user?.findUnique === "function" &&
    typeof c.userProgress?.findUnique === "function" &&
    typeof c.dailyActivity?.findUnique === "function" &&
    typeof c.milestone?.findUnique === "function" &&
    typeof c.achievement?.findUnique === "function"
  );
};

export const prisma = isValidPrismaClient(globalForPrisma.prisma)
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
