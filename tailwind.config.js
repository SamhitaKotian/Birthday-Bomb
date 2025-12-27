/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        background: '#FFF8F0',
        neutral: '#2D3436',
        success: '#00B894',
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'tile': '20px',
        'card': '16px',
      },
      boxShadow: {
        'hover': '0 8px 32px rgba(255,107,107,0.15)',
        'glow': '0 4px 16px rgba(78,205,196,0.2)',
      },
      animation: {
        'ribbon-curl': 'ribbonCurl 0.8s ease-out forwards',
        'tile-shimmer': 'tileShimmer 2s linear infinite',
        'confetti': 'confetti 3s ease-out forwards',
        'typewriter': 'typewriter 2s steps(40) forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

