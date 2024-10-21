/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['"Pretendard"', 'sans-serif'],
      },
      boxShadow: {
        cardShadow: '0px 0px 1px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
