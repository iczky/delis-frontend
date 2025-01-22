/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "#F7EBD3",
        navbar: "#FFDBAF",
        card: "#CA7B42",
        button: "#823919",
        active: "#b78570",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
