/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#1746A2',
      'secondary': {
        'main': '#5F9DF7',
        'darker': '#4E80CC'
      },
      'accent': '#FF731D',
      'neutral': {
        1: '#F3F7F7',
        2: '#C8CCCC',
        3: '#A2A6A6',
        4: '#D4D9D9'
      }
    },
    animation: {
      'open-dropdown': 'openDropdown 0.3s ease-out 0s 1 normal forwards',
      'close-dropdown': 'closeDropdown 0.3s ease-out 0s 1 normal forwards'
    },
    extend: {
      keyframes: {
        openDropdown: {
          '0%': {
            transform: 'scale(0)',
            opacity: '0.5',
          },
          '100%': {
            transform: 'scale(100%)',
            opacity: '1',
          }
        },
        closeDropdown: {
          '0%': {
            transform: 'scale(100%)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(0)',
            opacity: '0.5',
            display: 'none',
          }
        }
      }
    },
  },
  plugins: [],
}
