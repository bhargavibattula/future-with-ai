import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Toolkit.ai — Curated AI Directory & Productivity Tools",
  description:
    "Find the right AI tool for writing, coding, design, and productivity in seconds. Ranked, reviewed, and categorized directory.",
  keywords: ["AI Tools", "Productivity", "Toolkit", "Writing Assistants", "Code Generators", "AI Directory"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="min-h-screen bg-[#FCFBFF] text-[#1E1B2E] antialiased selection:bg-[#D8D2FA] selection:text-[#1E1B2E]">
        {children}
      </body>
    </html>
  );
}
