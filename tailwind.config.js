/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        figtree: ['Figtree', 'sans-serif'],
      },
      screens: {
        'mobile': { 'max': '809.98px' },
        'md-tablet': { 'min': '810px', 'max': '1199.98px' },
      },
      colors: {
        accent: '#F598F2',
      },
      spacing: {
        '150px': '150px',
        '190px': '190px',
        '200px': '200px',
        '1340px': '1340px',
      },
      fontSize: {
        hero: '200px',
        'hero-tablet': '129.6px',
        'hero-mobile': 'clamp(68px,21vw,80px)',
      },
      lineHeight: {
        '81%': '0.81',
        '113.4px': '113.4px',
        '96px': '96px',
      },
      letterSpacing: {
        'hero': '-6px',
        'hero-tablet': '-7.7px',
        'hero-mobile': '-4.8px',
        'nav-num': '-0.08px',
        'nav-label': '-0.12px',
        'text-tight': '-0.16px',
      },
      animation: {
        'reveal-up': 'revealUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-right': 'revealRight 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'dot-pulse': 'dotPulse 1.6s ease-in-out infinite',
        'video-fade': 'videoFadeIn 1.2s ease-in-out',
      },
      keyframes: {
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(80px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealRight: {
          '0%': { opacity: '0', transform: 'translateX(100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        videoFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        dotPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(1.45)' },
        },
      },
      transitionDuration: {
        '1200ms': '1200ms',
      },
    },
  },
  plugins: [],
}
