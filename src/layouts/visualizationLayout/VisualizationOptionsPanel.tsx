import { classnames } from "../../lib/util/classnames";
import { PropsWithChildren } from "react";

export default function VisualizationOptionsPanel({
  children,
}: PropsWithChildren) {
  return (
    <div
      className={classnames(
        "visualization-options-panel",
        "w-full lg:bg-[rgba(0,0,0,0.15)]"
      )}
    >
      <form
        className={classnames(
          "debounced-options__form",
          "centered gap-x-6 lg:h-16",
          "flex flex-col lg:flex-row",
          "gap-y-8 lg:gap-y-0"
        )}
      >
        {children}
      </form>
    </div>
  );
}
