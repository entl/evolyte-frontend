/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
      "./components/**/*.{js,ts,vue}",
      "./layouts/**/*.{js,ts,vue}",
      "./pages/**/*.{js,ts,vue}",
      "./plugins/**/*.{js,ts,vue}",
      "./nuxt.config.{js,ts}",
      "./app.vue",
      "./error.vue",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
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
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
    colors: {
        'text': {
            50: 'var(--text-50)',
            100: 'var(--text-100)',
            200: 'var(--text-200)',
            300: 'var(--text-300)',
            400: 'var(--text-400)',
            500: 'var(--text-500)',
            600: 'var(--text-600)',
            700: 'var(--text-700)',
            800: 'var(--text-800)',
            900: 'var(--text-900)',
            950: 'var(--text-950)',
        },
        'background': {
            50: 'var(--background-50)',
            100: 'var(--background-100)',
            200: 'var(--background-200)',
            300: 'var(--background-300)',
            400: 'var(--background-400)',
            500: 'var(--background-500)',
            600: 'var(--background-600)',
            700: 'var(--background-700)',
            800: 'var(--background-800)',
            900: 'var(--background-900)',
            950: 'var(--background-950)',
        },
        'primary': {
            50: 'var(--primary-50)',
            100: 'var(--primary-100)',
            200: 'var(--primary-200)',
            300: 'var(--primary-300)',
            400: 'var(--primary-400)',
            500: 'var(--primary-500)',
            600: 'var(--primary-600)',
            700: 'var(--primary-700)',
            800: 'var(--primary-800)',
            900: 'var(--primary-900)',
            950: 'var(--primary-950)',
        },
        'secondary': {
            50: 'var(--secondary-50)',
            100: 'var(--secondary-100)',
            200: 'var(--secondary-200)',
            300: 'var(--secondary-300)',
            400: 'var(--secondary-400)',
            500: 'var(--secondary-500)',
            600: 'var(--secondary-600)',
            700: 'var(--secondary-700)',
            800: 'var(--secondary-800)',
            900: 'var(--secondary-900)',
            950: 'var(--secondary-950)',
        },
        'accent': {
            50: 'var(--accent-50)',
            100: 'var(--accent-100)',
            200: 'var(--accent-200)',
            300: 'var(--accent-300)',
            400: 'var(--accent-400)',
            500: 'var(--accent-500)',
            600: 'var(--accent-600)',
            700: 'var(--accent-700)',
            800: 'var(--accent-800)',
            900: 'var(--accent-900)',
            950: 'var(--accent-950)',
        },
    },

}

