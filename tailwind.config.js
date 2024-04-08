/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "quick-green-0": "#00bf62",
        "light-gray-0": "#f7f7f7",
        "light-gray-1": "#f2f2f2",
        "light-gray-2": "#e6e6e6",
        "light-gray-3": "#d9d9d9",
        "light-gray-4": "#bfbfbf",
        "light-gray-5": "#999999",
        "light-warning-3": "#ff9966",
        "light-error-0": "#fee6e6",
        "light-error-1": "#fecaca",
        "light-error-2": "#fdb4b4",
        "light-error-3": "#fd9b9b",
        "light-error-10": "#ff0000",
        "light-gray-border": "#e1e8ed",
        "light-white-0": "#ffffff",
        "light-gray-text-0": "#728089",
        quick2: "#7a8d91",
        quick3: "#586669",
        quick4: "#222b32",
        quick5: "#435164",
        quick6: "#8E9EB6",
        quick7: "#23272a",
        quick8: "#99aab5",
        quick9: "#2e2f33",
      },
      height: {
        "navbar-height": "4rem",
      },
      width: {
        "navbar-height": "4rem",
      },
      inset: {
        "navbar-height": "4rem",
      },
      backgroundImage: {
        "light-pattern": "url(/texture-test.png)",
        "profile-banner": "url(/bg.png)",
      },
      screens: {
        md: "940px",
      },
      boxShadow: {
        "navbar-shadow": "-1px 1px 2px 0px rgba(179,179,179,0.72)",
      },
      keyframes: {
        slide_down: {
          "0%": {
            transform: "translateY(0px)",
          },

          "100%": {
            transform: "translateY(calc(100%))",
          },
        },
        slide_up: {
          "0%": {
            transform: "translateY(calc(100%))",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
      },
      animation: {
        slide_down: "slide_down 0.2s ease-out forwards",
        slide_up: "slide_up 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(transparent|current|white|purple|midnight|metal|tahiti|silver|bermuda)/,
    },
  ],
};
