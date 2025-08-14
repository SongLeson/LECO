/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // LECO Enhanced Brand Colors
        'leco': {
          'black': '#000000',          // Pure deep black
          'gray': '#1A1A1A',           // Graphite gray
          'carbon': '#0F0F0F',         // Carbon fiber
          'electric-blue': '#00E5FF',   // Fluorescent electric blue
          'neon-blue': '#00D4FF',      // Original neon blue
          'energy-orange': '#FF6B00',   // Energy orange
          'plasma-purple': '#8B00FF',   // Plasma purple
          'silver': '#E0E0E0',         // Silver
          'dark-silver': '#808080',    // Dark silver
          'neon-green': '#39FF14',     // Neon green
        }
      },
      fontFamily: {
        'display': ['Orbitron', 'Arial Black', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'neon-glow': 'neonGlow 1.5s ease-in-out infinite alternate',
        'ripple': 'ripple 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'electric-pulse': 'electricPulse 2s ease-in-out infinite',
        'particle-float': 'particleFloat 4s ease-in-out infinite',
        'logo-draw': 'logoDraw 2s ease-in-out',
      },
      keyframes: {
        'glow': {
          'from': { 'box-shadow': '0 0 20px #00E5FF' },
          'to': { 'box-shadow': '0 0 30px #00E5FF, 0 0 40px #00E5FF' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'neonGlow': {
          'from': { 
            'box-shadow': '0 0 5px #00E5FF, 0 0 10px #00E5FF, 0 0 15px #00E5FF',
            'text-shadow': '0 0 5px #00E5FF, 0 0 10px #00E5FF'
          },
          'to': { 
            'box-shadow': '0 0 10px #00E5FF, 0 0 20px #00E5FF, 0 0 30px #00E5FF, 0 0 40px #8B00FF',
            'text-shadow': '0 0 10px #00E5FF, 0 0 20px #00E5FF, 0 0 30px #8B00FF'
          }
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' }
        },
        'slideInRight': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slideInLeft': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'fadeInUp': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'electricPulse': {
          '0%, 100%': { 
            'box-shadow': '0 0 5px #00E5FF, inset 0 0 5px #00E5FF',
            'border-color': '#00E5FF'
          },
          '50%': { 
            'box-shadow': '0 0 20px #00E5FF, 0 0 30px #8B00FF, inset 0 0 10px #00E5FF',
            'border-color': '#8B00FF'
          }
        },
        'particleFloat': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.3' },
          '25%': { transform: 'translateY(-20px) translateX(10px)', opacity: '1' },
          '50%': { transform: 'translateY(-40px) translateX(-5px)', opacity: '0.8' },
          '75%': { transform: 'translateY(-20px) translateX(-10px)', opacity: '1' }
        },
        'logoDraw': {
          '0%': { 'stroke-dasharray': '0 1000', opacity: '0' },
          '50%': { 'stroke-dasharray': '1000 1000', opacity: '1' },
          '100%': { 'stroke-dasharray': '1000 1000', opacity: '1', fill: '#00E5FF' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'sport-gradient': 'linear-gradient(135deg, #000000 0%, #1A1A1A 50%, #0F0F0F 100%)',
        'neon-gradient': 'linear-gradient(90deg, #00E5FF 0%, #8B00FF 100%)',
        'electric-gradient': 'linear-gradient(45deg, #00E5FF 0%, #8B00FF 50%, #FF6B00 100%)',
        'speed-gradient': 'linear-gradient(90deg, transparent 0%, #00E5FF 50%, transparent 100%)',
        'particle-gradient': 'radial-gradient(circle, #00E5FF 0%, transparent 70%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'neon': '0 0 5px #00E5FF, 0 0 10px #00E5FF, 0 0 15px #00E5FF',
        'neon-lg': '0 0 10px #00E5FF, 0 0 20px #00E5FF, 0 0 30px #00E5FF, 0 0 40px #8B00FF',
        'electric': '0 0 20px rgba(0, 229, 255, 0.5)',
        'glow': '0 0 30px rgba(0, 229, 255, 0.3)',
      }
    },
  },
  plugins: [],
}
