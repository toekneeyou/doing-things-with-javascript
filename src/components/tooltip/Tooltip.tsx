import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { classnames } from "../../lib/util/classnames";
import useDebounce from "../../lib/hooks/useDebounce";
import { PropsWithClassNameAndChildren } from "../../lib/types";

type TooltipPosition = "top" | "right" | "bottom" | "left";

export interface TooltipProps extends PropsWithClassNameAndChildren {
  content: ReactNode | string;
}

export default function Tooltip({
  children,
  content,
  className,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const anchorElRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState<
    Record<TooltipPosition, number | undefined>
  >({
    top: undefined,
    right: undefined,
    bottom: undefined,
    left: undefined,
  });

  useEffect(() => {
    const calculatePosition = () => {
      let top: number | undefined;
      let right: number | undefined;
      let bottom: number | undefined;
      let left: number | undefined;
      const anchorEl = anchorElRef.current;
      const tooltipEl = tooltipRef.current;

      if (anchorEl && tooltipEl) {
        const {
          top: anchorTop,
          left: anchorLeft,
          height: anchorHeight,
          width: anchorWidth,
        } = anchorEl.getBoundingClientRect();
        const { height: tooltipHeight, width: tooltipWidth } =
          tooltipEl.getBoundingClientRect();
        // tooltip's default position is to the bottom and right of the anchor element
        top = anchorTop + anchorHeight;
        left = anchorLeft + anchorWidth;
        // if the tooltip flows out of the right window boundary, move it to the left
        if (left + tooltipWidth > window.innerWidth) {
          left = anchorLeft - tooltipWidth;
        }
        // if the tooltip flows out of the lower window boundary, move it to the top
        if (top + tooltipHeight > window.innerHeight) {
          top = anchorTop - tooltipHeight;
        }
      }

      setTooltipPosition({
        top,
        left,
        right,
        bottom,
      });
    };

    const observer = new ResizeObserver(() => {
      calculatePosition();
    });

    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  }, [isOpen]);

  // add a short delay before closing so users can mouse over the tooltip if they want to
  const debouncedHandleMouseLeave = useDebounce(
    function () {
      setIsOpen(false);
    },
    100,
    { isLeading: false, isTrailing: true, isCancellable: true }
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
    <div className={classnames("tooltip", "centered relative", className)}>
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
            "z-20 w-[max-content] max-w-72 bg-app-dark-blue p-4 rounded-3xl transition-opacity text-white",
            {
              "opacity-0 pointer-events-none select-none": !isOpen,
              "opacity-95": isOpen,
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
