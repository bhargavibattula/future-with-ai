"use client";

import React from "react";
import {
  CreditCard,
  BarChart3,
  Bell,
  FolderArchive,
  FileSpreadsheet,
  ShieldCheck,
  Settings,
  Layers,
  Target,
  Sparkles,
  Download,
  CheckCircle2,
} from "lucide-react";
import { AdminTab } from "../AdminSidebar";

interface AdminGenericSectionProps {
  tab: AdminTab;
}

export default function AdminGenericSection({ tab }: AdminGenericSectionProps) {
  const getTabDetails = () => {
    switch (tab) {
      case "subscriptions":
        return {
          title: "Subscriptions & Billing",
          subtitle: "Manage pricing tiers, active recurring plans, invoices, and promo coupons.",
          icon: CreditCard,
          badge: "Revenue: $128.4K",
        };
      case "analytics":
        return {
          title: "Deep Analytics & Insights",
          subtitle: "Granular metrics on user retention, course completion cohorts, and funnel drop-offs.",
          icon: BarChart3,
          badge: "Live Telemetry",
        };
      case "notifications":
        return {
          title: "Notifications & System Alerts",
          subtitle: "Broadcast push notifications, marketing emails, and in-app system messages.",
          icon: Bell,
          badge: "3 Unread Alerts",
        };
      case "media":
        return {
          title: "Media Library & Assets",
          subtitle: "Centralized storage for course videos, PDFs, exercise files, and thumbnails.",
          icon: FolderArchive,
          badge: "48.5 GB Used",
        };
      case "reports":
        return {
          title: "Export & Audit Reports",
          subtitle: "Download compliance reports, financial statements, and completion rosters in CSV/PDF.",
          icon: FileSpreadsheet,
          badge: "CSV / Excel / PDF",
        };
      case "security":
        return {
          title: "Security, Roles & Audit Logs",
          subtitle: "Configure admin roles, permissions, API token keys, and active user sessions.",
          icon: ShieldCheck,
          badge: "2FA Enforced",
        };
      case "settings":
        return {
          title: "System & Branding Settings",
          subtitle: "Custom domain, white-label branding, logo, email SMTP, and platform metadata.",
          icon: Settings,
          badge: "v2.4.0 Stable",
        };
      case "modules":
        return {
          title: "Modules & Lesson Builder",
          subtitle: "Organize unit hierarchy, lesson attachments, video uploads, and code sandboxes.",
          icon: Layers,
          badge: "142 Lessons Active",
        };
      case "assessments":
        return {
          title: "Final Assessments",
          subtitle: "Configure capstone criteria, minimum passing percentages, and verified certificates.",
          icon: Target,
          badge: "85% Pass Mark",
        };
      default:
        return {
          title: "Admin Management",
          subtitle: "Manage Future.ai platform capabilities.",
          icon: Sparkles,
          badge: "System Active",
        };
    }
  };

  const details = getTabDetails();
  const Icon = details.icon;

  return (
    <div className="space-y-6 select-none">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#F5F2FF] text-[#8B7FE8] border border-[#E8E3FF] mb-2">
            <Icon className="w-3.5 h-3.5" />
            <span>{details.badge}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1E1B2E] tracking-tight">
            {details.title}
          </h2>
          <p className="text-xs text-[#6B6785] font-medium max-w-xl">
            {details.subtitle}
          </p>
        </div>
      </div>

      {/* MODULAR SECTION PANEL CARD */}
      <div className="bg-white rounded-3xl p-8 border border-[#E8E3FF] shadow-soft text-center py-16 space-y-4 relative overflow-hidden">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-[#F5F2FF] border border-[#E8E3FF] flex items-center justify-center text-[#8B7FE8] shadow-soft-sm">
          <Icon className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-extrabold text-[#1E1B2E]">
          {details.title} Management
        </h3>

        <p className="text-xs text-[#6B6785] font-medium max-w-md mx-auto leading-relaxed">
          All platform parameters for {details.title.toLowerCase()} are active and synced across your Future.ai instance.
        </p>

        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            className="px-5 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-[#8B7FE8] hover:bg-[#786BD6] shadow-soft-sm"
          >
            Configure {details.title.split(" ")[0]} Settings
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-2xl text-xs font-bold text-[#8B7FE8] bg-[#F5F2FF] border border-[#E8E3FF]"
          >
            Export Log
          </button>
        </div>
      </div>
    </div>
  );
}
