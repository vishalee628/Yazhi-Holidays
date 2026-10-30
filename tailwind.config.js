/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          primary: '#071D3A',
          midnight: '#041329',
          royal: '#0B2A50',
          secondary: '#123C69',
          surface: '#092347',
        },
        gold: {
          royal: '#F5B82E',
          metallic: '#DDA52A',
          light: '#F8DFA0',
          champagne: '#FBF2DD',
          dark: '#B88414',
        },
        sand: {
          ivory: '#FAF7F0',
          card: '#F5F1E8',
          border: '#E7E3DA',
        },
        slate: {
          body: '#243247',
          muted: '#778397',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        tightest: '-.03em',
      },
      boxShadow: {
        'luxury': '0 20px 45px -10px rgba(7, 29, 58, 0.12), 0 10px 20px -5px rgba(7, 29, 58, 0.06)',
        'luxury-dark': '0 25px 50px -12px rgba(4, 19, 41, 0.6)',
        'gold-glow': '0 0 25px rgba(245, 184, 46, 0.25)',
      }
    },
  },
  plugins: [],
}
