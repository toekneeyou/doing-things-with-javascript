import { ReactNode } from "react";
import { classnames } from "../../lib/util/classnames";

interface VisualizationLayoutProps {
  visual?: ReactNode;
  infoPanel?: ReactNode;
  optionsPanel?: ReactNode;
}

export default function VisualizationLayout({
  visual,
  infoPanel,
  optionsPanel,
}: VisualizationLayoutProps) {
  return (
    <div
      className={classnames(
        "visualization-layout",
        "w-full flex flex-col",
        "text-sm 2xl:text-base",
        "min-h-screen lg:h-screen",
        "overflow-y-auto md:overflow-hidden"
      )}
    >
      <div
        className={classnames(
          "visualization-layout__top",
          "flex-grow flex overflow-hidden",
          "flex-col lg:flex-row"
        )}
      >
        {infoPanel}

        <div
          className={classnames(
            "visualization-layout__visual__content",
            "flex-grow centered flex-col bg-[rgba(0,0,0,0.2)]",
            "p-8 lg:p-0"
          )}
        >
          {visual}
        </div>
      </div>

      {optionsPanel}
    </div>
  );
}
