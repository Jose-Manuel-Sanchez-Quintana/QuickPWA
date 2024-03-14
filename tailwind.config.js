/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'light-gray-0': '#f5f8fa',
        'light-gray-border': '#e1e8ed',
        'light-white-0': '#ffffff',
        'quick1': '#6c8a91',
        'quick2': '#7a8d91',
        'quick3': '#586669',
        'quick4': '#222b32',
        'quick5': '#435164',
        'quick6': '#8E9EB6',
        'quick7': '#23272a',
        'quick8': '#99aab5',
        'quick9': '#2e2f33',
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
}

