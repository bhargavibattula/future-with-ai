import { Search, ShieldCheck, Zap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Search or Filter by Goal",
      description: "Select your workflow category or type natural language prompts to discover tailored AI models and tools.",
      colorBg: "#D8D2FA",
      colorText: "#8B7FE8",
      icon: Search,
    },
    {
      step: "02",
      title: "Compare Verified Metrics",
      description: "Review latency scores, monthly active users, community ratings, and exact pricing breakdowns.",
      colorBg: "#B8E8D8",
      colorText: "#1E1B2E",
      icon: ShieldCheck,
    },
    {
      step: "03",
      title: "Integrate & Accelerate",
      description: "Launch directly into your chosen app with one-click access and optimized starter prompts.",
      colorBg: "#FFC9DE",
      colorText: "#1E1B2E",
      icon: Zap,
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#F3F0FE]/50 dark:bg-[#0A0A0A] border-y border-[#EAE6FE] dark:border-white/10 py-12 sm:py-20 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B7FE8] bg-[#D8D2FA]/50 dark:bg-[#1E1933] px-3 py-1 rounded-full border border-[#D8D2FA] dark:border-white/10">
            Simple Workflow
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] mt-3 mb-3 sm:mb-4">
            How future.ai works
          </h2>
          <p className="text-xs sm:text-base text-[var(--foreground-secondary)]">
            Curated human reviews combined with real-time performance telemetry help you discover trustworthy productivity tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-[var(--card)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[var(--border)] shadow-soft-sm hover:shadow-soft-md transition-all duration-300 relative group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: item.colorBg, color: item.colorText }}
                  >
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-[#D8D2FA] dark:text-[#3B3454] group-hover:text-[#8B7FE8] transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
