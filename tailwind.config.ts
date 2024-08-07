import { Config } from "tailwindcss";

export const yellow = "#f8e019";
export const black = "#0d0d0d";
export const slateBlue = "#262a32";
export const darkBlue = "#202225";
export const fadedBlue = "#3d4047";
export const error = "#ef4444";

const config: Config = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        yellowRing: {
          "0%": { border: "4px solid transparent" },
          "50%": { border: `4px solid ${yellow}` },
          "100%": { border: "4px solid transparent" },
        },
      },
      animation: {
        slideRight: "slideRight 500ms linear forwards", // You can set a default duration and fill mode here
        yellowRing: "yellowRing 300ms linear forwards",
      },
      colors: {
        "app-yellow": yellow,
        "app-black": black,
        "app-slate-blue": slateBlue,
        "app-dark-blue": darkBlue,
        "app-faded-blue": fadedBlue,
        "app-error": error,
      },
    },
  },
  plugins: [],
};

export default config;
