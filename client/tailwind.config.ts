/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      fontFamily: {
        sora: ['"Sora"', 'sans-serif'],
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        bold: 700,
      },
      colors: {
        mask: 'rgba(0, 194, 203, 0.5)',
        azzurro: '#00c2cb',
        transparent: 'transparent',
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      animation: {
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
