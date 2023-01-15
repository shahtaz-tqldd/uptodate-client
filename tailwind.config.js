/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        darkTheme: {
          primary: "#497174",
          secondary: "#2B3A55",
          accent: "#393E46",
          neutral: "#2c3333b0",
          "base-100": "#0f1729",
          "base-content": "#D6E4E5",
          "text-color": "#fff",
        },
      },
      {
        lightTheme: {
          primary: "#2C3333",
          secondary: "#C6EBC5",
          accent: "#DBE6FD",
          neutral: "#fff",
          "base-100": "#F3EFE0",
          "base-content": "#2C3333",
          "text-color":"#000",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
