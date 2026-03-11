import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fdf8f0',
          100: '#f5e6d0',
          200: '#e8d0a8',
          300: '#d4b07a',
          400: '#c49a5c',
          500: '#b08040',
          600: '#8a6230',
          700: '#6b4c25',
          800: '#4a351a',
          900: '#2d2010',
          950: '#1a1208',
        },
        gold: {
          400: '#d4a853',
          500: '#c49630',
          600: '#a07828',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
