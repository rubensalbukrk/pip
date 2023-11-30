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
        "gray": {
          100: "#E6E9FD",
          200: "#d3d3d3",
          600: "#6f6f6f",
          700: "#767580",
          900: "#3C3C3C"
        }
      },
      fontFamily: {
        default: ["Doppio One"],
      },
    },
  },
  plugins: [],
};
