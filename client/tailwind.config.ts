/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Work Sans"', "sans-serif"],
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      colors: {
        border: "hsl(var(--muted), <alpha-value>)",
        background: "hsl(var(--primary), <alpha-value>)",
        button: {
          background: "hsla(var(--muted), 0.1)",
          selected: "hsl(var(--light-blue), <alpha-value>)",
          muted: "hsla(var(--primary), 0.4)",
          hover: "hsl(var(--dark-blue), <alpha-value>)",
          off: "hsl(var(--text-buttonOff), <alpha-value>)",
        },
        text: {
          label: "hsl(var(--text-label), <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary), <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary), <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--neon-pink), <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted), <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card), <alpha-value>)",
        },
        green: {
          DEFAULT: "hsl(var(--neon-green), <alpha-value>)",
        },
        teal: {
          DEFAULT: "hsl(var(--teal), <alpha-value>)",
        },
        pink: {
          DEFAULT: "hsl(var(--neon-pink), <alpha-value>)",
        },
        chart: {
          background: "hsl(var(--blue), <alpha-value>)",
        },
        blue: {
          DEFAULT: "hsl(var(--light-blue), <alpha-value>)",
          dark: "hsl(var(--dark-blue), <alpha-value>)",
        },
        transparent: "transparent",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "90%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        progress: {
          "0%": { width: "0%" },
          "50%": { width: "50%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        marquee: "marquee 10s linear infinite",
        "accordion-up": "accordion-up 0.2s ease-out",
        progress: "progress 30s linear",
        "progress-finished": "progress 4s linear",
      },
      transformOrigin: {
        "left-right": "0% 100%",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
