import QRCode from "qrcode";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import os from "os";

export function getLocalWifiIpAddress(): string {
  try {
    const interfaces = os.networkInterfaces();
    let fallbackIp = "";
    
    for (const devName of Object.keys(interfaces)) {
      const lowerName = devName.toLowerCase();
      // Skip VirtualBox, VMware, vEthernet, Hyper-V, WSL virtual adapters
      if (
        lowerName.includes("virtual") ||
        lowerName.includes("vmware") ||
        lowerName.includes("vethernet") ||
        lowerName.includes("host-only") ||
        lowerName.includes("wsl") ||
        lowerName.includes("hyper-v")
      ) {
        continue;
      }
      
      const iface = interfaces[devName];
      if (!iface) continue;
      
      for (const alias of iface) {
        if (alias.family === "IPv4" && !alias.internal && alias.address !== "127.0.0.1") {
          // Skip VirtualBox subnet 192.168.56.x
          if (alias.address.startsWith("192.168.56.")) continue;

          // Prioritize Wi-Fi / Wireless / Ethernet physical adapters
          if (
            lowerName.includes("wi-fi") ||
            lowerName.includes("wifi") ||
            lowerName.includes("wireless") ||
            lowerName.includes("ethernet") ||
            lowerName.includes("wlan") ||
            lowerName.includes("en0")
          ) {
            return alias.address;
          }

          if (!fallbackIp) {
            fallbackIp = alias.address;
          }
        }
      }
    }
    
    if (fallbackIp) return fallbackIp;
  } catch (e) {
    // fallback
  }
  return "localhost";
}

export function generateUniqueCertificateId(): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // exclude easily confused chars
  let randomPart = "";
  for (let i = 0; i < 7; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `FWAI-2026-${randomPart}`;
}

export async function generateQRCodeBuffer(url: string): Promise<Buffer> {
  const dataUrl = await QRCode.toDataURL(url, {
    margin: 1,
    width: 250,
    color: {
      dark: "#1E1B2E",
      light: "#FFFFFF",
    },
  });

  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
  return Buffer.from(base64Data, "base64");
}

export interface CertificateDataParams {
  certificateId: string;
  studentName: string;
  courseTitle: string;
  issuedDate: string;
  courseDuration: string;
  qrCodeBuffer: Buffer;
  verificationUrl: string;
}

export async function generateCertificatePDFBuffer(
  params: CertificateDataParams
): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  // Landscape A4 dimensions in points: 841.89 x 595.28
  const width = 841.89;
  const height = 595.28;
  const page = pdfDoc.addPage([width, height]);

  const fontHelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontHelvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontHelveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Background Clean White styling: #FFFFFF
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(1, 1, 1),
  });

  // Inner Border Frame 1 - Lavender Accent (#8B7FE8)
  page.drawRectangle({
    x: 24,
    y: 24,
    width: width - 48,
    height: height - 48,
    borderColor: rgb(139 / 255, 127 / 255, 232 / 255),
    borderWidth: 2,
  });

  // Inner Border Frame 2 - Soft Gold Accent (#C5A059)
  page.drawRectangle({
    x: 30,
    y: 30,
    width: width - 60,
    height: height - 60,
    borderColor: rgb(197 / 255, 160 / 255, 89 / 255),
    borderWidth: 1,
  });

  // Top Header: FUTURE WITH AI
  page.drawText("FUTURE WITH AI", {
    x: width / 2 - 110,
    y: height - 80,
    size: 20,
    font: fontHelveticaBold,
    color: rgb(139 / 255, 127 / 255, 232 / 255), // #8B7FE8
  });

  page.drawText("CERTIFICATE OF COMPLETION", {
    x: width / 2 - 180,
    y: height - 120,
    size: 24,
    font: fontHelveticaBold,
    color: rgb(30 / 255, 27 / 255, 46 / 255), // #1E1B2E
  });

  // Sub-header text
  page.drawText("THIS IS PROUDLY PRESENTED TO", {
    x: width / 2 - 120,
    y: height - 165,
    size: 11,
    font: fontHelveticaBold,
    color: rgb(107 / 255, 103 / 255, 133 / 255),
  });

  // Student Name
  const studentNameText = params.studentName.toUpperCase();
  const studentNameWidth = fontHelveticaBold.widthOfTextAtSize(studentNameText, 28);
  page.drawText(studentNameText, {
    x: width / 2 - studentNameWidth / 2,
    y: height - 215,
    size: 28,
    font: fontHelveticaBold,
    color: rgb(30 / 255, 27 / 255, 46 / 255),
  });

  // Decorative Gold Accent Line under Name
  page.drawLine({
    start: { x: width / 2 - 140, y: height - 230 },
    end: { x: width / 2 + 140, y: height - 230 },
    thickness: 2,
    color: rgb(197 / 255, 160 / 255, 89 / 255),
  });

  // Completion statement
  const line1 = "for successfully completing 100% of the interactive curriculum for";
  page.drawText(line1, {
    x: width / 2 - fontHelvetica.widthOfTextAtSize(line1, 12) / 2,
    y: height - 265,
    size: 12,
    font: fontHelvetica,
    color: rgb(107 / 255, 103 / 255, 133 / 255),
  });

  // Course Title
  const courseText = `"${params.courseTitle}"`;
  const courseWidth = fontHelveticaBold.widthOfTextAtSize(courseText, 22);
  page.drawText(courseText, {
    x: width / 2 - courseWidth / 2,
    y: height - 305,
    size: 22,
    font: fontHelveticaBold,
    color: rgb(139 / 255, 127 / 255, 232 / 255),
  });

  // Details Grid (Issue Date, Duration, Certificate ID)
  const detailY = height - 380;
  
  // Date
  page.drawText("Issue Date:", {
    x: 80,
    y: detailY,
    size: 11,
    font: fontHelvetica,
    color: rgb(107 / 255, 103 / 255, 133 / 255),
  });
  page.drawText(params.issuedDate, {
    x: 80,
    y: detailY - 18,
    size: 13,
    font: fontHelveticaBold,
    color: rgb(30 / 255, 27 / 255, 46 / 255),
  });

  // Duration
  page.drawText("Course Length:", {
    x: 320,
    y: detailY,
    size: 11,
    font: fontHelvetica,
    color: rgb(107 / 255, 103 / 255, 133 / 255),
  });
  page.drawText(params.courseDuration, {
    x: 320,
    y: detailY - 18,
    size: 13,
    font: fontHelveticaBold,
    color: rgb(30 / 255, 27 / 255, 46 / 255),
  });

  // Certificate ID
  page.drawText("Certificate ID:", {
    x: 550,
    y: detailY,
    size: 11,
    font: fontHelvetica,
    color: rgb(107 / 255, 103 / 255, 133 / 255),
  });
  page.drawText(`#${params.certificateId}`, {
    x: 550,
    y: detailY - 18,
    size: 13,
    font: fontHelveticaBold,
    color: rgb(139 / 255, 127 / 255, 232 / 255),
  });

  // Verified Badge & QR Code
  const qrImage = await pdfDoc.embedPng(params.qrCodeBuffer);
  page.drawImage(qrImage, {
    x: width - 150,
    y: 50,
    width: 90,
    height: 90,
  });

  page.drawText("Scan to Verify Credential", {
    x: width - 165,
    y: 38,
    size: 9,
    font: fontHelveticaOblique,
    color: rgb(107 / 255, 103 / 255, 133 / 255),
  });

  // Signature Block Left
  page.drawLine({
    start: { x: 80, y: 80 },
    end: { x: 260, y: 80 },
    thickness: 1,
    color: rgb(216 / 255, 210 / 255, 250 / 255),
  });
  page.drawText("Future With AI Certification Board", {
    x: 80,
    y: 62,
    size: 10,
    font: fontHelveticaBold,
    color: rgb(30 / 255, 27 / 255, 46 / 255),
  });
  page.drawText("Verified Online Credential", {
    x: 80,
    y: 48,
    size: 9,
    font: fontHelvetica,
    color: rgb(107 / 255, 103 / 255, 133 / 255),
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

export async function generateCertificatePNGBuffer(
  params: CertificateDataParams
): Promise<Buffer> {
  const qrBase64 = params.qrCodeBuffer.toString("base64");
  const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="50%" stop-color="#FCFBFF" />
      <stop offset="100%" stop-color="#F5F2FF" />
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B7FE8" />
      <stop offset="50%" stop-color="#C5A059" />
      <stop offset="100%" stop-color="#5CBFA0" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="800" fill="url(#bg)" />

  <!-- Outer Border -->
  <rect x="30" y="30" width="1140" height="740" rx="24" fill="none" stroke="url(#borderGrad)" stroke-width="4" />
  <rect x="42" y="42" width="1116" height="716" rx="18" fill="none" stroke="#D8D2FA" stroke-width="1.5" />

  <!-- Background Grid Pattern -->
  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
    <circle cx="15" cy="15" r="1" fill="#8B7FE8" opacity="0.08" />
  </pattern>
  <rect x="45" y="45" width="1110" height="710" fill="url(#grid)" />

  <!-- Top Logo -->
  <text x="600" y="110" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="26" fill="#8B7FE8" text-anchor="middle" letter-spacing="4">FUTURE WITH AI</text>
  <text x="600" y="160" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="34" fill="#1E1B2E" text-anchor="middle" letter-spacing="2">CERTIFICATE OF COMPLETION</text>

  <!-- Subtitle -->
  <text x="600" y="220" font-family="Arial, sans-serif" font-weight="700" font-size="14" fill="#6B6785" text-anchor="middle" letter-spacing="3">THIS IS PROUDLY PRESENTED TO</text>

  <!-- Student Name -->
  <text x="600" y="290" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="44" fill="#1E1B2E" text-anchor="middle">${escapeXml(params.studentName.toUpperCase())}</text>
  <line x1="400" y1="315" x2="800" y2="315" stroke="#C5A059" stroke-width="3" stroke-linecap="round" />

  <!-- Description -->
  <text x="600" y="365" font-family="Arial, sans-serif" font-size="18" fill="#6B6785" text-anchor="middle">for successfully completing 100% of the interactive curriculum for</text>

  <!-- Course Title -->
  <text x="600" y="425" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="32" fill="#8B7FE8" text-anchor="middle">"${escapeXml(params.courseTitle)}"</text>

  <!-- Metadata Cards -->
  <g transform="translate(140, 500)">
    <rect x="0" y="0" width="260" height="80" rx="16" fill="#FCFBFF" stroke="#EAE6FE" />
    <text x="20" y="32" font-family="Arial, sans-serif" font-size="12" fill="#6B6785" font-weight="600">ISSUE DATE</text>
    <text x="20" y="60" font-family="Arial, sans-serif" font-size="18" fill="#1E1B2E" font-weight="800">${escapeXml(params.issuedDate)}</text>
  </g>

  <g transform="translate(470, 500)">
    <rect x="0" y="0" width="260" height="80" rx="16" fill="#FCFBFF" stroke="#EAE6FE" />
    <text x="20" y="32" font-family="Arial, sans-serif" font-size="12" fill="#6B6785" font-weight="600">COURSE DURATION</text>
    <text x="20" y="60" font-family="Arial, sans-serif" font-size="18" fill="#1E1B2E" font-weight="800">${escapeXml(params.courseDuration)}</text>
  </g>

  <g transform="translate(800, 500)">
    <rect x="0" y="0" width="260" height="80" rx="16" fill="#F3F0FE" stroke="#D8D2FA" />
    <text x="20" y="32" font-family="Arial, sans-serif" font-size="12" fill="#8B7FE8" font-weight="600">CERTIFICATE ID</text>
    <text x="20" y="60" font-family="Arial, sans-serif" font-size="18" fill="#8B7FE8" font-weight="800">#${escapeXml(params.certificateId)}</text>
  </g>

  <!-- Verified Badge & QR Code -->
  <g transform="translate(980, 620)">
    <image href="data:image/png;base64,${qrBase64}" x="0" y="0" width="110" height="110" />
    <text x="55" y="125" font-family="Arial, sans-serif" font-size="11" fill="#6B6785" text-anchor="middle">Scan to Verify</text>
  </g>

  <!-- Signatures -->
  <g transform="translate(140, 640)">
    <line x1="0" y1="40" x2="260" y2="40" stroke="#D8D2FA" stroke-width="2" />
    <text x="0" y="65" font-family="Arial, sans-serif" font-size="14" fill="#1E1B2E" font-weight="700">Future With AI Board</text>
    <text x="0" y="85" font-family="Arial, sans-serif" font-size="12" fill="#6B6785">Official Verifiable Credential</text>
  </g>
</svg>
`;

  return Buffer.from(svgString, "utf-8");
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
