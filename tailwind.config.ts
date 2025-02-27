import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

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
        bakbak: ["Bakbak", "Arial", "sans-serif"],
        zain: ["Zain", "Arial", "sans-serif"],
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
        // Title style
        'title': ['75px', {
          lineHeight: '1.1',
          fontWeight: 'bold',
        }],
        
        // Desktop heading styles
        'h1': ['35px', {
          lineHeight: '1.2',
          fontWeight: 'bold',
        }],
        'h2': ['30px', {
          lineHeight: '1.2',
          fontWeight: 'bold',
        }],
        'h3': ['25px', {
          lineHeight: '1.2',
          fontWeight: 'bold',
        }],
        'body': ['25px', {
          lineHeight: '1.5',
        }],
        
        // Keep previous classes for compatibility
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
        
        // Mobile sizes
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
  plugins: [
    plugin(function({ addComponents }) {
      addComponents({
        '.content-block': {
          marginBottom: '40px',
          '@screen md': {
            marginBottom: '40px',
          },
          '@screen sm': {
            marginBottom: '20px',
          },
        },
        '.heading-1': {
          fontFamily: 'Bakbak, Arial, sans-serif',
          fontSize: '35px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen sm': {
            fontSize: '28px',
          },
        },
        '.heading-2': {
          fontFamily: 'Bakbak, Arial, sans-serif',
          fontSize: '30px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen sm': {
            fontSize: '26px',
          },
        },
        '.heading-3': {
          fontFamily: 'Bakbak, Arial, sans-serif',
          fontSize: '25px',
          fontWeight: 'bold',
          lineHeight: '1.2',
          '@screen sm': {
            fontSize: '24px',
          },
        },
        '.body-text': {
          fontFamily: 'Zain, Arial, sans-serif',
          fontSize: '25px',
          lineHeight: '1.5',
          '@screen sm': {
            fontSize: '20px',
          },
        },
      })
    })
  ],
} satisfies Config;