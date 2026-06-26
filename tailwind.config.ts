import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        bg: '#030205',
        rose: '#c44569',
        rose2: '#e06080',
        gold: '#c9a840',
        gold2: '#e8c86a',
        crimson: '#8b1a2a',
      },
    },
  },
  plugins: [],
}
export default config
