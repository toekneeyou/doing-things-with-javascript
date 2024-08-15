import { classnames } from "../../lib/util/classnames";

interface VerticalDividerProps {
  className?: string;
}

export default function VerticalDivider({ className }: VerticalDividerProps) {
  return (
    <div
      className={classnames(
        "vertical-divider",
        "opacity-10 text-white",
        className
      )}
    >
      |
    </div>
  );
}
