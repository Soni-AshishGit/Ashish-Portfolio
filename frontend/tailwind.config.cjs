/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        galaxy: {
          900: '#020617',
          800: '#020617',
        },
      },
      boxShadow: {
        glass: '0 24px 60px rgba(15,23,42,0.9)',
      },
      backdropBlur: {
        glass: '18px',
      },
    },
  },
  plugins: [],
}

