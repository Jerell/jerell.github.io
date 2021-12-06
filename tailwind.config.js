const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        fancy: ['Dancing Script'],
      },
      colors: {
        j: {
          yellowred: '#FFBC42',
          magenta: '#8f2d56',
          dodger: '#0496ff',
          sapphire: '#006ba6',
          mint: '#b9e3c6',
          aqua: '#59c9a5',
          blue: '#23395b',
          dark: '#110b11',
        },
      },
      zIndex: {
        negative: -1,
      },
    },
  },
  variants: {},
  plugins: [],
};
