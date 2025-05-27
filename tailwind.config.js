/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",  // <-- adicione src se estiver usando pasta src
    "./App.{js,jsx,ts,tsx}",        // <-- arquivo principal do Expo
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
