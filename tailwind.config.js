/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
      'red': '#F93B1D',
      'darkRed': '#DF3014',
      'green': '#45A849',
      'grey': '#DBDBDB',
      'lightGrey': '#F3F3F3',
      'darkGrey': '#808A93',
    },
    extend: {},
  },
  plugins: [],
}

