/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#dbdbdb",
          100: "#d1d1d1",
          200: "#E8E8E8",
          300: "#DFDFDF",
          400: "#D3D3D3",
          500: "#C5C5C5",
          600: "#BDBDBD",
          700: "#979797",
        },
      },
      fontFamily: {
        default: ["Doppio One"],
      },
    },
  },
  plugins: [],
};
