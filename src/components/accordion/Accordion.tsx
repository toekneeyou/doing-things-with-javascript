import { ReactNode, useId, useRef, useState } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { classnames } from "../../util/classnames";

interface AccordionProps {
  accordionClassName?: string;
  accordionTitleClassName?: string;
  accordionBodyClassName?: string;
  title: ReactNode;
  children: ReactNode;
}

export default function Accordion({
  accordionClassName,
  accordionTitleClassName,
  accordionBodyClassName,
  title,
  children,
}: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const accordionBodyRef = useRef<HTMLDivElement>(null);
  const tabId = useId();
  const panelId = useId();

  const toggleAccordion = () => {
    setIsExpanded((p) => !p);
  };

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
          "h-12 flex items-center px-4 justify-between cursor-pointer",
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
          maxHeight: isExpanded ? accordionBodyRef.current?.scrollHeight : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
