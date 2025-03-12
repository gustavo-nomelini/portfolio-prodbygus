/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'foreground-muted': 'var(--foreground-muted)',
        primary: 'var(--color1)',
        secondary: 'var(--color2)',
        accent: 'var(--color3)',
        surface: 'var(--color4)',
        highlight: 'var(--color5)',
      },
      animation: {
        'shrink-width': 'shrink-width 10s linear forwards',
      },
      keyframes: {
        'shrink-width': {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
    },
  },
  plugins: [],
}
