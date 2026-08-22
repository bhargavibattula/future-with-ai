export default function AILayoffsStats() {
  return (
    <section className="w-full bg-[#FCFBFF] dark:bg-[#0E0C15] py-12 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-16 border-b border-[#EAE6FE] dark:border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Header Text */}
        <h2 className="text-xl sm:text-3xl md:text-[38px] font-bold text-[#1E1B2E] dark:text-white tracking-tight leading-tight font-['Space_Grotesk']">
          55K jobs lost to AI in 2025. <span className="text-[#8B7FE8]">12x more than two years ago</span>
        </h2>
        
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#1E1B2E] dark:text-[#D8D2FA] font-medium max-w-xl">
          AI won&apos;t replace you. Someone using AI will. Be that person.
        </p>
        
        <p className="mt-2 text-xs text-[#6B6785] dark:text-[#8E8A9F] italic font-light">
          According to PwC Global AI Barometer, Challenger Report, Layoffs.fyi and Stanford AI Index (2025–2026)
        </p>

        {/* Stats Grid */}
        <div className="mt-10 sm:mt-16 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          
          <div className="flex flex-col items-center text-center px-2 sm:px-4">
            <span className="text-2xl sm:text-4xl md:text-[40px] font-bold text-[#1E1B2E] dark:text-white mb-1.5 leading-none">100K+</span>
            <span className="text-[#6B6785] dark:text-[#A09CAE] text-xs sm:text-sm font-medium leading-snug">
              AI driven layoffs in 2025
            </span>
          </div>

          <div className="flex flex-col items-center text-center px-2 sm:px-4 border-l md:border-l-0 md:border-r border-[#EAE6FE] dark:border-white/10">
            <span className="text-2xl sm:text-4xl md:text-[40px] font-bold text-[#1E1B2E] dark:text-white mb-1.5 leading-none">45K+</span>
            <span className="text-[#6B6785] dark:text-[#A09CAE] text-xs sm:text-sm font-medium leading-snug">
              Tech jobs cut in early 2026
            </span>
          </div>

          <div className="flex flex-col items-center text-center px-2 sm:px-4 border-t md:border-t-0 pt-4 md:pt-0 border-[#EAE6FE] dark:border-white/10">
            <span className="text-2xl sm:text-4xl md:text-[40px] font-bold text-[#8B7FE8] mb-1.5 leading-none">56%</span>
            <span className="text-[#6B6785] dark:text-[#A09CAE] text-xs sm:text-sm font-medium leading-snug">
              Wage premium for AI-skilled workers
            </span>
          </div>

          <div className="flex flex-col items-center text-center px-2 sm:px-4 border-t md:border-t-0 border-l pt-4 md:pt-0 border-[#EAE6FE] dark:border-white/10">
            <span className="text-2xl sm:text-4xl md:text-[40px] font-bold text-[#5CBFA0] mb-1.5 leading-none">7.5%</span>
            <span className="text-[#6B6785] dark:text-[#A09CAE] text-xs sm:text-sm font-medium leading-snug">
              Growth in AI job postings
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
