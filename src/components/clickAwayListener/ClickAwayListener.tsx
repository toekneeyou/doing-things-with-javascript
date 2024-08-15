import { PropsWithChildren, ReactNode, useEffect, useRef } from "react";
import { classnames } from "../../lib/util/classnames";

interface ClickAwayListenerProps extends PropsWithChildren {
  onClickAway: () => void;
  className?: string;
}

export default function ClickAwayListener({
  children,
  onClickAway,
  className,
}: ClickAwayListenerProps) {
  const clickAwayListenerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        clickAwayListenerRef.current &&
        !clickAwayListenerRef.current.contains(event.target as Node)
      ) {
        onClickAway();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickAway]);

  return (
    <div
      ref={clickAwayListenerRef}
      className={classnames("click-away-listener", className)}
    >
      {children}
    </div>
  );
}
