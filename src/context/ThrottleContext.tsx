import {
  ChangeEventHandler,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

interface ThrottleStateContextValue {
  isLeading: boolean;
  isTrailing: boolean;
  wait: string;
}

interface ThrottleActionContextValue {
  handleLeading: ChangeEventHandler<HTMLInputElement>;
  handleTrailing: ChangeEventHandler<HTMLInputElement>;
  handleWait: ChangeEventHandler<HTMLInputElement>;
}

const ThrottleStateContext = createContext<ThrottleStateContextValue | null>(
  null
);
const ThrottleActionContext = createContext<ThrottleActionContextValue | null>(
  null
);

export default function ThrottleContextProvider({
  children,
}: PropsWithChildren) {
  const [isLeading, setIsLeading] = useState(true);
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

  const actionValue: ThrottleActionContextValue = useMemo(
    () => ({
      handleLeading,
      handleTrailing,
      handleWait,
    }),
    []
  );

  const stateValue: ThrottleStateContextValue = {
    isLeading,
    isTrailing,
    wait,
  };

  return (
    <ThrottleActionContext.Provider value={actionValue}>
      <ThrottleStateContext.Provider value={stateValue}>
        {children}
      </ThrottleStateContext.Provider>
    </ThrottleActionContext.Provider>
  );
}

export const useThrottleStateContext = () => {
  const context = useContext(ThrottleStateContext);
  if (!context) throw Error("useThrottleStateContext");
  return context;
};

export const useThrottleActionContext = () => {
  const context = useContext(ThrottleActionContext);
  if (!context) throw Error("useThrottleActionContext");
  return context;
};
