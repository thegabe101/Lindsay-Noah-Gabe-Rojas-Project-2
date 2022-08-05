/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  // content is where we configure the paths to all of the html templates
  content: [
    "./views/**/*.{handlebars}",
    "./html/**/*.{html}",
    "./public/**/*.{js}"
  ],
  theme: {
    extend: {
      colors: {
        primary:'#ff828f',
        background: '#ffd166',
        secondary: '#ffba66',
        accent: '#ff7497',
        light: '#ffbad4'
      },
    }
  },
  plugins: [],
}
