import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { classnames } from "../../util/classnames";
import { debounce } from "../../util/debounce";
import { createPortal } from "react-dom";
import useTooltipPosition from "./useTooltipPosition";

type TooltipPosition = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  className?: string;
  children: ReactNode;
  position?: TooltipPosition;
  content: ReactNode | string;
}

export default function Tooltip({
  children,
  position = "bottom",
  content,
  className,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const anchorElRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipPosition = useTooltipPosition(anchorElRef, tooltipRef);

  // add a short delay before closing so users can mouse over the tooltip if they want to
  const debouncedHandleMouseLeave = useCallback(
    debounce(
      function () {
        setIsOpen(false);
      },
      100,
      { isLeading: false, isTrailing: true, isCancellable: true }
    ),
    []
  );

  const handleMouseEnter = () => {
    debouncedHandleMouseLeave.cancel?.();
    setIsOpen(true);
  };

  const handleTooltipPopoverMouseEnter = () => {
    if (isOpen) {
      debouncedHandleMouseLeave.cancel?.();
    }
  };

  return (
    <div className={classnames("tooltip", "centered relative z-20", className)}>
      <div
        ref={anchorElRef}
        className="tooltip-anchor"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={debouncedHandleMouseLeave}
        aria-describedby="tooltip"
      >
        {children}
      </div>
      {createPortal(
        <div
          aria-hidden={isOpen ? "false" : "true"}
          role="tooltip"
          ref={tooltipRef}
          onMouseEnter={handleTooltipPopoverMouseEnter}
          onMouseLeave={debouncedHandleMouseLeave}
          className={classnames(
            "absolute",
            "w-[max-content] max-w-72 bg-app-dark-blue p-4 rounded-3xl transition-opacity text-white",
            {
              "opacity-0 pointer-events-none select-none": !isOpen,
              "opacity-95": isOpen,
              "top-0": position === "bottom",
            }
          )}
          style={{
            ...tooltipPosition,
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </div>
  );
}
