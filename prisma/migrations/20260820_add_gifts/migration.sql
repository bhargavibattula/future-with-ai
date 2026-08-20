-- Add explicit item giftability without changing existing store items.
ALTER TABLE "StoreItem"
ADD COLUMN IF NOT EXISTS "giftable" BOOLEAN NOT NULL DEFAULT true;

CREATE TABLE IF NOT EXISTS "Gift" (
  "id" TEXT PRIMARY KEY,
  "senderId" TEXT NOT NULL,
  "recipientId" TEXT NOT NULL,
  "itemId" TEXT,
  "coinAmount" INTEGER,
  "status" TEXT NOT NULL DEFAULT 'COMPLETED',
  "senderTransactionId" TEXT,
  "recipientTransactionId" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "completedAt" TIMESTAMPTZ,
  CONSTRAINT "Gift_senderId_fkey"
    FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE CASCADE,
  CONSTRAINT "Gift_recipientId_fkey"
    FOREIGN KEY ("recipientId") REFERENCES "User" ("id") ON DELETE CASCADE,
  CONSTRAINT "Gift_itemId_fkey"
    FOREIGN KEY ("itemId") REFERENCES "StoreItem" ("id") ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "Gift_senderId_idx" ON "Gift" ("senderId");
CREATE INDEX IF NOT EXISTS "Gift_recipientId_idx" ON "Gift" ("recipientId");
CREATE INDEX IF NOT EXISTS "Gift_status_idx" ON "Gift" ("status");
CREATE INDEX IF NOT EXISTS "Gift_itemId_idx" ON "Gift" ("itemId");
