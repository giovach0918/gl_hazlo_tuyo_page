/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marca: {
          primario: '#2E2FDC', /* Morado GL */
          negro: '#000000',
          gris: '#555555',
          crema: '#F8F5F1',
        }
      },
      fontFamily: {
        corporativa: ['Montserrat', 'sans-serif'],
        decorativa: ['Parisienne', 'cursive'],
      }
    },
  },
  plugins: [],
}
