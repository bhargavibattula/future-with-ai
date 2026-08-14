"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, Maximize } from "lucide-react";
import { PremiumButton } from "@/components/ui/PremiumButton";

interface VideoCardProps {
  title: string;
  videoUrl?: string;
  onComplete: () => void;
}

export function VideoCard({ title, videoUrl, onComplete }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[70vh] p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center mb-6"
      >
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E1B2E] dark:text-white tracking-tight">
          {title}
        </h2>
      </motion.div>

      <div className="relative w-full aspect-video bg-[#13111C] rounded-3xl overflow-hidden border border-[#2A2640] shadow-2xl mb-8 group">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            onEnded={handleEnded}
            controls={false}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1E1A30] to-[#13111C]">
            <div className="w-20 h-20 rounded-full bg-[#8B7FE8]/20 flex items-center justify-center mb-4">
              <Play className="w-10 h-10 text-[#8B7FE8] ml-2" />
            </div>
            <p className="text-[#6B6785] font-medium">Video Content Placeholder</p>
          </div>
        )}

        {/* Custom Video Controls Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all">
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
            </button>
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-[#8B7FE8] w-1/3" /> {/* Mock progress */}
            </div>
            <button className="p-2 text-white hover:text-[#8B7FE8] transition-colors">
              <Volume2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-white hover:text-[#8B7FE8] transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <PremiumButton
          size="lg"
          variant={hasEnded ? "primary" : "outline"}
          onClick={onComplete}
          className="min-w-[200px]"
        >
          Continue
        </PremiumButton>
      </motion.div>
    </div>
  );
}
