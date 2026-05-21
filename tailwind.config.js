/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        pokedex: {
          red:    '#FF3B3B',
          yellow: '#FFD93D',
          blue:   '#4CC9F0',
          green:  '#06D6A0',
          purple: '#9B5DE5',
          bg:     '#0F0F1A',
          card:   '#1A1A2E',
          border: '#2A2A45',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-6px)' },
        },
        pulse_glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(76,201,240,0.3)' },
          '50%':       { boxShadow: '0 0 24px rgba(76,201,240,0.7)' },
        },
      },
      animation: {
        float:      'float 3s ease-in-out infinite',
        pulse_glow: 'pulse_glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
