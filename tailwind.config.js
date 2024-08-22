/* cSpell:disable */  

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
        "libreFranklin": ["Libre Franklin", 'sans-serif'],
        "Raleway": ["Raleway", 'sans-serif']
      },
      screens: {
        'mobile': {'max': '1024px'},
        'desktop': '1024px'
      },
      aspectRatio: {
        '9/16': "9 / 16",
        '9/12': "9 / 12"
      },
      textStrokeWidth: {
        DEFAULT: '1px',
        sm: '0.5px',
        lg: '2px',
      },
      fontWeight: {
        100: '100',
        300: '300',
        400: '400',
        500: '500',
        700: '700',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-stroke': {
          '-webkit-text-stroke': '1px black',
        },
        '.text-stroke-lg': {
          '-webkit-text-stroke': '2px black',
        },
        '.text-stroke-sm': {
          '-webkit-text-stroke': '0.5px black',
        },
      })
    },
  ],
}

