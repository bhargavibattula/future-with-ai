-- Add the post-transaction wallet balance to the existing coin ledger.
ALTER TABLE "CoinTransaction"
ADD COLUMN IF NOT EXISTS "balanceAfter" INTEGER NOT NULL DEFAULT 0;
