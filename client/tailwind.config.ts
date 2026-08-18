import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0a1128',
          900: '#0f1c3f',
          800: '#172554',
          700: '#1e3a8a',
          600: '#1e40af',
          500: '#2563eb',
          400: '#3b82f6',
        },
        success: '#16a34a',
        warning: '#eab308',
        danger: '#dc2626',
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'pulse-strong': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.08)', opacity: '0.85' },
        },
      },
      animation: {
        'pulse-strong': 'pulse-strong 0.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
