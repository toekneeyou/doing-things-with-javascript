import { ReactNode } from "react";
import { classnames } from "../../util/classnames";

interface BadgeProps {
  children: ReactNode;
  size: "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
  label?: string;
}

export default function Badge({
  size = "sm",
  children,
  className,
  label,
}: BadgeProps) {
  return (
    <div
      aria-label={label}
      aria-live="polite"
      className={classnames(
        "badge",
        "centered rounded-full bg-app-slate-blue transition-all",
        {
          "h-4 w-4": size === "sm",
          "h-8 w-8": size === "md",
          "h-12 w-12": size === "lg",
          "h-16 w-16": size === "xl",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
