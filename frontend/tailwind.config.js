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
        "slide-close": "slide-close 2.5s linear",
        "slide-open": "slide-close 2.5s linear",
      },
      keyframes: {
        "slide-close": {
          "0%": { transform: "translateX(-100%)", opacity: 0.1 },
          "15%": { transform: "translateX(-100%)", opacity: 1 },
          "30%": { transform: "translateX(0)", opacity: 1 },
          "45%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(100%)", opacity: 0.1 },
        },
        "slide-open": {
          "0%": { transform: "translateX(100%)", opacity: 0.1 },
          "15%": { transform: "translateX(0)", opacity: 1 },
          "30%": { transform: "translateX(0)", opacity: 1 },
          "45%": { transform: "translateX(-100%)", opacity: 1 },
          "100%": { transform: "translateX(-100%)", opacity: 0.1 },
        },
      },
    },
  },
};
