/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage:{
        navbarGradient : 'linear-gradient(270deg, #FEFEFE 0.35%, #F4F4F9 175.32%)',
      }
    },
  },
  plugins: [],
};
