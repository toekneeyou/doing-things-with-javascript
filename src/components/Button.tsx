import { ReactNode } from "react";
import { classnames } from "../util/classnames";
import {
  darkBlue,
  error,
  fadedBlue,
  slateBlue,
  yellow,
} from "../../tailwind.config";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  className?: string;
  variant?: "filled" | "outlined" | "text";
  color?:
    | typeof yellow
    | typeof slateBlue
    | typeof error
    | typeof darkBlue
    | typeof fadedBlue;
}

export default function Button({
  children,
  className,
  variant = "filled",
  color = yellow,
  ...buttonAttributes
}: ButtonProps) {
  const isFilled = variant === "filled";
  const isBordered = variant === "outlined";

  return (
    <button
      className={classnames(
        "button",
        "centered w-max h-10 border-2 border-app px-4 rounded-full whitespace-nowrap text-app-dark-blue font-semibold transition-transform",
        "disabled:bg-gray-600 disabled:pointer-events-none",
        "active:translate-y-1 active:scale-[.99]",
        {
          "bg-app-yellow": isFilled && color === yellow,
          "bg-app-error": isFilled && color === error,
          "bg-app-slate-blue": isFilled && color === slateBlue,
          "bg-app-dark-blue": isFilled && color === darkBlue,
          "bg-app-faded-blue": isFilled && color === fadedBlue,
          "bg-transparent": !isFilled,
        },
        {
          "border-app-yellow": isBordered && color === yellow,
          "border-app-error": isBordered && color === error,
          "border-app-slate-blue": isBordered && color === slateBlue,
          "border-app-dark-blue": isBordered && color === darkBlue,
          "border-app-faded-blue": isBordered && color === fadedBlue,
          "border-transparent": !isBordered,
        },
        className
      )}
      {...buttonAttributes}
    >
      {children}
    </button>
  );
}
