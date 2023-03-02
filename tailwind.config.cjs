/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#4d3ec2",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#171b1e",
          "base-100": "#07090a",
          "base-200": "#181818",
          "base-content": "#fff",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require('@tailwindcss/line-clamp'),],
};

module.exports = config;
