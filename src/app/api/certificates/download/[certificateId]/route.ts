import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

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
      console.warn("DB lookup error during PDF download:", dbErr);
    }

    if (!certificate || !certificate.pdfUrl) {
      return NextResponse.json(
        { success: false, error: "Certificate PDF not found." },
        { status: 404 }
      );
    }

    // If PDF URL is external (Cloudflare R2), redirect directly
    if (certificate.pdfUrl.startsWith("http://") || certificate.pdfUrl.startsWith("https://")) {
      return NextResponse.redirect(certificate.pdfUrl);
    }

    // Local file fallback download
    const localPath = path.join(process.cwd(), "public", certificate.pdfUrl);
    if (fs.existsSync(localPath)) {
      const fileBuffer = fs.readFileSync(localPath);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${certificateId}.pdf"`,
        },
      });
    }

    return NextResponse.redirect(new URL(certificate.pdfUrl, req.url));
  } catch (error: any) {
    console.error("Error downloading certificate PDF:", error);
    return NextResponse.json(
      { success: false, error: "Failed to download certificate PDF." },
      { status: 500 }
    );
  }
}
