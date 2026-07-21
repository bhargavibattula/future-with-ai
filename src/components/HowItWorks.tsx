import { Search, Compass, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

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
    <section id="how-it-works" className="bg-[#F3F0FE]/50 border-y border-[#EAE6FE] py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B7FE8] bg-[#D8D2FA]/50 px-3 py-1 rounded-full border border-[#D8D2FA]">
            Simple Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B2E] mt-3 mb-4">
            How toolkit.ai works
          </h2>
          <p className="text-base text-[#6B6785]">
            Curated human reviews combined with real-time performance telemetry help you discover trustworthy productivity tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 border border-[#EAE6FE] shadow-soft-sm hover:shadow-soft-md transition-all duration-300 relative group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: item.colorBg, color: item.colorText }}
                  >
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-[#D8D2FA] group-hover:text-[#8B7FE8] transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1E1B2E] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6B6785] leading-relaxed">
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
