import { NextResponse } from "next/server";
import { getUserDashboardData, resolveAuthenticatedUserId } from "@/lib/learning-journey";

export async function GET(req: Request) {
  try {
    const userId = await resolveAuthenticatedUserId(req);
    const data = await getUserDashboardData(userId);
    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error("Error in GET /api/dashboard:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch dashboard data." },
      { status: 500 }
    );
  }
}
