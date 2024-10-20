/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['"Pretendard"', 'sans-serif'],
      },
    
      backgroundImage:{
        navbarGradient : 'linear-gradient(270deg, #FEFEFE 0.35%, #F4F4F9 175.32%)',
        applyBtn: "url('/applyButton.jpeg')",
        grayGradient : 'linear-gradient(180deg, rgba(255, 255, 255, 0.80) 36.54%, #FFF 94.71%)'
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
