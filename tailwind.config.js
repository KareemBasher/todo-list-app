/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./src/NoteBook.jsx",
    "./src/Entries.jsx",
    "./src/SidePanel.jsx",
    "./src/MainPage.jsx",
    "./src/NotFound.jsx"],
  theme: {
    extend: {
      colors: {
        'midnight': '#201F1E',
        'paperGrey': '#FBFBF8',
        'lightGrey': '#F5F5F5',
      },
    },
  },
  plugins: [],
}
