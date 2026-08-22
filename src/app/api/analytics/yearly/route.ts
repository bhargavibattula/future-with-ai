import { NextResponse } from "next/server";
import { getYearlyAnalytics, resolveAuthenticatedUserId } from "@/lib/learning-journey";

export async function GET(req: Request) {
  try {
    const userId = await resolveAuthenticatedUserId(req);
    const data = await getYearlyAnalytics(userId);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in GET /api/analytics/yearly:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch yearly analytics." },
      { status: 500 }
    );
  }
}

