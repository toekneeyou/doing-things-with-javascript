import { useEffect, useState } from "react";

export const smViewport = 640;
export const mdViewport = 768;
export const lgViewport = 1024;
export const xlViewport = 1280;
export const xxlViewport = 1536;

type ViewportSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | null;

export default function useViewport() {
  const calculateViewportSize = () => {
    const { innerWidth } = window;
    if (innerWidth >= xxlViewport) {
      return "xxl";
    } else if (innerWidth >= xlViewport) {
      return "xl";
    } else if (innerWidth >= lgViewport) {
      return "lg";
    } else if (innerWidth >= mdViewport) {
      return "md";
    } else if (innerWidth >= smViewport) {
      return "sm";
    } else {
      return "xs";
    }
  };

  const [viewportSize, setViewportSize] = useState<ViewportSize>(
    calculateViewportSize()
  );

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setViewportSize(calculateViewportSize());
    });

    observer.observe(document.documentElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return viewportSize;
}
