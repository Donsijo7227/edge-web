import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';
import tailwindAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Arial',
  				'sans-serif'
  			],
  			heading: [
  				'Bakbak',
  				'Arial',
  				'sans-serif'
  			],
  			body: [
  				'Zain',
  				'Arial',
  				'sans-serif'
  			],
  			bakbak: [
  				'Bakbak',
  				'Arial',
  				'sans-serif'
  			],
  			zain: [
  				'Zain',
  				'Arial',
  				'sans-serif'
  			]
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			'edge-green': {
  				dark: '#123800',
  				primary: '#a8d080',
  				secondary: '#EDF2E9',
  				accent: '#123800'
  			},
  			'edge-text': '#123800',
  			'edge-bg': '#ffffff',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		spacing: {
  			'desktop-block': '40px',
  			'mobile-block': '20px'
  		},
  		fontSize: {
  			title: [
  				'75px',
  				{
  					lineHeight: '1.1',
  					fontWeight: 'bold'
  				}
  			],
  			h1: [
  				'35px',
  				{
  					lineHeight: '1.2',
  					fontWeight: 'bold'
  				}
  			],
  			h2: [
  				'30px',
  				{
  					lineHeight: '1.2',
  					fontWeight: 'bold'
  				}
  			],
  			h3: [
  				'25px',
  				{
  					lineHeight: '1.2',
  					fontWeight: 'bold'
  				}
  			],
  			body: [
  				'25px',
  				{
  					lineHeight: '1.5'
  				}
  			],
  			'h1-desktop': [
  				'35px',
  				{
  					lineHeight: '1.2',
  					fontWeight: 'bold'
  				}
  			],
  			'h2-desktop': [
  				'30px',
  				{
  					lineHeight: '1.2',
  					fontWeight: 'bold'
  				}
  			],
  			'h3-desktop': [
  				'25px',
  				{
  					lineHeight: '1.2',
  					fontWeight: 'bold'
  				}
  			],
  			'body-desktop': [
  				'25px',
  				{
  					lineHeight: '1.5'
  				}
  			],
  			'h1-mobile': [
  				'28px',
  				{
  					lineHeight: '1.2',
  					fontWeight: 'bold'
  				}
  			],
  			'h2-mobile': [
  				'26px',
  				{
  					lineHeight: '1.2',
  					fontWeight: 'bold'
  				}
  			],
  			'h3-mobile': [
  				'24px',
  				{
  					lineHeight: '1.2',
  					fontWeight: 'bold'
  				}
  			],
  			'body-mobile': [
  				'20px',
  				{
  					lineHeight: '1.5'
  				}
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
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
    }),
    tailwindAnimate
],
} satisfies Config;