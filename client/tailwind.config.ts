import type { Config } from 'tailwindcss'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { nextui } = require('@nextui-org/react')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#FB5607',
              foreground: '#ffffff'
            },
            danger: {
              DEFAULT: '#991b1b',
              foreground: '#fef2f2'
            },
            warning: {
              DEFAULT: '#fed7aa',
              foreground: '#7c2d12'
            },
            success: {
              DEFAULT: '#bbf7d0',
              foreground: '#14532d'
            },
            secondary: {
              DEFAULT: '#bfdbfe',
              foreground: '#1e3a8a'
            }
          }
        }
      }
    })
  ]
}
export default config
