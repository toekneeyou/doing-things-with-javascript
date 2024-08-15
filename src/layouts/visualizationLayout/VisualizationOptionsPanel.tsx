import { classnames } from "../../lib/util/classnames";
import { PropsWithChildren } from "react";

export default function VisualizationOptionsPanel({
  children,
}: PropsWithChildren) {
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
