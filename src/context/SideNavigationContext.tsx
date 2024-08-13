import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import useViewport from "../hooks/useViewport";

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

interface SideNavigationContextProviderProps {
  children: ReactNode;
}

interface SideNavigationValueProviderProps
  extends SideNavigationContextProviderProps {
  values: SideNavigationValue;
}

interface SideNavigationActionProviderProps
  extends SideNavigationContextProviderProps {
  actions: SideNavigationAction;
}

const SideNavigationValueProvider = ({
  children,
  values,
}: SideNavigationValueProviderProps) => (
  <SideNavigationValueContext.Provider value={values}>
    {children}
  </SideNavigationValueContext.Provider>
);

const SideNavigationActionProvider = ({
  children,
  actions,
}: SideNavigationActionProviderProps) => (
  <SideNavigationActionContext.Provider value={actions}>
    {children}
  </SideNavigationActionContext.Provider>
);

export default function SideNavigationContextProvider({
  children,
}: SideNavigationContextProviderProps) {
  const viewportSize = useViewport();
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
    <SideNavigationValueProvider values={values}>
      <SideNavigationActionProvider actions={actions}>
        {children}
      </SideNavigationActionProvider>
    </SideNavigationValueProvider>
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
