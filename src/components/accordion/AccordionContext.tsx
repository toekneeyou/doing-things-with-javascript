import {
  createContext,
  PropsWithChildren,
  useContext,
  useId,
  useMemo,
  useState,
} from "react";

interface AccordionContextValue {
  isExpanded: boolean;
  tabId: string;
  panelId: string;
  toggleAccordion: () => void;
}
const AccordionContext = createContext<AccordionContextValue | null>(null);
AccordionContext.displayName = "Accordion";

interface AccordionContextProviderProps extends PropsWithChildren {
  initialIsExpanded?: boolean;
}

const AccordionContextProvider: React.FC<AccordionContextProviderProps> = ({
  children,
  initialIsExpanded,
}) => {
  const [isExpanded, setIsExpanded] = useState(Boolean(initialIsExpanded));

  const tabId = useId();
  const panelId = useId();

  const value: AccordionContextValue = useMemo(
    () => ({
      isExpanded,
      tabId,
      panelId,
      toggleAccordion: () => {
        setIsExpanded((p) => !p);
      },
    }),
    [isExpanded]
  );

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("useAccordionContext");
  return context;
};

export default AccordionContextProvider;
