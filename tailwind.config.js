/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/chatweb3.html'],
  darkMode: "class",
  theme: {
    extend: {}
  },
  plugins: [require("@tailwindcss/typography")]
};
