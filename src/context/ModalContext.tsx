import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface ModalStateContextValue {
  isOpen: boolean;
  content: ReactNode | null;
}

interface ModalActionContextValue {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

interface ModalStateContextProviderProps {
  value: ModalStateContextValue;
  children: ReactNode;
}

interface ModalActionContextProviderProps {
  value: ModalActionContextValue;
  children: ReactNode;
}

interface ModalContextProviderProps {
  children: ReactNode;
}

const ModalStateContext = createContext<ModalStateContextValue | null>(null);
const ModalActionContext = createContext<ModalActionContextValue | null>(null);

function ModalActionContextProvider({
  value,
  children,
}: ModalActionContextProviderProps) {
  return (
    <ModalActionContext.Provider value={value}>
      {children}
    </ModalActionContext.Provider>
  );
}

function ModalStateContextProvider({
  value,
  children,
}: ModalStateContextProviderProps) {
  return (
    <ModalStateContext.Provider value={value}>
      {children}
    </ModalStateContext.Provider>
  );
}

export default function ModalContextProvider({
  children,
}: ModalContextProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const actionValue: ModalActionContextValue = useMemo(
    () => ({
      openModal: (content: ReactNode) => {
        setContent(content);
        setIsOpen(true);
      },
      closeModal: () => {
        setIsOpen(false);
        setContent(null);
      },
    }),
    []
  );

  const stateValue = {
    isOpen,
    content,
  };

  return (
    <ModalActionContextProvider value={actionValue}>
      <ModalStateContextProvider value={stateValue}>
        {children}
      </ModalStateContextProvider>
    </ModalActionContextProvider>
  );
}

export const useModalStateContext = () => {
  const context = useContext(ModalStateContext);
  if (!context) throw Error("useModalStateContext");
  return context;
};

export const useModalActionContext = () => {
  const context = useContext(ModalActionContext);
  if (!context) throw Error("useModalActionContext");
  return context;
};
