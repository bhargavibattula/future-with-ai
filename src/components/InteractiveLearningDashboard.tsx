"use client";

import { useState } from "react";
import {
  BookOpen,
  Flame,
  Award,
  Volume2,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Play,
  QrCode,
  Users,
  BarChart3,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function InteractiveLearningDashboard() {
  const [activeRoleTab, setActiveRoleTab] = useState<"learner" | "instructor" | "admin">("learner");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState<"English" | "Telugu">("English");

  return (
    <section id="ecosystem" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="default" className="mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#8B7FE8]" />
          Interactive Role Experience
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E1B2E] tracking-tight">
          Explore Future With AI Roles
        </h2>
        <p className="text-base sm:text-lg text-[#6B6785] mt-3">
          Test drive the dashboard perspectives for Learners, Instructors, and Platform Admins.
        </p>

        {/* Role Switcher Pills */}
        <div className="inline-flex p-1.5 rounded-full bg-white border border-[#EAE6FE] shadow-soft-sm mt-6 gap-1">
          <button
            onClick={() => setActiveRoleTab("learner")}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${
              activeRoleTab === "learner"
                ? "bg-[#8B7FE8] text-white shadow-soft-sm"
                : "text-[#6B6785] hover:text-[#1E1B2E]"
            }`}
          >
            Learner Dashboard
          </button>
          <button
            onClick={() => setActiveRoleTab("instructor")}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${
              activeRoleTab === "instructor"
                ? "bg-[#8B7FE8] text-white shadow-soft-sm"
                : "text-[#6B6785] hover:text-[#1E1B2E]"
            }`}
          >
            Instructor Dashboard
          </button>
          <button
            onClick={() => setActiveRoleTab("admin")}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all ${
              activeRoleTab === "admin"
                ? "bg-[#8B7FE8] text-white shadow-soft-sm"
                : "text-[#6B6785] hover:text-[#1E1B2E]"
            }`}
          >
            Admin Dashboard
          </button>
        </div>
      </div>

      {/* LEARNER DASHBOARD TAB */}
      {activeRoleTab === "learner" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Top Banner Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card className="bg-white hover:border-[#8B7FE8]/40">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#6B6785]">Daily Streak</span>
                  <div className="text-2xl font-black text-[#1E1B2E] mt-1 flex items-center gap-1.5">
                    <Flame className="w-6 h-6 text-[#8B7FE8] fill-[#8B7FE8]" />
                    <span>14 Days</span>
                  </div>
                </div>
                <Badge variant="mint">Active</Badge>
              </CardContent>
            </Card>

            <Card className="bg-white hover:border-[#8B7FE8]/40">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#6B6785]">Total XP Earned</span>
                  <div className="text-2xl font-black text-[#1E1B2E] mt-1 flex items-center gap-1.5">
                    <Zap className="w-6 h-6 text-[#8B7FE8]" />
                    <span>3,420 XP</span>
                  </div>
                </div>
                <Badge variant="default">Level 8</Badge>
              </CardContent>
            </Card>

            <Card className="bg-white hover:border-[#8B7FE8]/40">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#6B6785]">AI Coins Wallet</span>
                  <div className="text-2xl font-black text-[#1E1B2E] mt-1 flex items-center gap-1.5">
                    <Award className="w-6 h-6 text-[#1E1B2E]" />
                    <span>1,850 Coins</span>
                  </div>
                </div>
                <Badge variant="pink">Wallet</Badge>
              </CardContent>
            </Card>

            <Card className="bg-white hover:border-[#8B7FE8]/40">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#6B6785]">Certificates Earned</span>
                  <div className="text-2xl font-black text-[#1E1B2E] mt-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-6 h-6 text-[#8B7FE8]" />
                    <span>4 Issued</span>
                  </div>
                </div>
                <Badge variant="default">Verified</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Active Lesson & Voice Generator Player */}
          <Card className="bg-[#FCFBFF] border-[#EAE6FE] shadow-soft-md">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <Badge variant="default" className="mb-2">
                    Interactive Lesson
                  </Badge>
                  <CardTitle>Generative AI Architecture & Fine-Tuning</CardTitle>
                  <CardDescription>
                    Module 4 • Lesson 2 of 12 • Estimated Reading Time: 8 min
                  </CardDescription>
                </div>

                {/* Multilingual Voice Switcher */}
                <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-[#EAE6FE]">
                  <button
                    onClick={() => setActiveLanguage("English")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      activeLanguage === "English"
                        ? "bg-[#8B7FE8] text-white"
                        : "text-[#6B6785]"
                    }`}
                  >
                    English Voice
                  </button>
                  <button
                    onClick={() => setActiveLanguage("Telugu")}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      activeLanguage === "Telugu"
                        ? "bg-[#8B7FE8] text-white"
                        : "text-[#6B6785]"
                    }`}
                  >
                    Telugu Voice (తెలుగు)
                  </button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* ElevenLabs Voice Simulation Player */}
              <div className="bg-white p-5 rounded-2xl border border-[#EAE6FE] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-12 h-12 rounded-2xl bg-[#8B7FE8] text-white flex items-center justify-center shadow-soft-md hover:scale-105 transition-transform"
                  >
                    {isPlayingAudio ? (
                      <span className="flex h-3.5 w-3.5 rounded-sm bg-white" />
                    ) : (
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    )}
                  </button>
                  <div>
                    <h4 className="text-sm font-bold text-[#1E1B2E] flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-[#8B7FE8]" />
                      ElevenLabs AI Voice Lesson ({activeLanguage})
                    </h4>
                    <p className="text-xs text-[#6B6785]">
                      {isPlayingAudio
                        ? "Playing audio lesson narration..."
                        : "Click play to listen to AI explanation"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#6B6785]">Playback: 1.25x</span>
                  <Button size="sm" variant="outline" className="text-xs">
                    Generate AI Notes
                  </Button>
                </div>
              </div>

              {/* Lesson Text Extract */}
              <div className="p-5 rounded-2xl bg-white border border-[#EAE6FE]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B7FE8] mb-2">
                  Lesson Summary
                </h4>
                <p className="text-sm text-[#1E1B2E] leading-relaxed">
                  Fine-tuning adjusts pre-trained transformer model parameters on domain-specific datasets using LoRA (Low-Rank Adaptation) and QLoRA. This significantly reduces GPU VRAM consumption while preserving reasoning benchmark scores.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* INSTRUCTOR DASHBOARD TAB */}
      {activeRoleTab === "instructor" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-[#D8D2FA] text-[#8B7FE8] flex items-center justify-center mb-2">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <CardTitle className="text-lg">Course Studio</CardTitle>
                <CardDescription>
                  Create modules, record AI voice scripts, and set up quizzes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Create New Course
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-[#B8E8D8] text-[#1E1B2E] flex items-center justify-center mb-2">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <CardTitle className="text-lg">Student Analytics</CardTitle>
                <CardDescription>
                  Track course completion rate, quiz pass rates, and lesson dropoffs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="mint" className="w-full">
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-[#FFC9DE] text-[#1E1B2E] flex items-center justify-center mb-2">
                  <Award className="w-5 h-5" />
                </div>
                <CardTitle className="text-lg">Quiz & Assessment Builder</CardTitle>
                <CardDescription>
                  Configure 12 question types with automated explanations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="accentPink" className="w-full">
                  Open Quiz Builder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ADMIN DASHBOARD TAB */}
      {activeRoleTab === "admin" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <CardTitle className="text-xl">Platform Overview & Security Audit</CardTitle>
                <CardDescription>
                  Role-based access control, Razorpay subscription renewals, and Cloudflare R2 audit logs.
                </CardDescription>
              </div>
              <Badge variant="default">Enterprise Super Admin</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE]">
                <span className="text-xs font-bold text-[#6B6785]">Total Registered Learners</span>
                <div className="text-2xl font-black text-[#1E1B2E] mt-1">12,480 Users</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE]">
                <span className="text-xs font-bold text-[#6B6785]">Active Subscriptions</span>
                <div className="text-2xl font-black text-[#8B7FE8] mt-1">3,120 Subscribers</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FCFBFF] border border-[#EAE6FE]">
                <span className="text-xs font-bold text-[#6B6785]">Certificates Issued</span>
                <div className="text-2xl font-black text-[#1E1B2E] mt-1">4,890 PDFs</div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
}
