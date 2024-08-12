import {
  ChangeEventHandler,
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

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

interface DebounceStateContextProviderProps {
  value: DebounceStateContextValue;
  children: ReactNode;
}

interface DebounceActionContextProviderProps {
  value: DebounceActionContextValue;
  children: ReactNode;
}

interface DebounceContextProviderProps {
  children: ReactNode;
}

const DebounceStateContext = createContext<DebounceStateContextValue | null>(
  null
);
const DebounceActionContext = createContext<DebounceActionContextValue | null>(
  null
);

function DebounceActionContextProvider({
  value,
  children,
}: DebounceActionContextProviderProps) {
  return (
    <DebounceActionContext.Provider value={value}>
      {children}
    </DebounceActionContext.Provider>
  );
}

function DebounceStateContextProvider({
  value,
  children,
}: DebounceStateContextProviderProps) {
  return (
    <DebounceStateContext.Provider value={value}>
      {children}
    </DebounceStateContext.Provider>
  );
}

export default function DebounceContextProvider({
  children,
}: DebounceContextProviderProps) {
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
    <DebounceActionContextProvider value={actionValue}>
      <DebounceStateContextProvider value={stateValue}>
        {children}
      </DebounceStateContextProvider>
    </DebounceActionContextProvider>
  );
}

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
