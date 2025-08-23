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
        'emerald-light': '#f0f7f0',
        'emerald-mid': '#b8dbb0',
        'emerald-accent': '#82eda0',
        'primary-green': '#4ade80',
        'primary-green-dark': '#22c55e',
      },
      boxShadow: {
        neu: '10px 10px 20px #d1d9e6',
        'neu-inner': 'inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff',
        'neu-hover': '15px 15px 30px #d1d9e6',
        'box-inner': 'inset 6px 6px 10px #d1d9e6, inset -3px -3px 5px #ffffff',
        'soft': '4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff',
        'soft-hover': '6px 6px 12px #c0d0dc, -6px -6px 12px #ffffff',
        'green-soft': '4px 4px 8px rgba(163, 226, 189, 0.6), -4px -4px 8px #ffffff',
        'green-hover': '6px 6px 12px rgba(163, 226, 189, 0.8), -6px -6px 12px #ffffff',
      },
      backgroundImage: {
        'neumorphic': 'linear-gradient(145deg, #ffffff, #e6e9f0)',
        'neumorphic-bg': 'linear-gradient(145deg, #f0f7f4, #d9e5e1)',
      },
    },
  },
  plugins: [],
}
