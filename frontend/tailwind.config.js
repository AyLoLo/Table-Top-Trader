/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  plugins: [],
  theme: {
    extend: {
      backgroundImage: {
        "hero-background": "url('/src/assets/TTTHero.jpg')",
      },
      animation: {
        "slide-close": "slide-close 1s linear",
        "slide-open": "slide-open 1s linear",
      },
      keyframes: {
        "slide-open": {
          "0%": {
            right: "-100%",
          },
          "100%": {
            right: "0",
          },
        },
        "slide-close": {
          "0%": { right: "0px" },
          "100%": { right: "-100%" },
        },
      },
    },
  },
};
