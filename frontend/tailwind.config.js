/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  plugins: [],
  theme: {
    extend: {
      backgroundImage: {
        'hero-background' : "url('/src/assets/TTTHero.jpg')",
      }
      // fontFamily: {
      //   sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      // },
    },
  },
}