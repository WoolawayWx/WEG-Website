/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8b181a',
        secondary: '#fafafa',
        neutral: '#b6b6b4'
      },
      fontFamily: {
        "Alegreya-Sans": ['Alegreya Sans', 'sans-serif'],
        "Bebas": ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

