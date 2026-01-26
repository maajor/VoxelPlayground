module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './docs/**/*.{md,mdx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          from: {opacity: '0', transform: 'translateY(30px)'},
          to: {opacity: '1', transform: 'translateY(0)'},
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};

