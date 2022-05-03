module.exports = {
  content: [
    // Exclude /pages/privacy.js
    '!./pages/privacy.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // Exclude /pages/privacy.js
  exclude: [
    './pages/privacy.js',
  ],

  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
