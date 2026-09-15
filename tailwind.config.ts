import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff5f8",
          100: "#ffe9f1",
          200: "#ffd3e3",
          300: "#ffb0cc",
          400: "#ff82ac",
          500: "#f9578c",
          600: "#e83a72",
          700: "#c2265a",
          800: "#a1214c",
          900: "#872043",
        },
        cream: "#fffaf7",
        petal: "#fdeef4",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(233, 58, 114, 0.12)",
        "glass-lg": "0 20px 60px -12px rgba(233, 58, 114, 0.22)",
        glow: "0 0 40px -8px rgba(249, 87, 140, 0.55)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-30px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "80%, 100%": { transform: "scale(1.25)", opacity: "0" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 12s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        "pulse-ring": "pulse-ring 3s cubic-bezier(0.24, 0, 0.38, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
