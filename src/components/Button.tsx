import { forwardRef, LegacyRef, ReactNode } from "react";
import { classnames } from "../util/classnames";
import {
  darkBlue,
  error,
  fadedBlue,
  slateBlue,
  yellow,
} from "../../tailwind.config";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  className?: string;
  variant?:
    | "filled"
    | "outlined"
    | "text"
    | "icon-filled"
    | "icon-outlined"
    | "icon";
  color?:
    | typeof yellow
    | typeof slateBlue
    | typeof error
    | typeof darkBlue
    | typeof fadedBlue
    | "white";
}

const Button = forwardRef(
  (
    {
      children,
      className,
      variant = "filled",
      color = yellow,
      ...buttonAttributes
    }: ButtonProps,
    ref: LegacyRef<HTMLButtonElement>
  ) => {
    const isFilled = variant === "filled" || variant === "icon-filled";
    const isBordered = variant === "outlined" || variant === "icon-outlined";
    const isText = variant === "text";
    const isIcon =
      variant === "icon" ||
      variant === "icon-filled" ||
      variant === "icon-outlined";

    return (
      <button
        ref={ref}
        className={classnames(
          "button",
          "centered  border-2 border-app rounded-full whitespace-nowrap text-app-dark-blue font-semibold transition-transform",
          "disabled:pointer-events-none disabled:grayscale disabled:opacity-50",
          "active:translate-y-1 active:scale-[.99]",
          { "gap-x-2 h-10 px-4": !isIcon, "h-10 w-10": isIcon },
          {
            "bg-app-yellow": isFilled && color === yellow,
            "bg-app-error": isFilled && color === error,
            "bg-app-slate-blue": isFilled && color === slateBlue,
            "bg-app-dark-blue": isFilled && color === darkBlue,
            "bg-app-faded-blue": isFilled && color === fadedBlue,
            "bg-white": isFilled && color === "white",
            "bg-transparent": !isFilled,
          },
          {
            "border-app-yellow": isBordered && color === yellow,
            "border-app-error": isBordered && color === error,
            "border-app-slate-blue": isBordered && color === slateBlue,
            "border-app-dark-blue": isBordered && color === darkBlue,
            "border-app-faded-blue": isBordered && color === fadedBlue,
            "border-white": isBordered && color === "white",
            "border-transparent": !isBordered,
          },
          {
            "text-app-yellow": (isBordered || isText) && color === yellow,
            "text-app-error": (isBordered || isText) && color === error,
            "text-app-slate-blue":
              (isBordered || isText) && color === slateBlue,
            "text-app-dark-blue": (isBordered || isText) && color === darkBlue,
            "text-app-faded-blue":
              (isBordered || isText) && color === fadedBlue,
            "text-white": (isBordered || isText) && color === "white",
            "border-transparent": !(isBordered || isText),
          },

          className
        )}
        {...buttonAttributes}
      >
        {children}
      </button>
    );
  }
);

export default Button;
