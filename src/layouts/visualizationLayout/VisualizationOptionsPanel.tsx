import { classnames } from "../../lib/util/classnames";
import { ReactNode } from "react";

interface VisualizationOptionsPanelProps {
  children: ReactNode;
}

export default function VisualizationOptionsPanel({
  children,
}: VisualizationOptionsPanelProps) {
  return (
    <div
      className={classnames(
        "visualization-options-panel",
        "w-full bg-[rgba(0,0,0,0.15)]"
      )}
    >
      <form
        className={classnames(
          "debounced-options__form",
          "centered gap-x-6 h-16"
        )}
      >
        {children}
      </form>
    </div>
  );
}
