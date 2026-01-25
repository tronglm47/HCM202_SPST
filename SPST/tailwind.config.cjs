module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#f3ead7',
        bamboo: '#d4c09d',
        pine: '#124734',
        ink: '#1f1f1f',
        lotus: '#c46f4a',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        parchment: '0 20px 45px -20px rgba(18, 71, 52, 0.35)',
      },
      backgroundImage: {
        'fiber-paper':
          'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}
