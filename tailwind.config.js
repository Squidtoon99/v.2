/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./{src,pages,styles}/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {
      keyframes: {
        'spin-in': {
          from: {
            opacity: 0,
            translate: '-50px',
            transform: 'rotate(200deg)',
          },
          to: {
            opacity: 0.9,
            translate: '0px',
            transform: 'rotate(360deg)',
          }
        },
        'slide-right': {
          from: {
            transform: 'translateX(-50px)',
          },
          to: {
            transform: 'translateY(0)',
          }
        },
        'slide-left': {
          from: {
            transform: 'translateX(50px)',
          },
          to: {
            transform: 'translateY(0)',
          }
        },
        'fade-up-in': {
          from: {
            opacity: 0,
            transform: 'translateY(25px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          }
        },
        'fade-up-in--special': {
          from: {
            opacity: 0.1,
            transform: 'translateY(25px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          }
        },
        'slide-up-out': {
          from: {
            transform: 'translateY(0px)',
          },
          to: {
            transform: 'translateY(-10vh)',
          }
        },
        'slide-down-in': {
          from: {
            transform: 'translateY(-10vh)',
          },
          to: {
            transform: 'translateY(0px)',
          }
        },
        'gradient': {
          "0%": {
            backgroundPosition: "0 % 50 %"
          },
          "50%": {
            backgroundPosition: "100 % 50 %"
          },
          "100%": {
            backgroundPosition: "0 % 50 %"
          }

        }
      },
      animation: {
        'spin-in': 'spin-in 0.75s ease-out',

        'slide-right': 'slide-right 0.75s ease-out',
        'slide-left': 'slide-left 0.75s ease-out',
        'fade-up-in': 'fade-up-in 0.5s ease-out',
        'fade-up-in--special': 'fade-up-in--special 0.5s ease-out',
        'slide-up-out': 'slide-up-out 0.2s ease-out',
        'slide-down-in': 'slide-down-in 0.25s ease-out',
        'gradient': 'gradient 15ss ease infinite',
      }
    },
  },
  plugins: [],
};
