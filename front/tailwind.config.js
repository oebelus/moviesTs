/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#212121", // For body background
        card: "#1c1c1c", // For App background
        primary: "#ba8300", // For accents like navbar-brand and titles
        secondary: "#9e7106", // For subtle accents and buttons
        hover: "#111111", // For hover effects
        borderGray: "#ffffff50", // For borders
        container: "#212121",
      },
      fontFamily: {
        cursive: ["Mali", "cursive"],
        fancy: ["The Girl Next Door", "fantasy"],
        mono: ["monospace"],
        sans: ["Lucida Sans", "sans-serif"],
      },
      borderRadius: {
        lg: "10px",
        full: "50%",
      },
    },
  },
  plugins: [],
};
