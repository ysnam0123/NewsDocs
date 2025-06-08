// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '0.7',
            transform: 'translateY(0)',
          },
        },
        fadeOut: {
          '0%': {
            opacity: '0.7',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        fadeOut: 'fadeOut 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
