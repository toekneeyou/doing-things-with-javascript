import { useEffect, useRef } from "react";
import { classnames } from "../../lib/util/classnames";
import { PropsWithClassNameAndChildren } from "../../lib/types";

interface ClickAwayListenerProps extends PropsWithClassNameAndChildren {
  onClickAway: () => void;
}

const ClickAwayListener: React.FC<ClickAwayListenerProps> = ({
  children,
  onClickAway,
  className,
}) => {
  /**
   * clickAwayListenerRef is used as reference in outside click detection
   */
  const clickAwayListenerRef = useRef<HTMLDivElement>(null);
  /**
   * This effects adds an event listener to the document to listen for clicks outside the wrapped element
   */
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
};

export default ClickAwayListener;
