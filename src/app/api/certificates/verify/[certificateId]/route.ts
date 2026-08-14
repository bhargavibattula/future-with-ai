import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: any }
) {
  try {
    const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
    const certificateId = resolvedParams?.certificateId;

    if (!certificateId) {
      return NextResponse.json(
        { success: false, error: "Certificate ID is required." },
        { status: 400 }
      );
    }

    let certificate: any = null;
    try {
      certificate = await prisma.certificate.findUnique({
        where: { certificateId },
      });
    } catch (dbErr) {
      console.warn("DB lookup error during certificate verification:", dbErr);
    }

    if (!certificate) {
      return NextResponse.json(
        { success: false, error: "Certificate Not Found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      certificate,
    });
  } catch (error: any) {
    console.error("Error verifying certificate:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to verify certificate." },
      { status: 500 }
    );
  }
}
