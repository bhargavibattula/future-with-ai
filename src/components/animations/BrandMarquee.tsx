"use client";

import React from "react";
import { 
  SiGoogle, 
  SiApple, 
  SiMeta, 
  SiNetflix, 
  SiStripe, 
  SiAirbnb, 
  SiUber, 
  SiVercel, 
  SiSpotify, 
  SiTesla 
} from "react-icons/si";
import { FaAmazon } from "react-icons/fa6";

const logos = [
  { name: "Google", Icon: SiGoogle },
  { name: "Apple", Icon: SiApple },
  { name: "Meta", Icon: SiMeta },
  { name: "Amazon", Icon: FaAmazon },
  { name: "Netflix", Icon: SiNetflix },
  { name: "Stripe", Icon: SiStripe },
  { name: "Airbnb", Icon: SiAirbnb },
  { name: "Uber", Icon: SiUber },
  { name: "Vercel", Icon: SiVercel },
  { name: "Spotify", Icon: SiSpotify },
  { name: "Tesla", Icon: SiTesla },
];

export default function BrandMarquee() {
  return (
    <section className="w-full bg-[#FCFBFF] py-8 lg:py-12 border-b border-[#EAE6FE] overflow-hidden flex flex-col items-center relative">
      <div className="w-full flex flex-col items-center gap-6 lg:gap-8">
        
        {/* Trusted By Label */}
        <div className="text-center z-20">
          <p className="text-[#6B6785] text-sm lg:text-sm font-semibold uppercase tracking-widest">
            Trusted by Professionals at
          </p>
        </div>

        {/* Moving Marquee */}
        <div className="w-full overflow-hidden relative" style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
          <div className="flex items-center w-max animate-marquee-horizontal">
            {/* Double the array for seamless loop */}
            {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
              <div 
                key={`${logo.name}-${idx}`} 
                className="mx-10 sm:mx-16 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
              >
                {/* Genuine SVGs from react-icons */}
                <logo.Icon className="h-8 lg:h-10 w-auto text-[#6B6785] hover:text-[#1E1B2E] transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
