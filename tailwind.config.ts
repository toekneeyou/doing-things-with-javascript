import { Config } from "tailwindcss";

export const yellow = "#f8e019";
export const black = "#0d0d0d";
export const slateBlue = "#262a32";

const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-yellow": yellow,
        "app-black": black,
        "app-slate-blue": slateBlue,
      },
    },
  },
  plugins: [],
};

export default config;
