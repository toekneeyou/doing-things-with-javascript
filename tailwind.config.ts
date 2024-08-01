import { Config } from "tailwindcss";

export const yellow = "#f8e019";

const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-yellow": yellow,
      },
    },
  },
  plugins: [],
};

export default config;
