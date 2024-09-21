import animate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",
  
    content: [
      './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    ],
  
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
		'poppy': {
			DEFAULT: '#E23135',
			50: '#F9D2D3',
			100: '#F6C0C1',
			200: '#F19C9E',
			300: '#EC797B',
			400: '#E75558',
			500: '#E23135',
			600: '#C01B1F',
			700: '#8F1417',
			800: '#5E0D0F',
			900: '#2C0607',
			950: '#140303'
		  },
		  'ronchi': {  DEFAULT: '#EFD550',  50: '#FEFDF8',  100: '#FDF9E6',  200: '#F9F0C0',  300: '#F6E79B',  400: '#F2DE75',  500: '#EFD550',  600: '#EAC91D',  700: '#BDA111',  800: '#8A760D',  900: '#574A08',  950: '#3D3406'},
		  'persian-blue': {  DEFAULT: '#173DEB',  50: '#C0CAFA',  100: '#ADBBF8',  200: '#889BF5',  300: '#627CF1',  400: '#3D5CEE',  500: '#173DEB',  600: '#102EBA',  700: '#0C2286',  800: '#071553',  900: '#03081F',  950: '#000105'},
      },
      borderRadius: {
      	xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        "collapsible-up": {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
	  fontFamily:{
		'sans': ["Fredoka", 'sans-serif'],
	  }
    },
  },
  plugins: [animate, require('daisyui'),],
}