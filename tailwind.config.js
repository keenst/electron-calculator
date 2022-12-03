/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,vue}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'orange': {
          100: '#faecb4',
          300: '#f4d550',
          500: '#f2c105'
        },
        'blue': {
          200: '#a5afe2',
          400: '#6476cc',
          600: '#566077'
        }
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
  darkMode: 'class'
};
