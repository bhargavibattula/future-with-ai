export default function AILayoffsStats() {
  return (
    <section className="w-full bg-[#FCFBFF] py-24 lg:py-32 px-6 sm:px-12 lg:px-24 border-b border-[#EAE6FE]">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Header Text */}
        <h2 className="text-2xl sm:text-3xl md:text-[38px] font-bold text-[#1E1B2E] tracking-tight leading-tight font-['Space_Grotesk']">
          55K jobs lost to AI in 2025. <span className="text-[#8B7FE8]">12x more than two years ago</span>
        </h2>
        
        <p className="mt-4 text-[17px] sm:text-lg text-[#1E1B2E] font-medium">
          AI won't replace you. Someone using AI will. Be that person.
        </p>
        
        <p className="mt-3 text-[13px] text-[#6B6785] italic font-light">
          According to PwC Global AI Barometer, Challenger Report, Layoffs.fyi and Stanford AI Index (2025–2026)
        </p>

        {/* Stats Grid */}
        <div className="mt-16 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-12">
          
          <div className="flex flex-col items-center text-center px-4">
            <span className="text-[34px] md:text-[40px] font-bold text-[#1E1B2E] mb-2 leading-none">100K+</span>
            <span className="text-[#6B6785] text-sm md:text-[15px] font-medium leading-snug max-w-[150px]">
              AI driven layoffs in 2025
            </span>
          </div>

          <div className="flex flex-col items-center text-center px-4 md:border-r border-[#EAE6FE]">
            <span className="text-[34px] md:text-[40px] font-bold text-[#1E1B2E] mb-2 leading-none">45K+</span>
            <span className="text-[#6B6785] text-sm md:text-[15px] font-medium leading-snug max-w-[150px]">
              Tech jobs cut in early 2026
            </span>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <span className="text-[34px] md:text-[40px] font-bold text-[#1E1B2E] mb-2 leading-none">56%</span>
            <span className="text-[#6B6785] text-sm md:text-[15px] font-medium leading-snug max-w-[180px]">
              Wage premium for AI-skilled workers
            </span>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <span className="text-[34px] md:text-[40px] font-bold text-[#1E1B2E] mb-2 leading-none">7.5%</span>
            <span className="text-[#6B6785] text-sm md:text-[15px] font-medium leading-snug max-w-[180px]">
              Growth in AI job postings while overall hiring fell
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
