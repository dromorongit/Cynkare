import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F8F5F0",
        secondary: "#EDE3D9",
        accent: "#D6C3B3",
        text: "#1A1A1A",
        background: "#F8F5F0",
        foreground: "#1A1A1A",
      },
      fontFamily: {
        body: ["system-ui", "-apple-system", "San Francisco", "Helvetica", "Arial", "sans-serif"],
        heading: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
