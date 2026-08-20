import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type CoinTransactionType =
  | "PURCHASE"
  | "GIFT_SEND"
  | "GIFT_RECEIVE"
  | "REWARD"
  | "ADJUSTMENT";

export interface CoinOperationInput {
  amount: number;
  type: CoinTransactionType;
  reason?: string;
  referenceId?: string;
}

export interface CoinOperationResult {
  balanceAfter: number;
  transaction: Prisma.CoinTransactionGetPayload<{}>;
}

type DatabaseClient = PrismaClient | Prisma.TransactionClient;

function validateAmount(amount: number): number {
  if (!Number.isSafeInteger(amount) || amount <= 0) {
    throw new Error("Coin amount must be a positive integer.");
  }

  return amount;
}

async function getOrCreateWallet(tx: DatabaseClient, userId: string) {
  const user = await tx.user.findUnique({
    where: { id: userId },
    select: { id: true, coins: true },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const existingProgress = await tx.userProgress.findUnique({
    where: { userId },
  });

  if (existingProgress) {
    return existingProgress;
  }

  return tx.userProgress.create({
    data: {
      userId,
      totalCoins: user.coins ?? 0,
    },
  });
}

async function applyCoinChange(
  tx: DatabaseClient,
  userId: string,
  input: CoinOperationInput,
  credit: boolean,
): Promise<CoinOperationResult> {
  const amount = validateAmount(input.amount);
  const progress = await getOrCreateWallet(tx, userId);

  if (!credit && progress.totalCoins < amount) {
    throw new Error("Insufficient coins.");
  }

  const updatedCount = await tx.userProgress.updateMany({
    where: credit
      ? { userId }
      : { userId, totalCoins: { gte: amount } },
    data: {
      totalCoins: credit ? { increment: amount } : { decrement: amount },
    },
  });

  if (updatedCount.count !== 1) {
    throw new Error("Insufficient coins.");
  }

  const updatedProgress = await tx.userProgress.findUnique({
    where: { userId },
    select: { totalCoins: true },
  });

  if (!updatedProgress) {
    throw new Error("Wallet could not be updated.");
  }

  await tx.user.update({
    where: { id: userId },
    data: { coins: updatedProgress.totalCoins },
  });

  const transaction = await tx.coinTransaction.create({
    data: {
      userId,
      amount,
      type: input.type,
      balanceAfter: updatedProgress.totalCoins,
      reason: input.reason,
      referenceId: input.referenceId,
    },
  });

  return {
    balanceAfter: updatedProgress.totalCoins,
    transaction,
  };
}

export async function creditCoins(
  userId: string,
  input: CoinOperationInput,
  tx?: Prisma.TransactionClient,
): Promise<CoinOperationResult> {
  if (tx) {
    return applyCoinChange(tx, userId, input, true);
  }

  return prisma.$transaction((transaction) =>
    applyCoinChange(transaction, userId, input, true),
  );
}

export async function debitCoins(
  userId: string,
  input: CoinOperationInput,
  tx?: Prisma.TransactionClient,
): Promise<CoinOperationResult> {
  if (tx) {
    return applyCoinChange(tx, userId, input, false);
  }

  return prisma.$transaction((transaction) =>
    applyCoinChange(transaction, userId, input, false),
  );
}
