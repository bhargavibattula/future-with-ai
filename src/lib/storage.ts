import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

/**
 * Cloudflare R2 & Fallback Local Storage Helper
 */
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || "";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || "";
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || "";
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "future-with-ai-certificates";
const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN || process.env.CLOUDFLARE_CDN_URL || "";

const isR2Configured = Boolean(
  R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY
);

let s3Client: S3Client | null = null;
if (isR2Configured) {
  s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

export interface UploadAssetOptions {
  folder: "images" | "pdfs" | "qr";
  filename: string;
  buffer: Buffer;
  contentType: string;
}

export async function uploadCertificateAsset({
  folder,
  filename,
  buffer,
  contentType,
}: UploadAssetOptions): Promise<string> {
  const key = `certificates/${folder}/${filename}`;

  if (isR2Configured && s3Client) {
    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: key,
          Body: buffer,
          ContentType: contentType,
        })
      );

      if (R2_PUBLIC_DOMAIN) {
        const domain = R2_PUBLIC_DOMAIN.endsWith("/")
          ? R2_PUBLIC_DOMAIN.slice(0, -1)
          : R2_PUBLIC_DOMAIN;
        return `${domain}/${key}`;
      }

      return `https://${R2_BUCKET_NAME}.r2.cloudflarestorage.com/${key}`;
    } catch (err) {
      console.warn("Cloudflare R2 upload failed, using local storage fallback:", err);
    }
  }

  // Fallback: Local static storage served under /uploads/certificates/...
  try {
    const localDir = path.join(process.cwd(), "public", "uploads", "certificates", folder);
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const filePath = path.join(localDir, filename);
    fs.writeFileSync(filePath, buffer);
    return `/uploads/certificates/${folder}/${filename}`;
  } catch (fsErr) {
    console.error("Local storage fallback write error:", fsErr);
    throw new Error(`Failed to store asset ${filename}`);
  }
}
