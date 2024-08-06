import { ReactNode } from "react";
import { classnames } from "../../util/classnames";

interface InfoBarProps {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function InfoBar({ icon, children, className }: InfoBarProps) {
  return (
    <div
      className={classnames(
        "info-bar",
        "flex items-center gap-x-6 px-6 py-4 bg-app-dark-blue",
        className
      )}
    >
      {icon !== undefined && icon}
      {children}
    </div>
  );
}
