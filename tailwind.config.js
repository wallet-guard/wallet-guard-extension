/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/dashboard.html'],
  darkMode: "class",
  theme: {
    extend: {}
  },
  plugins: [require("@tailwindcss/typography")]
};
