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
        'very-light-gray ': 'hsl(0, 0%, 98%)',
      },
    },
  },
  plugins: [],
}
