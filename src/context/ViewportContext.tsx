import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 *
 *
 * Context Creation
 *
 *
 */
type ViewportSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | null;
interface ViewportContextValue {
  viewportSize: ViewportSize;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
const ViewportStateContext = createContext<ViewportContextValue | null>(null);
/**
 *
 *
 * Context Provider component
 *
 *
 */
export const smViewport = 640;
export const mdViewport = 768;
export const lgViewport = 1024;
export const xlViewport = 1280;
export const xxlViewport = 1536;
export default function ViewportContextProvider({
  children,
}: PropsWithChildren) {
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

  const stateValue = useMemo(
    () => ({
      viewportSize,
      isMobile: viewportSize === "xs" || viewportSize === "sm",
      isTablet: viewportSize === "md",
      isDesktop:
        viewportSize === "lg" ||
        viewportSize === "xl" ||
        viewportSize === "xxl",
    }),
    [viewportSize]
  );

  return (
    <ViewportStateContext.Provider value={stateValue}>
      {children}
    </ViewportStateContext.Provider>
  );
}
/**
 *
 *
 * Hook to consume context
 *
 *
 */
export const useViewportStateContext = () => {
  const context = useContext(ViewportStateContext);
  if (!context) throw Error("useViewportStateContext");
  return context;
};
