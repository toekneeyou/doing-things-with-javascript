import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { useViewportStateContext } from "./ViewportContext";

const SideNavigationValueContext = createContext<SideNavigationValue | null>(
  null
);
const SideNavigationActionContext = createContext<SideNavigationAction | null>(
  null
);

interface SideNavigationValue {
  isShowing: boolean;
}

interface SideNavigationAction {
  toggleSideNavigation: () => void;
}

export default function SideNavigationContextProvider({
  children,
}: PropsWithChildren) {
  const viewportSize = useViewportStateContext();
  const [isShowing, setIsShowing] = useState(
    viewportSize === "lg" || viewportSize === "xl" || viewportSize === "xxl"
  );

  const actions = useMemo(
    () => ({
      toggleSideNavigation: () => setIsShowing((p) => !p),
    }),
    [setIsShowing]
  );

  const values = useMemo(
    () => ({
      isShowing,
    }),
    [isShowing]
  );

  return (
    <SideNavigationValueContext.Provider value={values}>
      <SideNavigationActionContext.Provider value={actions}>
        {children}
      </SideNavigationActionContext.Provider>
    </SideNavigationValueContext.Provider>
  );
}

export const useSideNavigationValueContext = () => {
  const values = useContext(SideNavigationValueContext);
  if (!values) throw Error("useSideNavigationValueContext error");
  return values;
};

export const useSideNavigationActionContext = () => {
  const actions = useContext(SideNavigationActionContext);
  if (!actions) throw Error("useSideNavigationActionContext error");
  return actions;
};
