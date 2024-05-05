/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "poppins-regular": ["poppins", "sans-serif"],
        "cursive-regular": ["cursive", "sans-serif"],
        "poor-story": ["poorStory", "sans-serif"],
      },
    },
  },
  plugins: [],
};
