/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "grey-border": "var(--grey-border)",
        "primary": "var(--primary)",
      },
      fontFamily: {
        dmSans: ["DM Sans", "sans-serif"]
      },

    },
  },
  plugins: [],
}