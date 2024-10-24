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
        profileMenuGradient:
        'linear-gradient(0deg, var(--grey, #F4F4F9) 0%, var(--grey, #F4F4F9) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%), url(<path-to-image>)',
        profilePageGradient:
        'linear-gradient(180deg, #FEF387 0.01%, #FFF 46.31%)',
      },
      boxShadow: {
        cardShadow: '0px 0px 1px rgba(0, 0, 0, 0.08)',
        emphasizeShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.12), 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)',
        bottomSheetShadow: '0px -4px 24px rgba(3.67, 21.75, 48.87, 0.25)',
        yellowShadow:
        '0px 218px 61px 0px rgba(152, 147, 81, 0.00), 0px 139px 56px 0px rgba(152, 147, 81, 0.01), 0px 78px 47px 0px rgba(152, 147, 81, 0.05), 0px 35px 35px 0px rgba(152, 147, 81, 0.09), 0px 9px 19px 0px rgba(152, 147, 81, 0.10)',
        subHeaderShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)',
        languageCardShadow: '0px 218px 61px 0px rgba(152, 147, 81, 0.00), 0px 139px 56px 0px rgba(152, 147, 81, 0.01), 0px 78px 47px 0px rgba(152, 147, 81, 0.05), 0px 35px 35px 0px rgba(152, 147, 81, 0.09), 0px 9px 19px 0px rgba(152, 147, 81, 0.10)',
        
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
