import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Sparkles,
  Share2,
  Bookmark,
  Lightbulb,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Layers,
} from "lucide-react";
import { TOOL_BLOGS, ToolBlog } from "@/data/toolBlogs";
import ToolBlogCard from "@/components/tools/ToolBlogCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blog = TOOL_BLOGS.find((b) => b.slug === slug);

  if (!blog) {
    return {
      title: "Guide Not Found — Future.ai",
    };
  }

  return {
    title: `${blog.title} — Future.ai AI Tools Blog`,
    description: blog.excerpt,
  };
}

export default async function ToolBlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = TOOL_BLOGS.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // Related blogs from same or other categories
  const relatedBlogs = TOOL_BLOGS.filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-24 transition-colors duration-300">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/dashboard/tools"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#8B7FE8] hover:text-[#786BD6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All AI Guides</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#8B7FE8]/15 text-[#8B7FE8] border border-[#8B7FE8]/30">
              {blog.category}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body (8 cols) */}
          <article className="lg:col-span-8 space-y-8">
            {/* Article Heading */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#8B7FE8]/20 text-[#8B7FE8] border border-[#8B7FE8]/40">
                <Sparkles className="w-3.5 h-3.5" />
                {blog.category}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
                {blog.title}
              </h1>

              <p className="text-lg sm:text-xl text-[var(--foreground-secondary)] leading-relaxed">
                {blog.subtitle}
              </p>

              {/* Author & Timestamp Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-4 pb-4 border-y border-[var(--border)] text-xs sm:text-sm text-[var(--foreground-secondary)]">
                <div className="flex items-center gap-2.5 font-bold text-[var(--foreground)]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] flex items-center justify-center text-xs font-bold text-white shadow-soft-sm">
                    {blog.author.name.charAt(0)}
                  </div>
                  <div>
                    <div>{blog.author.name}</div>
                    <div className="text-[11px] font-normal text-[var(--foreground-secondary)]">
                      {blog.author.role}
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-6 bg-[var(--border)]" />

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#8B7FE8]" />
                  <span>{blog.publishedDate}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#5CBFA0]" />
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>

            {/* Main Featured Hero Image */}
            <div className="relative w-full aspect-[21/10] rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-xl">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                priority
                className="object-cover object-center brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Featured Tools Panel */}
            {blog.toolsMentioned && blog.toolsMentioned.length > 0 && (
              <div className="p-6 rounded-3xl bg-[#171424] border border-[#8B7FE8]/30 shadow-lg text-white space-y-4">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#8B7FE8] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Key AI Tools Covered in this Guide
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {blog.toolsMentioned.map((tool, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-[#100D1A] border border-white/10 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-sm text-white">{tool.name}</div>
                        <div className="text-xs text-[#A09CAE]">{tool.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Structured Content Sections */}
            <div className="space-y-10 text-base sm:text-lg leading-relaxed text-[var(--foreground)]">
              {blog.contentSections.map((section, idx) => (
                <div key={idx} id={`section-${idx}`} className="space-y-4 scroll-mt-24">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                    {section.heading}
                  </h2>

                  <p className="text-[var(--foreground-secondary)] leading-relaxed whitespace-pre-line text-base sm:text-lg">
                    {section.content}
                  </p>

                  {/* Callout Box */}
                  {section.callout && (
                    <div className="p-5 rounded-2xl bg-[#8B7FE8]/10 border-l-4 border-[#8B7FE8] flex items-start gap-3.5 text-sm sm:text-base text-[var(--foreground)]">
                      <Lightbulb className="w-5 h-5 text-[#8B7FE8] shrink-0 mt-1" />
                      <div className="leading-relaxed font-medium">
                        {section.callout.text}
                      </div>
                    </div>
                  )}

                  {/* Code Snippet */}
                  {section.codeSnippet && (
                    <div className="rounded-2xl bg-[#09080F] border border-white/10 overflow-hidden shadow-xl my-6">
                      <div className="flex items-center justify-between px-5 py-2.5 bg-[#171424] border-b border-white/10 text-xs font-mono text-[#8E8A9F]">
                        <span className="uppercase font-bold text-[#8B7FE8]">
                          {section.codeSnippet.language}
                        </span>
                        <span>{section.codeSnippet.caption || "Snippet"}</span>
                      </div>
                      <pre className="p-5 overflow-x-auto text-xs sm:text-sm font-mono text-[#A9B1D6] leading-relaxed">
                        <code>{section.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Key Takeaways */}
                  {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                    <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-3 my-6">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-[#5CBFA0] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#5CBFA0]" />
                        Key Takeaways
                      </div>
                      <ul className="space-y-2.5 text-sm sm:text-base text-[var(--foreground)]">
                        {section.keyTakeaways.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-[#5CBFA0] mt-2 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tags Footer */}
            <div className="pt-8 border-t border-[var(--border)] flex flex-wrap items-center gap-2">
              <span className="text-xs text-[var(--foreground-secondary)] font-bold uppercase tracking-wider mr-2">
                Tagged with:
              </span>
              {blog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[var(--card)] border border-[var(--border)] text-[#8B7FE8]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>

          {/* Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Table of Contents Box */}
            <div className="sticky top-28 p-6 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#8B7FE8]">
                <Layers className="w-4 h-4" />
                Table of Contents
              </div>
              <nav className="space-y-2.5 text-sm">
                {blog.contentSections.map((section, idx) => (
                  <a
                    key={idx}
                    href={`#section-${idx}`}
                    className="block text-[var(--foreground-secondary)] hover:text-[#8B7FE8] transition-colors leading-snug line-clamp-1 py-1"
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>

              <hr className="border-[var(--border)]" />

              {/* Author Bio Card */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-[var(--foreground-secondary)] uppercase tracking-wider">
                  Written by
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8B7FE8] to-[#D8D2FA] flex items-center justify-center font-bold text-white shadow-soft-sm">
                    {blog.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-[var(--foreground)]">
                      {blog.author.name}
                    </div>
                    <div className="text-xs text-[var(--foreground-secondary)]">
                      {blog.author.role}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-[var(--border)]" />

              {/* Quick Actions */}
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard/tools"
                  className="w-full text-center py-2.5 rounded-xl bg-[#8B7FE8] hover:bg-[#786BD6] text-white text-xs font-bold shadow-soft-sm transition-all"
                >
                  Explore All AI Guides
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Related Blogs Grid */}
        <section className="mt-20 pt-12 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight">
                More AI Tools & Engineering Guides
              </h2>
              <p className="text-sm text-[var(--foreground-secondary)] mt-1">
                Continue leveling up your technical AI workflows.
              </p>
            </div>
            <Link
              href="/dashboard/tools"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B7FE8] hover:underline"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedBlogs.map((b) => (
              <ToolBlogCard key={b.id} blog={b} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
