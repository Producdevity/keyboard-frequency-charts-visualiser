/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4a90e2',
          DEFAULT: '#3a80d2',
          dark: '#2a70c2',
        },
        keyHeat: {
          low: 'hsl(240, 100%, 50%)',
          medium: 'hsl(120, 100%, 50%)',
          high: 'hsl(0, 100%, 50%)',
        },
      },
    },
  },
  plugins: [],
} 