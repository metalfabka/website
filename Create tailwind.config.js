/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          900: '#0F172A',
          800: '#1E293B',
          400: '#94A3B8',
          100: '#F1F5F9',
        },
        industrial: {
          DEFAULT: '#FF5A1F',
          hover: '#E04E1A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Big Shoulders Display', 'sans-serif'],
      }
    },
  },
  plugins: [],
}