/** @type {import('tailwindcss').Config} */
const {nextui} = require('@nextui-org/react')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages.bak/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        "custom-dark": {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#222323",
            foreground: "#e5f4f5",
            primary: {
              50: "#e6f1fe",
              100: "#cce3fd",
              200: "#99c7fb",
              300: "#66aaf9",
              400: "#338ef7",
              500: "#006FEE",
              600: "#005bc4",
              700: "#004493",
              800: "#002e62",
              900: "#001731",
              DEFAULT: "#006FEE",
              foreground: "#ffffff",
            },
            focus: "#338ef7",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    })
  ],
}

