import { ReactNode, useEffect, useRef } from "react";
import { classnames } from "../../util/classnames";

interface ClickAwayListenerProps {
  onClickAway: () => void;
  children: ReactNode;
}

export default function ClickAwayListener({
  children,
  onClickAway,
}: ClickAwayListenerProps) {
  const clickAwayListenerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
      className={classnames("click-away-listener")}
    >
      {children}
    </div>
  );
}
