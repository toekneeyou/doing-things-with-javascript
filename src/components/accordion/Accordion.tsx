import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { classnames } from "../../lib/util/classnames";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  PropsWithClassName,
  PropsWithClassNameAndChildren,
} from "../../lib/types";
import AccordionContextProvider, {
  useAccordionContext,
} from "./AccordionContext";
/**
 *
 *
 * Accordion With Provider
 *
 */
interface AccordionProps extends PropsWithClassName {
  initialIsExpanded?: boolean;
  tab: ReactNode;
  panel: ReactNode;
}
const Accordion = ({ initialIsExpanded, tab, panel }: AccordionProps) => {
  return (
    <AccordionContextProvider initialIsExpanded={initialIsExpanded}>
      <AccordionWithoutProvider tab={tab} panel={panel} />
    </AccordionContextProvider>
  );
};
/**
 *
 *
 * Accordion Without Provider
 *
 *
 */
interface AccordionWithoutProviderProps extends PropsWithClassName {
  tab: ReactNode;
  panel: ReactNode;
}
const AccordionWithoutProvider: React.FC<AccordionWithoutProviderProps> = ({
  className,
  tab,
  panel,
}) => {
  return (
    <div
      className={classnames(
        "accordion",
        "min-h-12 bg-app-dark-blue",
        className
      )}
      role="tablist"
    >
      {tab}
      {panel}
    </div>
  );
};
/**
 *
 *
 * Accordion Tab
 *
 */
interface AccordionTabProps extends PropsWithClassName {
  title: ReactNode;
}
const AccordionTab: React.FC<AccordionTabProps> = ({ className, title }) => {
  const { panelId, tabId, isExpanded, toggleAccordion } = useAccordionContext();

  return (
    <button
      id={tabId}
      role="tab"
      aria-controls={panelId}
      aria-expanded={isExpanded ? "true" : "false"}
      className={classnames(
        "accordion-tab",
        "h-12 w-full between px-4 cursor-pointer",
        className
      )}
      onClick={toggleAccordion}
    >
      {title}
      <ChevronDownIcon
        style={{ transition: "transform", transitionDuration: "300ms" }}
        className={classnames("size-4 text-white", {
          "-rotate-180": isExpanded,
        })}
      />
    </button>
  );
};
/**
 *
 *
 * Accordion Panel
 *
 *
 */
const AccordionPanel: React.FC<PropsWithClassNameAndChildren> = ({
  className,
  children,
}) => {
  const [maxHeight, setMaxHeight] = useState<number>();
  const { panelId, tabId, isExpanded } = useAccordionContext();
  const accordionPanelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const accordionBodyEl = accordionPanelRef.current;
    if (accordionBodyEl) {
      setMaxHeight(isExpanded ? accordionBodyEl.scrollHeight : 0);
    }
  }, [isExpanded]);

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      className={classnames(
        "accordion__body-panel faded-blue transition-all transition-setting overflow-hidden",
        className
      )}
      ref={accordionPanelRef}
      style={{
        maxHeight,
      }}
    >
      {children}
    </div>
  );
};

Accordion.Tab = AccordionTab;
Accordion.Panel = AccordionPanel;
export default Accordion;
