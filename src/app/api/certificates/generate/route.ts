import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generateUniqueCertificateId,
  generateQRCodeBuffer,
  generateCertificatePDFBuffer,
  generateCertificatePNGBuffer,
  getLocalWifiIpAddress,
} from "@/lib/certificateGenerator";
import { uploadCertificateAsset } from "@/lib/storage";
import { COURSES } from "@/data/courses";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { courseId, studentName: customName, progressPercent = 100, forceRegenerate = false, appUrl: customAppUrl } = body;

    if (!courseId) {
      return NextResponse.json(
        { success: false, error: "Course ID is required." },
        { status: 400 }
      );
    }

    // Default user ID for session or fallback demo user
    const inputUserId = (body.userId || "usr_demo_learner").trim();
    const studentName = (customName || body.userName || "Shanmukha Rani").trim();

    // Ensure User record exists in Neon PostgreSQL to satisfy foreign key constraint 'Certificate_userId_fkey'
    let userRecord = await prisma.user.findFirst({
      where: {
        OR: [
          { id: inputUserId },
          { email: inputUserId },
        ],
      },
    }).catch(() => null);

    if (!userRecord) {
      const isEmail = inputUserId.includes("@");
      userRecord = await prisma.user.create({
        data: {
          email: isEmail ? inputUserId : `learner_${Date.now()}@futurewithai.com`,
          name: studentName,
          role: "Learner",
        },
      }).catch(async () => {
        return await prisma.user.findFirst();
      });
    }

    const validUserId = userRecord?.id || inputUserId;

    // Find course details
    const cleanCourseId = courseId.toLowerCase().startsWith("course-")
      ? courseId
      : `course-${courseId}`;
    const course = COURSES.find((c) => c.id === cleanCourseId || c.id.replace("course-", "") === courseId);
    
    const courseTitle = course?.title ? `${course.title} Mastery` : "AI Mastery Course";
    const courseDuration = course?.duration || "10 lessons • 5 hrs";

    // Rule: Enforce 100% course completion
    if (progressPercent < 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Certificate generation requires 100% course completion.",
        },
        { status: 400 }
      );
    }

    // Base verification URL determination:
    // In local development, if domain is empty, VirtualBox subnet 192.168.56.x, or parked futurewithai.com, auto-detect physical Wi-Fi IP so scanning QR code on phone works on local network!
    let baseDomain = (customAppUrl || process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");

    if (
      !baseDomain ||
      baseDomain.includes("futurewithai.com") ||
      baseDomain.includes("localhost") ||
      baseDomain.includes("192.168.56.")
    ) {
      const localIp = getLocalWifiIpAddress();
      if (localIp && localIp !== "localhost") {
        baseDomain = `http://${localIp}:3000`;
      } else if (!baseDomain) {
        baseDomain = "http://localhost:3000";
      }
    }

    // Rule: Check if certificate already exists (Only 1 certificate per user per course)
    const existingCert = await prisma.certificate.findFirst({
      where: {
        userId: validUserId,
        courseId: cleanCourseId,
      },
    }).catch(() => null);

    if (existingCert && !forceRegenerate) {
      return NextResponse.json({
        success: true,
        message: "Existing certificate retrieved.",
        certificate: existingCert,
      });
    }

    // Use existing Certificate ID if regenerating, or create new unique ID
    let certId = existingCert ? existingCert.certificateId : generateUniqueCertificateId();

    if (!existingCert) {
      let isUnique = false;
      let attempts = 0;

      while (!isUnique && attempts < 5) {
        attempts++;
        const check = await prisma.certificate.findUnique({
          where: { certificateId: certId },
        }).catch(() => null);
        if (!check) {
          isUnique = true;
        } else {
          certId = generateUniqueCertificateId();
        }
      }
    }

    const issuedDate = existingCert
      ? new Date(existingCert.issuedDate).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

    const verificationUrl = `${baseDomain}/verify/${certId}`;

    // 1. Generate QR Code PNG Buffer
    const qrCodeBuffer = await generateQRCodeBuffer(verificationUrl);

    // 2. Generate PDF Buffer
    const pdfBuffer = await generateCertificatePDFBuffer({
      certificateId: certId,
      studentName,
      courseTitle,
      issuedDate,
      courseDuration,
      qrCodeBuffer,
      verificationUrl,
    });

    // 3. Generate High-Res PNG Buffer
    const pngBuffer = await generateCertificatePNGBuffer({
      certificateId: certId,
      studentName,
      courseTitle,
      issuedDate,
      courseDuration,
      qrCodeBuffer,
      verificationUrl,
    });

    // 4. Upload Assets to Cloudflare R2 / Local CDN Fallback
    let qrCodeUrl = "";
    let pdfUrl = "";
    let certificateImageUrl = "";

    try {
      qrCodeUrl = await uploadCertificateAsset({
        folder: "qr",
        filename: `${certId}.png`,
        buffer: qrCodeBuffer,
        contentType: "image/png",
      });

      pdfUrl = await uploadCertificateAsset({
        folder: "pdfs",
        filename: `${certId}.pdf`,
        buffer: pdfBuffer,
        contentType: "application/pdf",
      });

      certificateImageUrl = await uploadCertificateAsset({
        folder: "images",
        filename: `${certId}.png`,
        buffer: pngBuffer,
        contentType: "image/png",
      });
    } catch (uploadErr) {
      console.error("Asset upload failed during certificate generation:", uploadErr);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to upload certificate assets. Transaction rolled back.",
        },
        { status: 500 }
      );
    }

    // 5. Store / Update Metadata in Neon PostgreSQL
    let certificateRecord: any = null;
    if (existingCert) {
      certificateRecord = await prisma.certificate.update({
        where: { id: existingCert.id },
        data: {
          studentName,
          certificateImageUrl,
          pdfUrl,
          qrCodeUrl,
          updatedAt: new Date(),
        },
      });
    } else {
      certificateRecord = await prisma.certificate.create({
        data: {
          userId: validUserId,
          courseId: cleanCourseId,
          studentName,
          courseTitle,
          certificateId: certId,
          issuedDate: new Date(),
          courseDuration,
          certificateImageUrl,
          pdfUrl,
          qrCodeUrl,
          isGenerated: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Certificate generated successfully!",
      certificate: certificateRecord,
    });
  } catch (error: any) {
    console.error("Error generating certificate:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate certificate.",
      },
      { status: 500 }
    );
  }
}
