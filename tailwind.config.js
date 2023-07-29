/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'nunito-sans': ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        'dark-blue': 'hsl(209, 23%, 22%)',
        'bg-very-dark-blue': 'hsl(207, 26%, 17%)',
        'text-very-dark-blue': 'hsl(200, 15%, 8%)',
        'dark-gray': 'hsl(0, 0%, 52%)',
        'very-light-gray': 'hsl(0, 0%, 98%)',
      },
      keyframes: {
        middleLoaderKeyframe: {
          '0%': {
            scale: '1',
          },
          '10%': {
            scale: '1',
          },
          '15%': {
            scale: '0.7 1.2',
          },
          '40%, 60%': {
            scale: '1',
          },
          '65%': {
            scale: '0.7 1.2',
          },
          '100%': {
            scale: '1',
          },
        },
        leftLoaderKeyframe: {
          '0%': {
            translate: '-0% -50%',
            scale: '1.3 0.6',
          },
          '10%, 60%': {
            translate: '0% -50%',
            scale: '1',
          },
          '65%, 85%': {
            translate: '-300% -50%',
          },
          '87.5%': {
            translate: '-310% -50%',
          },
          '90%': {
            translate: '-290% -50%',
          },
          '92.5%': {
            translate: '-310% -50%',
            scale: '1',
          },
          '95%': {
            translate: '-290% -50%',
          },
          '100%': {
            translate: '0% -50%',
          },
        },
        rightLoaderKeyframe: {
          ' 0%, 10%': {
            translate: '0% -50%',
            scale: '1',
          },
          '15%, 35%': {
            translate: '300% -50%',
          },
          '15%': {
            scale: '1.3 0.6',
          },
          '20%': {
            scale: '1',
          },
          '37.5%': {
            translate: '310% -50%',
          },
          '40%': {
            translate: '290% -50%',
          },
          '42.5%': {
            translate: '310% -50%',
          },
          '45%': {
            translate: '290% -50%',
            scale: '1',
          },
          '50%': {
            translate: '400% -50%',
            scale: '1.3 0.6',
          },
          '60%, 100%': {
            translate: '0% -50%',
            scale: '1',
          },
        },
      },
      animation: {
        middleLoaderAnimation:
          'middleLoaderKeyframe 2s ease-out infinite forwards',
        leftLoaderAnimation:
          'leftLoaderKeyframe 2s ease-in-out infinite forwards',
        rightLoaderAnimation:
          'rightLoaderKeyframe 2s ease-in-out infinite forwards',
      },
    },
  },
  plugins: [],
}
