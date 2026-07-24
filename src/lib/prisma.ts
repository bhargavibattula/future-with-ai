import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: [
      {
        emit: "event",
        level: "error",
      },
      {
        emit: "event",
        level: "warn",
      },
    ],
  });

// Filter out harmless Neon serverless idle socket closure notifications ("kind: Closed")
(prisma as any).$on("error", (e: { message: string }) => {
  if (e.message && e.message.includes("kind: Closed")) {
    return; // Quietly ignore idle serverless socket recycle
  }
  console.error("Prisma Error:", e.message || e);
});

(prisma as any).$on("warn", (e: { message: string }) => {
  console.warn("Prisma Warning:", e.message || e);
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
