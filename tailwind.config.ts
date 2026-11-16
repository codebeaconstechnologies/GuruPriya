import type { Config } from "tailwindcss";

/**
 * GuruPriya design tokens — derived from the official logo (brand/logo-pack):
 *   navy   — "Guru" lettering and the G      → primary (text, headings, dark surfaces)
 *   orange — "Priya" lettering and the P     → secondary (CTAs, highlights)
 *   sun    — the sunset disc                  → warm accent
 *   sky    — the waves under the road         → cool accent (links on dark, chips)
 *   leaf   — the palm trees                   → sparing accent (nature/success)
 *
 * Legacy token names (charcoal, saffron, gold, ivory) are kept as aliases so
 * older components automatically adopt the new palette.
 */
const navy = {
  50: "#EEF4FB",
  100: "#DCE7F6",
  200: "#B6CCEB",
  300: "#86A9DA",
  400: "#4F7CC2",
  500: "#2563B5",
  600: "#1D4F96",
  700: "#163C75",
  800: "#0F2B57",
  900: "#0A1F40",
  950: "#06142B",
  DEFAULT: "#0F2B57"
};

// 600+ are darkened so white text on them meets WCAG AA (4.5:1).
const orange = {
  50: "#FFF4EC",
  100: "#FFE4D1",
  200: "#FFC6A0",
  300: "#FDA068",
  400: "#F98238",
  500: "#F26A1B",
  600: "#C44A0C",
  700: "#A33C0A",
  800: "#82300B",
  900: "#64250A",
  DEFAULT: "#F26A1B"
};

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        navy,
        orange,
        sun: { DEFAULT: "#F5A524", light: "#FAD27A", dark: "#C77F0A" },
        sky: { 50: "#E8F7FD", 100: "#C9ECFA", 300: "#6CCDF0", 500: "#12A3DD", 600: "#0B86BC", 700: "#0A6C98", DEFAULT: "#12A3DD" },
        leaf: { DEFAULT: "#2E8B3E", light: "#E7F4EA" },
        sand: { DEFAULT: "#F8F6F2", dark: "#EFEBE4" },

        // Legacy aliases → new palette
        charcoal: { DEFAULT: navy[800], soft: navy[700] },
        saffron: orange,
        gold: { DEFAULT: "#F5A524", light: "#FAD27A", dark: "#B36F06" },
        ivory: { DEFAULT: "#F8F6F2", dark: "#EFEBE4" },
        temple: { red: "#A33C0A", maroon: navy[900] }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
        devanagari: ['"Noto Sans Devanagari"', "Inter", "sans-serif"]
      },
      fontSize: {
        // Fluid display sizes — never overflow on small phones.
        "display-xl": ["clamp(2.25rem, 5.2vw + 0.5rem, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.875rem, 3.2vw + 0.6rem, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem, 1.8vw + 0.8rem, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }]
      },
      maxWidth: {
        site: "80rem"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(180deg, rgba(6,20,43,0.35) 0%, rgba(6,20,43,0.25) 40%, rgba(6,20,43,0.85) 100%)",
        "brand-sunset": "linear-gradient(135deg, #F5A524 0%, #F26A1B 55%, #C44A0C 100%)",
        "brand-ocean": "linear-gradient(135deg, #12A3DD 0%, #1D4F96 60%, #0F2B57 100%)",
        mandala: "radial-gradient(circle at 50% 50%, rgba(245,165,36,0.10) 0%, rgba(245,165,36,0) 60%)"
      },
      boxShadow: {
        premium: "0 24px 60px -24px rgba(10,31,64,0.35)",
        card: "0 10px 30px -14px rgba(10,31,64,0.22)",
        lift: "0 30px 70px -30px rgba(10,31,64,0.45)"
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        "wheel-spin": {
          to: { transform: "rotate(360deg)" }
        },
        "bus-bob": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-1.2px)" }
        },
        "dash-move": {
          to: { strokeDashoffset: "-40" }
        },
        "drift-slow": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(40px)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        "wheel-spin": "wheel-spin 0.6s linear infinite",
        "bus-bob": "bus-bob 0.45s ease-in-out infinite",
        "dash-move": "dash-move 1.2s linear infinite",
        "drift-slow": "drift-slow 30s ease-in-out infinite alternate"
      }
    }
  },
  plugins: []
} satisfies Config;
