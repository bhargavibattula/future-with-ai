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
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <DashboardNavbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
