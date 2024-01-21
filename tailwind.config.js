/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      nav: '#4F2EE6',
      popular:'#00FF00',
      recomendacion:'#E62E8A',
      conectados:'#01E3FE',
      total: '#E67E2E',
    },
    fontFamily:{
      body:["Inknut Antiqua"],
      game:["Irish Grover"],
    },
  }},
  plugins: [],
}