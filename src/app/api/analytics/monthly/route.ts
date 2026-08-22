import { NextResponse } from "next/server";
import { getMonthlyAnalytics, resolveAuthenticatedUserId } from "@/lib/learning-journey";

export async function GET(req: Request) {
  try {
    const userId = await resolveAuthenticatedUserId(req);
    const data = await getMonthlyAnalytics(userId);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in GET /api/analytics/monthly:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch monthly analytics." },
      { status: 500 }
    );
  }
}

