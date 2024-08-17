import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { useViewportStateContext } from "./ViewportContext";
/**
 *
 *
 * Context Creation
 *
 *
 */
const SideNavigationValueContext = createContext<SideNavigationValue | null>(
  null
);
SideNavigationValueContext.displayName = "SideNavigationValue";
const SideNavigationActionContext = createContext<SideNavigationAction | null>(
  null
);
SideNavigationActionContext.displayName = "SideNavigationAction";
interface SideNavigationValue {
  isShowing: boolean;
}
interface SideNavigationAction {
  toggleSideNavigation: () => void;
}
/**
 *
 *
 * Context Provider component
 *
 *
 */
const SideNavigationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isDesktop } = useViewportStateContext();
  const [isShowing, setIsShowing] = useState(isDesktop);

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
};
/**
 *
 *
 * Hooks to consume context
 *
 *
 */
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

export default SideNavigationProvider;
