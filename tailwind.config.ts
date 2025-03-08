
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
				},
				// Custom colors for NourishMama
				sage: {
					50: '#f2f7f5',
					100: '#d1e8e2',
					200: '#a7c4bc',
					300: '#75a192',
					400: '#4d8573',
					500: '#2f6a59',
					600: '#205647',
					700: '#164338',
					800: '#0e312a',
					900: '#071f1b',
				},
				peach: {
					50: '#fff8f3',
					100: '#ffe6d5',
					200: '#ffcba4',
					300: '#ffad73',
					400: '#ff8d42',
					500: '#fd6e11',
					600: '#ed5109',
					700: '#c53a0c',
					800: '#9c3011',
					900: '#7a2810',
				},
				lavender: {
					50: '#f5f5fe',
					100: '#e6e6fa',
					200: '#d8d8f5',
					300: '#c5c5eb',
					400: '#a9a9dd',
					500: '#8c8cca',
					600: '#7575b3',
					700: '#5d5d91',
					800: '#444471',
					900: '#343457',
				},
				cream: {
					50: '#fefefe',
					100: '#faf9f6',
					200: '#f5f3ed',
					300: '#ece8d9',
					400: '#dfd6be',
					500: '#cfc19e',
					600: '#bba77b',
					700: '#a69066',
					800: '#8b7856',
					900: '#6e6147',
				},
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				lato: ['Lato', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-out': 'fade-out 0.5s ease-out forwards',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
