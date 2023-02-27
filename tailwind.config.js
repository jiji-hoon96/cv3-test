/** @type {import('tailwindcss').Config} */
const percentageWidth = require("tailwindcss-percentage-width");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  safelist: [
    {
      pattern: /./,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [percentageWidth],
};
