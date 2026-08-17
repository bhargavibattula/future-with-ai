-- Migration: add_store_reviews_transactions (created 2026-08-17)
-- NOTE: This migration file is for review only and has NOT been applied to any database.
-- Do NOT run this against production without review. It was created per request and kept offline.

BEGIN;

-- Courses table
CREATE TABLE IF NOT EXISTS "Course" (
  "id" text PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "description" text,
  "category" text,
  "difficulty" text,
  "language" text DEFAULT 'english',
  "duration" text,
  "tags" text[],
  "image" text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS "Review" (
  "id" text PRIMARY KEY DEFAULT gen_random_uuid(),
  "courseId" text NOT NULL,
  "userId" text NOT NULL,
  "rating" integer NOT NULL,
  "text" text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_review_user FOREIGN KEY ("userId") REFERENCES "User" (id) ON DELETE CASCADE,
  CONSTRAINT fk_review_course FOREIGN KEY ("courseId") REFERENCES "Course" (id) ON DELETE CASCADE,
  CONSTRAINT uniq_review_user_course UNIQUE ("userId", "courseId")
);

CREATE INDEX IF NOT EXISTS idx_review_course ON "Review" ("courseId");
CREATE INDEX IF NOT EXISTS idx_review_user ON "Review" ("userId");

-- StoreItem table
CREATE TABLE IF NOT EXISTS "StoreItem" (
  "id" text PRIMARY KEY DEFAULT gen_random_uuid(),
  "sku" text NOT NULL UNIQUE,
  "name" text NOT NULL,
  "description" text,
  "type" text NOT NULL,
  "price" integer NOT NULL,
  "image" text,
  "metadata" jsonb,
  "purchasable" boolean NOT NULL DEFAULT true,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

-- UserItem (ownership)
CREATE TABLE IF NOT EXISTS "UserItem" (
  "id" text PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" text NOT NULL,
  "itemId" text NOT NULL,
  "quantity" integer NOT NULL DEFAULT 1,
  "grantedAt" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_useritem_user FOREIGN KEY ("userId") REFERENCES "User" (id) ON DELETE CASCADE,
  CONSTRAINT fk_useritem_item FOREIGN KEY ("itemId") REFERENCES "StoreItem" (id) ON DELETE CASCADE,
  CONSTRAINT uniq_user_item UNIQUE ("userId", "itemId")
);

CREATE INDEX IF NOT EXISTS idx_useritem_user ON "UserItem" ("userId");
CREATE INDEX IF NOT EXISTS idx_useritem_item ON "UserItem" ("itemId");

-- CoinTransaction ledger
CREATE TABLE IF NOT EXISTS "CoinTransaction" (
  "id" text PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" text NOT NULL,
  "amount" integer NOT NULL,
  "type" text NOT NULL,
  "credit" boolean NOT NULL DEFAULT false,
  "reason" text,
  "relatedId" text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_cointransaction_user FOREIGN KEY ("userId") REFERENCES "User" (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_cointransaction_user ON "CoinTransaction" ("userId");
CREATE INDEX IF NOT EXISTS idx_cointransaction_type ON "CoinTransaction" ("type");

COMMIT;

-- End of migration file
