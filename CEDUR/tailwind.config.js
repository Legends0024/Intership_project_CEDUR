/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5', // Primary brand color
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          violet: '#7c3aed',
          cyan: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
        },
        slate: {
          850: '#172033',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        heading: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(15, 23, 42, 0.06)",
        card: "0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)",
        "card-hover": "0 20px 35px -10px rgba(79, 70, 229, 0.12), 0 10px 15px -3px rgba(15, 23, 42, 0.05)",
        island: "0 10px 30px -10px rgba(15, 23, 42, 0.12), 0 4px 6px -2px rgba(15, 23, 42, 0.04)",
        glow: "0 0 35px -5px rgba(79, 70, 229, 0.3)",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
