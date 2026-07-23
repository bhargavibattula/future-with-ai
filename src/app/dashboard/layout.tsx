import React from "react";
import DashboardNavbar from "@/components/DashboardNavbar";

export const metadata = {
  title: "Dashboard — Future.ai",
  description: "Your AI learning and tools dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBFF] text-[#1E1B2E] selection:bg-[#D8D2FA] selection:text-[#1E1B2E]">
      <DashboardNavbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
