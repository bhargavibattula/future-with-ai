import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          bg: "#0A0A0A",
          primary: "#8B7FE8",
          "primary-hover": "#9D8FEE",
          "primary-light": "#2A2540",
          "primary-soft": "#1A1830",
          accent: "#F0879B",
          "accent-soft": "#2A1520",
          mint: "#5CBFA0",
          "mint-soft": "#0E2018",
          text: "#FFFFFF",
          muted: "#808080",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        "soft-sm": "0 2px 10px rgba(139, 127, 232, 0.06)",
        "soft-md": "0 8px 30px rgba(139, 127, 232, 0.08)",
        "soft-lg": "0 20px 40px rgba(139, 127, 232, 0.12)",
        "glow-primary": "0 0 25px rgba(139, 127, 232, 0.35)",
        "glow-accent": "0 0 25px rgba(255, 201, 222, 0.4)",
        "glow-mint": "0 0 25px rgba(184, 232, 216, 0.4)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 10s ease-in-out 3s infinite",
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-15px) scale(1.03)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
