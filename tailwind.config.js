// const { require } = require('yargs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./old_src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: [
      "light",
      "cupcake",
      "dark",
      "retro",
      "black",
      "coffee",
      "night",
      "sunset",
      "business",
      "forest",
      "cmyk",
      "luxury",
      "dracula",
      "lemonade",
    ]
  }
}
