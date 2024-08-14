import { ReactNode } from "react";
import { classnames } from "../../util/classnames";

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
        "lg:h-screen lg:overflow-auto"
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
            "flex-grow flex flex-col bg-[rgba(0,0,0,0.2)]"
          )}
        >
          {visual}
        </div>
      </div>

      {optionsPanel}
    </div>
  );
}
