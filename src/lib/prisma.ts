import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? [
            { emit: "event", level: "error" },
            { emit: "event", level: "warn" },
          ]
        : [{ emit: "event", level: "error" }],
  });
}

// In development, use a global singleton so hot-module reloads don't spawn
// multiple PrismaClient instances. In production, create once per process.
export const prisma = global.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}

// Filter out harmless Neon serverless idle socket closure notifications
(prisma as any).$on("error", (e: { message: string }) => {
  if (e.message && e.message.includes("kind: Closed")) {
    return;
  }
  console.error("Prisma Error:", e.message || e);
});

(prisma as any).$on("warn", (e: { message: string }) => {
  console.warn("Prisma Warning:", e.message || e);
});
