/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pastelBlue: '#A7C7E7',
        pastelPurple: '#CDB4DB',
        pastelMint: '#B7E4C7',
        pastelPeach: '#FFD6A5',
      },
    },
  },
  plugins: [],
}
