/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./**/templates/**/*.html",   // For app level
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2d9d78',
        'primary-light': '#40b98c',
        'primary-dark': '#1e6e59',
        secondary: '#f0f7f4',
        dark: '#333',
        light: '#fff',
        gray: '#666',
        'light-gray': '#f5f5f5',
      },
      boxShadow: {
        neu: '10px 10px 20px #d1d9e6',
        'neu-inner': 'inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff',
        'neu-hover': '15px 15px 30px #d1d9e6',
        'box-inner': 'inset 6px 6px 10px #d1d9e6, inset -3px -3px 5px #ffffff',
      },
      backgroundImage: {
        'neumorphic': 'linear-gradient(145deg, #ffffff, #e6e9f0)',
        'neumorphic-bg': 'linear-gradient(145deg, #f0f7f4, #d9e5e1)',
      },
    },
  },
  plugins: [],
}
