import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#EAE6FE] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#EAE6FE]">
          {/* Col 1: Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#8B7FE8] flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-extrabold text-[#1E1B2E]">toolkit</span>
                <span className="text-xl font-extrabold text-[#8B7FE8]">.ai</span>
              </div>
            </div>
            <p className="text-xs text-[#6B6785] leading-relaxed mb-4">
              The premier AI tools directory designed with the soft, calm, and trustworthy Lavender Dream aesthetic.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#B8E8D8] border border-[#1E1B2E]/20" />
              <span className="w-3 h-3 rounded-full bg-[#FFC9DE] border border-[#1E1B2E]/20" />
              <span className="w-3 h-3 rounded-full bg-[#D8D2FA] border border-[#1E1B2E]/20" />
              <span className="w-3 h-3 rounded-full bg-[#8B7FE8] border border-[#1E1B2E]/20" />
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-sm font-bold text-[#1E1B2E] uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#6B6785]">
              <li><a href="#explore" className="hover:text-[#8B7FE8] transition-colors">Writing Assistants</a></li>
              <li><a href="#explore" className="hover:text-[#8B7FE8] transition-colors">Image Generation</a></li>
              <li><a href="#explore" className="hover:text-[#8B7FE8] transition-colors">Coding Tools</a></li>
              <li><a href="#explore" className="hover:text-[#8B7FE8] transition-colors">Productivity & Workflow</a></li>
              <li><a href="#explore" className="hover:text-[#8B7FE8] transition-colors">Video & Audio</a></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="text-sm font-bold text-[#1E1B2E] uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#6B6785]">
              <li><a href="#how-it-works" className="hover:text-[#8B7FE8] transition-colors">Documentation</a></li>
              <li><a href="#how-it-works" className="hover:text-[#8B7FE8] transition-colors">AI Benchmarks</a></li>
              <li><a href="#submit" className="hover:text-[#8B7FE8] transition-colors">Submit Your Tool</a></li>
              <li><a href="#" className="hover:text-[#8B7FE8] transition-colors">API Directory Access</a></li>
              <li><a href="#" className="hover:text-[#8B7FE8] transition-colors">Brand Assets</a></li>
            </ul>
          </div>

          {/* Col 4: Theme Palette Specs */}
          <div>
            <h4 className="text-sm font-bold text-[#1E1B2E] uppercase tracking-wider mb-4">
              Theme Palette
            </h4>
            <div className="bg-[#FCFBFF] border border-[#EAE6FE] rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#6B6785]">Background</span>
                <span className="font-mono text-[11px] font-bold text-[#1E1B2E]">#FCFBFF</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#6B6785]">Primary</span>
                <span className="font-mono text-[11px] font-bold text-[#8B7FE8]">#8B7FE8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#6B6785]">Primary light</span>
                <span className="font-mono text-[11px] font-bold text-[#D8D2FA]">#D8D2FA</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#6B6785]">Accent (Pink)</span>
                <span className="font-mono text-[11px] font-bold text-[#FFC9DE]">#FFC9DE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#6B6785]">Secondary (Mint)</span>
                <span className="font-mono text-[11px] font-bold text-[#B8E8D8]">#B8E8D8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#6B6785]">
          <p>© {new Date().getFullYear()} toolkit.ai — Lavender Dream Palette</p>
          <div className="flex items-center gap-1">
            <span>Built with Next.js, Tailwind CSS &</span>
            <Heart className="w-3.5 h-3.5 fill-[#FFC9DE] text-[#FFC9DE]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
