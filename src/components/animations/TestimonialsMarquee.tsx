"use client";

import { useMemo } from "react";
import { X } from "lucide-react";

interface Testimonial {
  id: string;
  avatar: string;
  username: string;
  handle: string;
  review: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/150?img=68",
    username: "Sarah Chen",
    handle: "@sarah_codes",
    review: "Toolkit.ai has become the ultimate directory for my team. This level of curation doesn't exist anywhere else. Saved us hours of research.",
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/150?img=11",
    username: "Marcus Rodriguez",
    handle: "@mrodriguez",
    review: "Everything about this is next level. The categories, the detailed tool insights, and the learning paths. Absolutely incredible.",
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/150?img=33",
    username: "Elena V.",
    handle: "@elena_dev",
    review: "A stellar collection of AI tools to make your workflow shine. I use it daily to find exactly what I need for my projects ✨",
  },
  {
    id: "4",
    avatar: "https://i.pravatar.cc/150?img=12",
    username: "David Kim",
    handle: "@davidk_ai",
    review: "Just discovered Toolkit.ai — a sleek, minimal, and super dev-friendly AI directory. Clean UI, easy to use, and perfect for modern stacks.",
  },
  {
    id: "5",
    avatar: "https://i.pravatar.cc/150?img=47",
    username: "Jessica Walsh",
    handle: "@jessbuilds",
    review: "Have you heard of Toolkit.ai? The team has lovingly put together a collection of the best AI models and tools. It's my new homepage.",
  },
  {
    id: "6",
    avatar: "https://i.pravatar.cc/150?img=59",
    username: "Tom Becker",
    handle: "@tom_b",
    review: "Literally the coolest AI library on the internet right now —",
  },
  {
    id: "7",
    avatar: "https://i.pravatar.cc/150?img=32",
    username: "Amir Patel",
    handle: "@amir_patel",
    review: "Really impressed by the platform. Check it out. The heatmap streak feature keeps me coming back to learn more every day.",
  },
  {
    id: "8",
    avatar: "https://i.pravatar.cc/150?img=44",
    username: "Nina S.",
    handle: "@ninascript",
    review: "Got to know about Toolkit.ai and its just wow, the tools are incredibly well organized! Really loved the overall feel and quality.",
  },
  {
    id: "9",
    avatar: "https://i.pravatar.cc/150?img=15",
    username: "Leo Messi",
    handle: "@leo_dev",
    review: "The next big AI hub is emerging this year 👀 It's sleek, fast, and constantly updated.",
  }
];

export default function TestimonialsMarquee({ testimonials = defaultTestimonials }: { testimonials?: Testimonial[] }) {
  // Split testimonials into 3 columns
  const col1 = useMemo(() => testimonials.filter((_, i) => i % 3 === 0), [testimonials]);
  const col2 = useMemo(() => testimonials.filter((_, i) => i % 3 === 1), [testimonials]);
  const col3 = useMemo(() => testimonials.filter((_, i) => i % 3 === 2), [testimonials]);

  return (
    <section className="relative w-full bg-[#FCFBFF] py-24 overflow-hidden border-t border-[#EAE6FE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl lg:text-5xl font-[var(--font-display)] font-bold text-[#1E1B2E] mb-16 tracking-tight text-center">
          Loved by developers
        </h2>

        {/* Marquee Container with Masking */}
        <div className="relative h-[650px] lg:h-[800px] w-full flex gap-6 overflow-hidden marquee-container"
             style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)" }}>
          
          {/* Column 1 (Up) */}
          <div className="flex-1 overflow-hidden relative">
            <div className="flex flex-col gap-6 animate-marquee-up absolute top-0 left-0 w-full">
              {/* Duplicate array for seamless loop */}
              {[...col1, ...col1].map((t, idx) => (
                <TestimonialCard key={`${t.id}-c1-${idx}`} testimonial={t} />
              ))}
            </div>
          </div>

          {/* Column 2 (Down) - Hidden on Mobile */}
          <div className="flex-1 overflow-hidden relative hidden md:block">
            <div className="flex flex-col gap-6 animate-marquee-down absolute top-0 left-0 w-full">
              {[...col2, ...col2].map((t, idx) => (
                <TestimonialCard key={`${t.id}-c2-${idx}`} testimonial={t} />
              ))}
            </div>
          </div>

          {/* Column 3 (Up) - Hidden on Tablet & Mobile */}
          <div className="flex-1 overflow-hidden relative hidden lg:block">
            <div className="flex flex-col gap-6 animate-marquee-up absolute top-0 left-0 w-full" style={{ animationDuration: '42s' }}>
              {[...col3, ...col3].map((t, idx) => (
                <TestimonialCard key={`${t.id}-c3-${idx}`} testimonial={t} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-[16px] p-6 border border-[#EAE6FE] shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-[#8B7FE8]/50 hover:shadow-[0_8px_30px_rgba(139,127,232,0.12)] flex flex-col gap-4 transform-gpu">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.username}
            className="w-10 h-10 rounded-full object-cover border border-[#EAE6FE]"
            loading="lazy"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#1E1B2E]">
              {testimonial.handle}
            </span>
          </div>
        </div>
        <button className="text-[#A39DBB] hover:text-[#1E1B2E] transition-colors p-1 rounded-md hover:bg-[#F3F0FE]">
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="text-[#6B6785] text-[15px] leading-relaxed font-medium">
        {testimonial.review}
      </p>
    </div>
  );
}
