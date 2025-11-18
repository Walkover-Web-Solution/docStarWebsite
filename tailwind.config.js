/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          electric: "#00f7ff"
        },
        keyframes: {
          'border-glow': {
            '0%': {
              boxShadow: '0 0 5px rgba(0,247,255,0.4), 0 0 10px rgba(0,247,255,0.4)',
            },
            '50%': {
              boxShadow: '0 0 20px rgba(0,247,255,0.8), 0 0 30px rgba(0,247,255,0.8)',
            },
            '100%': {
              boxShadow: '0 0 5px rgba(0,247,255,0.4), 0 0 10px rgba(0,247,255,0.4)',
            },
          },
        },
        animation: {
          'border-glow': 'border-glow 3s infinite ease-in-out'
        }
      },
    },
    plugins: [],
  }
  