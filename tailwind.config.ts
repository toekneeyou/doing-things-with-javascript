import { Config } from "tailwindcss";

export const yellow = "#f8e019";
export const black = "#0d0d0d";
export const slateBlue = "#262a32";
export const darkBlue = "#202225";
export const fadedBlue = "#3d4047";

const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-yellow": yellow,
        "app-black": black,
        "app-slate-blue": slateBlue,
        "app-dark-blue": darkBlue,
        "app-faded-blue": fadedBlue,
      },
    },
  },
  plugins: [],
};

export default config;
