/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1596px',
    },
    colors: {
      'black': '#021526',
      'blackSecondary': '#1A1A1F',
      'white': '#ffffff',
      'redPrimary': '#F93B1D',
      'darkRed': '#DF3014',
      'greenPrimary': '#45A849',
      'grey': '#DBDBDB',
      'lightGrey': '#F3F3F3',
      'darkGrey': '#808A93',
    },
    extend: {},
  },
  plugins: [flowbite.plugin()],
}

