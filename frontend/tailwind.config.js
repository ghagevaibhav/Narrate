/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          "100": "#f2f4f7",
        }
      }
    },
  },
  plugins: [],
}

