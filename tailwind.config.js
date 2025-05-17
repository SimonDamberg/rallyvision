/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rally: {
          DEFAULT: "#830017",
          light: "#a3001d", // Lighter shade
          dark: "#630012", // Darker shade
        },
      },
    },
  },
  plugins: [],
};
