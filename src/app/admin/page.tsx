"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar, { AdminTab } from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";
import Admin2FAGate from "@/components/admin/Admin2FAGate";
import AdminOverviewSection from "@/components/admin/sections/AdminOverviewSection";
import AdminUsersSection from "@/components/admin/sections/AdminUsersSection";
import AdminCoursesSection from "@/components/admin/sections/AdminCoursesSection";
import AdminRoadmapBuilderSection from "@/components/admin/sections/AdminRoadmapBuilderSection";
import AdminQuizSection from "@/components/admin/sections/AdminQuizSection";
import AdminCertificatesSection from "@/components/admin/sections/AdminCertificatesSection";
import AdminGamificationSection from "@/components/admin/sections/AdminGamificationSection";
import AdminAIManagementSection from "@/components/admin/sections/AdminAIManagementSection";
import AdminGenericSection from "@/components/admin/sections/AdminGenericSection";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [quickCreateModal, setQuickCreateModal] = useState<string | null>(null);

  // Check for admin session cookie on mount
  useEffect(() => {
    try {
      const match = document.cookie
        .split("; ")
        .find((row) => row.startsWith("future_ai_admin_session="));
      if (match) {
        setIsAuthenticated(true);
      }
    } catch (e) {
      // Cookie read fallback
    } finally {
      setLoadingCheck(false);
    }
  }, []);

  // If not authenticated as Admin, redirect to /admin/login
  useEffect(() => {
    if (!loadingCheck && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [loadingCheck, isAuthenticated, router]);

  if (loadingCheck || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAFAFF] flex items-center justify-center text-xs font-bold text-[#8B7FE8]">
        Redirecting to Admin Login...
      </div>
    );
  }

  // Active section renderer
  const renderActiveSection = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverviewSection />;
      case "users":
        return <AdminUsersSection />;
      case "courses":
        return <AdminCoursesSection />;
      case "roadmap":
        return <AdminRoadmapBuilderSection />;
      case "quizzes":
        return <AdminQuizSection />;
      case "certificates":
        return <AdminCertificatesSection />;
      case "gamification":
        return <AdminGamificationSection />;
      case "ai":
        return <AdminAIManagementSection />;
      default:
        return <AdminGenericSection tab={activeTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFF] text-[#1E1B2E] flex flex-col relative overflow-x-hidden font-sans">
      {/* Soft Ambient Radial Lighting Blobs */}
      <div className="pointer-events-none fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D8D2FA]/20 blur-[130px] z-0" />
      <div className="pointer-events-none fixed bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FFC9DE]/20 blur-[130px] z-0" />
      <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B8E8D8]/15 blur-[150px] z-0" />

      {/* Top Navbar Header */}
      <AdminNavbar
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenQuickCreate={(type) => setQuickCreateModal(type)}
      />

      {/* MAIN LAYOUT: FLOATING GLASS SIDEBAR + TAB CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="flex gap-6 items-start">
          {/* Floating Glass Sidebar */}
          <AdminSidebar
            activeTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
          />

          {/* Active Tab View Panel */}
          <div className="flex-1 w-full min-w-0">
            {renderActiveSection()}
          </div>
        </div>
      </main>
    </div>
  );
}
