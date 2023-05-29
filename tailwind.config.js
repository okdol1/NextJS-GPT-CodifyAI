/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: { 30: "120px", 46: "184px" },
      height: { 30: "120px" },
      minWidth: { 120: "480px" },
      padding: { 7.5: "30px" },
      margin: { 7.5: "30px" },
      borderRadius: {
        default: "20px",
      },
      colors: {
        primary: "#4854E8",
        SystemlightBlue: "#F9FDFD",
        "grey-100": "#F4F4F4",
        "grey-200": "#E4E4E4",
        "grey-300": "#a8a8a8",
      },
      fontSize: {
        small: "14px",
        base: "16px",
        medium: "18px",
        large: "24px",
        xlarge: "32px",
      },
      fontFamily: {
        medium: 500,
        bold: 700,
        black: 900,
      },
    },
  },
  plugins: [],
};
