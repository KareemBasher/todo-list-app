/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/App.js", "./src/NoteBook.jsx", "./src/Entries.jsx"],
  theme: {
    extend: {
      colors: {
        'midnight': '#201F1E',
        'lineRed': '#D71324',
        'lineBlue': '#133B56',
        'altLineRed': '#7c000a',
      },
    },
  },
  plugins: [],
}
