import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", "sans-serif"],
        heading: ["Bakbak", "Arial", "sans-serif"],
        body: ["Zain", "Arial", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'edge-green': {
          'dark': '#123800',
          'primary': '#a8d080',
          'secondary': '#EDF2E9',
          'accent': '#123800',
        },
        'edge-text': '#123800',
        'edge-bg': '#ffffff',
      },
      spacing: {
        'desktop-block': '40px',
        'mobile-block': '20px',
      },
      fontSize: {
        'title': ['75px', {
          lineHeight: '1.1',
          fontWeight: 'bold',
        }],
        'h1-desktop': ['35px', {
          lineHeight: '1.2',
          fontWeight: 'bold',
        }],
        'h2-desktop': ['30px', {
          lineHeight: '1.2',
          fontWeight: 'bold',
        }],
        'h3-desktop': ['25px', {
          lineHeight: '1.2',
          fontWeight: 'bold',
        }],
        'body-desktop': ['25px', {
          lineHeight: '1.5',
        }],
        'h1-mobile': ['28px', {
          lineHeight: '1.2',
          fontWeight: 'bold',
        }],
        'h2-mobile': ['26px', {
          lineHeight: '1.2',
          fontWeight: 'bold',
        }],
        'h3-mobile': ['24px', {
          lineHeight: '1.2',
          fontWeight: 'bold',
        }],
        'body-mobile': ['20px', {
          lineHeight: '1.5',
        }],
      },
    },
  },
  plugins: [],
} satisfies Config;
