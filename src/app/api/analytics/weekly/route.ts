import { NextResponse } from "next/server";
import { getWeeklyAnalytics, resolveAuthenticatedUserId } from "@/lib/learning-journey";

export async function GET(req: Request) {
  try {
    const userId = await resolveAuthenticatedUserId(req);
    const data = await getWeeklyAnalytics(userId);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in GET /api/analytics/weekly:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch weekly analytics." },
      { status: 500 }
    );
  }
}

