import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981', // Green
          dark: '#059669',
        },
        secondary: {
          DEFAULT: '#FFFFFF', // White
          dark: '#F3F4F6',
        },
      },
    },
  },
  plugins: [],
};

export default config;
