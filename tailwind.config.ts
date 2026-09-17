import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FBF6EE",
          dark: "#F3EADA"
        },
        saffron: {
          50: "#FFF3E6",
          100: "#FFE1C2",
          200: "#FFC688",
          300: "#F5A44E",
          400: "#E8832B",
          500: "#D3671A",
          600: "#B85212",
          700: "#963F0F",
          800: "#79320F",
          900: "#5C260C"
        },
        gold: {
          DEFAULT: "#C89A3C",
          light: "#E0C577",
          dark: "#9C7526"
        },
        temple: {
          red: "#7A1F2B",
          maroon: "#4A1620"
        },
        charcoal: {
          DEFAULT: "#211C1A",
          soft: "#332B27"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["\"Manrope\"", "Inter", "system-ui", "sans-serif"],
        devanagari: ["\"Noto Sans Devanagari\"", "\"Tiro Devanagari Marathi\"", "sans-serif"]
      },
      backgroundImage: {
        "mandala": "radial-gradient(circle at 50% 50%, rgba(200,154,60,0.08) 0%, rgba(200,154,60,0) 60%)",
        "hero-gradient": "linear-gradient(180deg, rgba(33,28,26,0.15) 0%, rgba(33,28,26,0.55) 55%, rgba(33,28,26,0.92) 100%)"
      },
      boxShadow: {
        premium: "0 20px 60px -20px rgba(33,28,26,0.35)",
        card: "0 8px 30px -12px rgba(33,28,26,0.2)"
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
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite"
      }
    }
  },
  plugins: []
} satisfies Config;
