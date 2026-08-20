import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Explicitly set root to this project directory to prevent Next.js from
    // picking up the parent directory's package-lock.json as workspace root
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
