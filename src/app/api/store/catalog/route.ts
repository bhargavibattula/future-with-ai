import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Seed default store items if none exist
const DEFAULT_ITEMS = [
  {
    sku: "streak-freeze",
    name: "Streak Freeze",
    description: "Protect your streak for one missed day",
    type: "consumable",
    price: 500,
  },
  {
    sku: "avatar-neon",
    name: "Avatar: Neon Mascot",
    description: "A colorful profile avatar to personalize your profile.",
    type: "avatar",
    price: 250,
  },
  {
    sku: "course-discount-10",
    name: "10% Course Discount",
    description: "Apply a 10% discount to a single paid course.",
    type: "discount",
    price: 1000,
  },
];

export async function GET() {
  try {
    // Ensure items exist (non-destructive)
    const count = await prisma.storeItem.count();
    if (count === 0) {
      for (const it of DEFAULT_ITEMS) {
        await prisma.storeItem.upsert({
          where: { sku: it.sku },
          update: {},
          create: {
            sku: it.sku,
            name: it.name,
            description: it.description,
            type: it.type,
            price: it.price,
          },
        });
      }
    }

    const items = await prisma.storeItem.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        sku: true,
        name: true,
        description: true,
        type: true,
        price: true,
        image: true,
        purchasable: true,
      },
    });

    return NextResponse.json({ items });
  } catch (err: unknown) {
    console.error("GET /api/store/catalog error:", err);
    return NextResponse.json({ items: [], error: "Failed to load store catalog." }, { status: 500 });
  }
}
