import { RefObject, useEffect, useState } from "react";

interface TooltipPosition {
  top: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
  left: number | undefined;
}

export default function useTooltipPosition(
  anchorRef: RefObject<HTMLDivElement>,
  tooltipRef: RefObject<HTMLDivElement>
) {
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    top: undefined,
    right: undefined,
    bottom: undefined,
    left: undefined,
  });

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      let top: number | undefined;
      let right: number | undefined;
      let bottom: number | undefined;
      let left: number | undefined;
      const anchorEl = anchorRef.current;
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
    });

    observer.observe(document.body);
  }, []);

  return tooltipPosition;
}
