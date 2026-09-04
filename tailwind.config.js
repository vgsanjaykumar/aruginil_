/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // font-syne / font-inter are defined as plain CSS classes in
      // src/index.css (per the project's typography spec) rather than
      // here, to avoid generating a duplicate/redundant definition.

      colors: {
        "lf-brand": {
          DEFAULT: "#6D28D9",
          dark: "#4C1D95",
          accent: "#7C3AED",
          light: "#F5F3FF",
        },
        "lf-ink": {
          DEFAULT: "#0F172A",
          soft: "#64748B",
        },
        "lf-page": "#F8FAFC",
        "lf-page-alt": "#F1F5F9",
        "lf-success": "#16A34A",
        "lf-warning": "#D97706",
      },
      boxShadow: {
        "lf-card": "0 1px 2px rgba(23,23,23,0.04), 0 8px 24px -12px rgba(91,33,182,0.12)",
        "lf-cardHover": "0 4px 10px rgba(23,23,23,0.06), 0 16px 32px -12px rgba(91,33,182,0.20)",
      },
      borderRadius: {
        "lf-card": "16px",
      },
      keyframes: {
        "lf-toast-in": {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "lf-fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "lf-scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "lf-toast-in": "lf-toast-in 0.25s ease-out",
        "lf-fade-in": "lf-fade-in 0.2s ease-out",
        "lf-scale-in": "lf-scale-in 0.18s ease-out",
      },
    },
  },
  plugins: [],
};
