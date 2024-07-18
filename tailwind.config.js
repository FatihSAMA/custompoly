/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary" : "#21382A",
        "primary-light" : "#97c1a7",
        "foreground" : "#fbfbfb"
      },
      dropShadow : {
        "box" : "0 0 5px rgba(0, 0, 0, .2)",
      },
    },
  },
  plugins: [],
}

