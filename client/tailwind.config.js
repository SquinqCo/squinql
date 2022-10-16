/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          "yellow": "#fbf8cc",
          "orange": "#fde4cf",
          "pink": "#ffcfd2",
          "magenta": "#f1c0e8",
          "purple": "#cfbaf0",
          "dark-blue": "#a3c4f3",
          "dark-turquoise": "#90dbf4",
          "turquoise": "#8eecf5",
          "emerald": "#98f5e1",
          "lime": "#b9fbc0"
        }
      }
    },
  },
  plugins: [],
}
