/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [ "garden"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
