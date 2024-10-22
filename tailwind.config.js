/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['"Pretendard"', 'sans-serif'],
      },

      backgroundImage: {
        navbarGradient:
          'linear-gradient(270deg, #FEFEFE 0.35%, #F4F4F9 175.32%)',
        grayGradient:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.80) 36.54%, #FFF 94.71%)',
      },
      boxShadow: {
        cardShadow: '0px 0px 1px rgba(0, 0, 0, 0.08)',
        emphasizeShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.12), 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
