import remToPx from "tailwindcss-rem-to-px";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // si tu as un index.html au root
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#000000",
        dark: {
          light: "#f4f4f4",
          stroke: "#E8E8E8",
        },
      },
      fontSize: {
        base: "14px",
      },
    },
    hidevisually: {
      border: "0",
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px",
    },
  },

  plugins: [
    remToPx({
      baseFontSize: 16,
    }),
  ],
};
