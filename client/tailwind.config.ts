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
        grey: { light: '#7d858a', middle: '#4f5d66', dark: '#3a454a' },
        blue: { light: '#373e42', middle: '#1b2328', dark: '#0f1112' },
        cream: { light: '#f2f2f2', middle: '#e0e0e0', dark: '#a7a7a7' },
        transparent: 'transparent',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '90%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        progress: {
          '0%': { width: '0%' },
          '50%': { width: '50%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        marquee: 'marquee 10s linear infinite',
        'accordion-up': 'accordion-up 0.2s ease-out',
        progress: 'progress 30s linear',
        'progress-finished': 'progress 4s linear',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
