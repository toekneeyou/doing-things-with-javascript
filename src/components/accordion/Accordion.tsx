import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { classnames } from "../../lib/util/classnames";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  PropsWithClassName,
  PropsWithClassNameAndChildren,
} from "../../lib/types";
import AccordionProvider, { useAccordionContext } from "./AccordionContext";
/**
 * Accordion With Provider
 */
interface AccordionProps extends PropsWithClassName {
  initialIsExpanded?: boolean;
  tab: ReactNode;
  panel: ReactNode;
}
const Accordion = ({ initialIsExpanded, tab, panel }: AccordionProps) => {
  return (
    <AccordionProvider initialIsExpanded={initialIsExpanded}>
      <AccordionWithoutProvider tab={tab} panel={panel} />
    </AccordionProvider>
  );
};
/**
 * Accordion Without Provider
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
 * Accordion Tab
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
        className={classnames(
          "size-4 text-white transition-transform duration-300",
          {
            "-rotate-180": isExpanded,
          }
        )}
      />
    </button>
  );
};
/**
 * Accordion Panel
 */
const AccordionPanel: React.FC<PropsWithClassNameAndChildren> = ({
  className,
  children,
}) => {
  const [maxHeight, setMaxHeight] = useState<number>();
  const { panelId, tabId, isExpanded } = useAccordionContext();
  const accordionPanelRef = useRef<HTMLDivElement>(null);
  /**
   * Calculate maxHeight for the panel since transitions require an explicit value.
   */
  useEffect(() => {
    const accordionPanelEl = accordionPanelRef.current;

    if (!accordionPanelEl) return;

    const observer = new ResizeObserver(() => {
      /**
       * scrollHeight is the total height of an element including overflow.
       */
      setMaxHeight(isExpanded ? accordionPanelEl.scrollHeight : 0);
    });

    observer.observe(accordionPanelEl);

    return () => {
      observer.disconnect();
    };
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
