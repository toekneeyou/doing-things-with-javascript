import {
  ChangeEventHandler,
  createContext,
  PropsWithChildren,
  useContext,
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
interface DebounceStateContextValue {
  isLeading: boolean;
  isTrailing: boolean;
  wait: string;
}

interface DebounceActionContextValue {
  handleLeading: ChangeEventHandler<HTMLInputElement>;
  handleTrailing: ChangeEventHandler<HTMLInputElement>;
  handleWait: ChangeEventHandler<HTMLInputElement>;
}
const DebounceStateContext = createContext<DebounceStateContextValue | null>(
  null
);
DebounceStateContext.displayName = "DebounceState";
const DebounceActionContext = createContext<DebounceActionContextValue | null>(
  null
);
DebounceActionContext.displayName = "DebounceAction";
/**
 *
 *
 * Context Provider component
 *
 *
 */
export default function DebounceContextProvider({
  children,
}: PropsWithChildren) {
  const [isLeading, setIsLeading] = useState(false);
  const [isTrailing, setIsTrailing] = useState(true);
  const [wait, setWait] = useState("1000");

  const handleLeading: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsLeading(e.target.checked);
  };

  const handleTrailing: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsTrailing(e.target.checked);
  };

  const handleWait: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWait(e.target.value);
  };

  const actionValue: DebounceActionContextValue = useMemo(
    () => ({
      handleLeading,
      handleTrailing,
      handleWait,
    }),
    []
  );

  const stateValue: DebounceStateContextValue = {
    isLeading,
    isTrailing,
    wait,
  };

  return (
    <DebounceActionContext.Provider value={actionValue}>
      <DebounceStateContext.Provider value={stateValue}>
        {children}
      </DebounceStateContext.Provider>
    </DebounceActionContext.Provider>
  );
}
/**
 *
 *
 * Hooks to consume context
 *
 *
 */
export const useDebounceStateContext = () => {
  const context = useContext(DebounceStateContext);
  if (!context) throw Error("useDebounceStateContext");
  return context;
};

export const useDebounceActionContext = () => {
  const context = useContext(DebounceActionContext);
  if (!context) throw Error("useDebounceActionContext");
  return context;
};
