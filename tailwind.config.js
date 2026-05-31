/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#C8102E',
          dark: '#E01535',
          light: '#FFF4F6',
        },
        navy: {
          DEFAULT: '#1A1A2E',
          dark: '#2A2A2A',
        },
        sand: {
          DEFAULT: '#F7F6F3',
          dark: '#F0EDE8',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
