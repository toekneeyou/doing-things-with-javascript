import { ReactNode, useId, useLayoutEffect, useRef, useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { classnames } from "../../util/classnames";

interface AccordionProps {
  accordionClassName?: string;
  accordionTitleClassName?: string;
  accordionBodyClassName?: string;
  title: ReactNode;
  children: ReactNode;
  defaultIsExpanded?: boolean;
}

export default function Accordion({
  accordionClassName,
  accordionTitleClassName,
  accordionBodyClassName,
  title,
  children,
  defaultIsExpanded = false,
}: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultIsExpanded);
  const [maxHeight, setMaxHeight] = useState<number>();
  const accordionBodyRef = useRef<HTMLDivElement>(null);
  const tabId = useId();
  const panelId = useId();

  const toggleAccordion = () => {
    setIsExpanded((p) => !p);
  };

  useLayoutEffect(() => {
    const accordionBodyEl = accordionBodyRef.current!;
    setMaxHeight(isExpanded ? accordionBodyEl.scrollHeight : 0);
  }, [isExpanded]);

  return (
    <div
      className={classnames(
        "accordion",
        "min-h-12 bg-app-dark-blue",
        accordionClassName
      )}
      role="tablist"
    >
      <button
        id={tabId}
        role="tab"
        aria-controls={panelId}
        aria-expanded={isExpanded ? "true" : "false"}
        className={classnames(
          "accordion__title",
          "h-12 w-full flex items-center px-4 justify-between cursor-pointer",
          accordionTitleClassName
        )}
        onClick={toggleAccordion}
      >
        {title}
        <ArrowDropDown
          style={{ transition: "transform", transitionDuration: "300ms" }}
          className={classnames({ "-rotate-180": isExpanded })}
        />
      </button>
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId}
        className={classnames(
          "accordion__body",
          "bg-app-faded-blue transition-all duration-300 ease-in-out overflow-hidden",
          accordionBodyClassName
        )}
        ref={accordionBodyRef}
        style={{
          maxHeight,
        }}
      >
        {children}
      </div>
    </div>
  );
}
