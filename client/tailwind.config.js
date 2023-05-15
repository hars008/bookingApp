/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#44daaa",
        secondary: "#04f1fe",
        tertiary: "#10b981",
        quaternary: "#6b7280",
      },
    },
  },
  plugins: [],
};

