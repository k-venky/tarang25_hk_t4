
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
				mood: {
					'stress': '#FF5555',
					'stress-end': '#FFA07A',
					'calm': '#87CEEB',
					'calm-end': '#E6E6FA',
					'energy': '#FFEB3B',
					'energy-end': '#FFCC99',
					'balance': '#98FB98',
					'balance-end': '#8FBC8F',
					'drain': '#36454F',
					'drain-end': '#708090'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'bounce-slight': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				},
				'pulse-glow': {
					'0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
					'50%': { transform: 'scale(1.05)', opacity: '1' }
				},
				'float-up': {
					'0%': { transform: 'translateY(0)', opacity: '1' },
					'100%': { transform: 'translateY(-10px)', opacity: '1' }
				},
				'gradient-flow': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'ripple': {
					'0%': { transform: 'scale(0)', opacity: '1' },
					'100%': { transform: 'scale(4)', opacity: '0' }
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(0.95)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'draw-line': {
					'0%': { 'stroke-dashoffset': '1000' },
					'100%': { 'stroke-dashoffset': '0' }
				},
				'confetti-fall': {
					'0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '1' },
					'100%': { transform: 'translateY(100px) rotate(720deg)', opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bounce-slight': 'bounce-slight 2s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'float-up': 'float-up 0.3s ease-out forwards',
				'gradient-flow': 'gradient-flow 3s ease infinite',
				'ripple': 'ripple 0.8s ease-out',
				'breathe': 'breathe 4s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
				'scale-in': 'scale-in 0.3s ease-out forwards',
				'draw-line': 'draw-line 1.5s ease forwards',
				'confetti-fall': 'confetti-fall 3s ease-out forwards'
			},
			backgroundImage: {
				'stress-gradient': 'linear-gradient(45deg, var(--mood-stress), var(--mood-stress-end))',
				'calm-gradient': 'linear-gradient(45deg, var(--mood-calm), var(--mood-calm-end))',
				'energy-gradient': 'linear-gradient(45deg, var(--mood-energy), var(--mood-energy-end))',
				'balance-gradient': 'linear-gradient(45deg, var(--mood-balance), var(--mood-balance-end))',
				'drain-gradient': 'linear-gradient(45deg, var(--mood-drain), var(--mood-drain-end))'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
