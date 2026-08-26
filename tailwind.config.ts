import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base near-black navy, not pure black — keeps the dark theme warm
        bg: "#0B0E14",
        // Card / panel surface, one step up from bg
        surface: "#131826",
        // Hairline dividers and card borders
        line: "#262B3D",
        // Primary text — warm off-white, not stark #FFF
        ink: "#E8E6DE",
        // Secondary / muted text
        "ink-dim": "#9AA0B4",
        // Signature accent — muted brass/gold, matches Edoard's existing
        // invoice + brand identity. Deliberately not a bright yellow.
        gold: "#C9A227",
        "gold-soft": "rgba(201, 162, 39, 0.14)",
      },
      fontFamily: {
        // Set at runtime via CSS variables from next/font in app/layout.tsx
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      keyframes: {
        "nudge-x": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(6px)" },
        },
      },
      animation: {
        "nudge-x": "nudge-x 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
