import { ReactNode } from "react";
import { classnames } from "../util/classnames";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  className?: string;
}

export default function Button({
  children,
  className,
  ...buttonAttributes
}: ButtonProps) {
  return (
    <button
      className={classnames(
        "button",
        "centered w-max h-10 px-4 bg-app-yellow rounded-full whitespace-nowrap text-app-dark-blue font-semibold transition-transform",
        "disabled:bg-gray-600",
        "active:translate-y-1 active:scale-[.99]",
        className
      )}
      {...buttonAttributes}
    >
      {children}
    </button>
  );
}
