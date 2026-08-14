"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`
        relative flex items-center w-[56px] h-[30px] rounded-full p-[3px]
        transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7FE8] focus-visible:ring-offset-2
        ${isDark
          ? "bg-[#1E1B2E] border border-[#8B7FE8]/40"
          : "bg-[#E8E4FF] border border-[#D8D2FA]"
        }
      `}
    >
      {/* Sliding knob */}
      <span
        className={`
          relative flex items-center justify-center w-6 h-6 rounded-full shadow-sm
          transition-all duration-300 ease-in-out
          ${isDark
            ? "translate-x-[26px] bg-[#8B7FE8]"
            : "translate-x-0 bg-white"
          }
        `}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-white" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-[#8B7FE8]" />
        )}
      </span>

      {/* Background icon (opposite state) */}
      <span
        className={`
          absolute flex items-center justify-center
          transition-all duration-300
          ${isDark ? "left-2" : "right-2"}
        `}
      >
        {isDark ? (
          <Sun className="w-3 h-3 text-[#6B6785]" />
        ) : (
          <Moon className="w-3 h-3 text-[#9B96C0]" />
        )}
      </span>
    </button>
  );
}
