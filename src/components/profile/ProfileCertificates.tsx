"use client";

import { Award, ShieldCheck, Clock, Calendar, Download, ExternalLink, ChevronRight } from "lucide-react";
import { LovableLogo, ClaudeLogo, ChatGPTLogo } from "@/data/courses";

const MOCK_CERTIFICATES = [
  {
    id: "47SVGA4F",
    title: "MASTER OF LOVABLE",
    courseName: "Lovable",
    Logo: LovableLogo,
    date: "18 June 2026",
    length: "4 hours",
    gradient: "from-[#FFC9DE] to-[#EDF9F5]",
    iconColor: "text-[#F97316]",
    iconBg: "bg-[#F97316]"
  },
  {
    id: "92BKMD2X",
    title: "CLAUDE: DEEP DIVE",
    courseName: "Claude",
    Logo: ClaudeLogo,
    date: "05 May 2026",
    length: "5 hours",
    gradient: "from-[#F3F0FE] to-[#D8D2FA]",
    iconColor: "text-[#6B21A8]",
    iconBg: "bg-[#7E22CE]"
  },
  {
    id: "15PQRX9L",
    title: "CHATGPT AUTOMATION",
    courseName: "ChatGPT",
    Logo: ChatGPTLogo,
    date: "12 April 2026",
    length: "6 hours",
    gradient: "from-[#B8E8D8] to-[#FCFBFF]",
    iconColor: "text-[#10B981]",
    iconBg: "bg-[#10B981]"
  }
];

export default function ProfileCertificates({ username = "Learner" }: { username?: string }) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1E1B2E] tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-[#8B7FE8]" />
            Your Certificates
          </h2>
          <p className="text-sm text-[#6B6785] mt-1">
            Official credentials for your completed courses.
          </p>
        </div>
        <button className="text-sm font-bold text-[#8B7FE8] hover:text-[#786BD6] transition-colors flex items-center gap-1">
          View all <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CERTIFICATES.map((cert) => (
          <div key={cert.id} className="bg-white rounded-3xl border border-[#EAE6FE] shadow-sm overflow-hidden group hover:shadow-md transition-shadow relative">
            {/* Top Pattern Header */}
            <div className={`h-24 w-full bg-gradient-to-r ${cert.gradient} relative overflow-hidden flex items-center justify-center`}>
               <div className="absolute inset-0 bg-[radial-gradient(#1E1B2E_1px,transparent_1px)] [background-size:12px_12px] opacity-10 pointer-events-none" />
               <div className={`w-12 h-12 rounded-2xl ${cert.iconBg} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                 <cert.Logo className="w-6 h-6" />
               </div>
            </div>

            {/* Certificate Details */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Credentials Verified
                </div>
                <span className="text-xs font-mono font-medium text-[#6B6785] bg-gray-50 px-2 py-1 rounded-md border border-gray-200">
                  #{cert.id}
                </span>
              </div>

              <h3 className="text-lg font-black text-[#1E1B2E] mb-1 leading-tight uppercase">
                {cert.title}
              </h3>
              <p className="text-sm text-[#6B6785] font-medium mb-5">
                Issued to <span className="font-bold text-[#1E1B2E]">{username}</span>
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-[#6B6785]">
                  <Calendar className="w-4 h-4 mr-2 text-[#8B7FE8]" />
                  <span className="font-medium">Date of issue:</span>
                  <span className="ml-auto font-bold text-[#1E1B2E]">{cert.date}</span>
                </div>
                <div className="flex items-center text-sm text-[#6B6785]">
                  <Clock className="w-4 h-4 mr-2 text-[#8B7FE8]" />
                  <span className="font-medium">Course Length:</span>
                  <span className="ml-auto font-bold text-[#1E1B2E]">{cert.length}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#F3F0FE] text-[#8B7FE8] text-sm font-bold rounded-xl hover:bg-[#EAE6FE] transition-colors">
                  <Download className="w-4 h-4" />
                  PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border border-[#EAE6FE] text-[#1E1B2E] text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors">
                  <ExternalLink className="w-4 h-4 text-[#6B6785]" />
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
