import { ReactNode } from "react";
import { classnames } from "../../util/classnames";

interface VisualizationInfoPanelProps {
  title: string;
  description: ReactNode;
  optionsDescription: ReactNode;
}

export default function VisualizationInfoPanel({
  title,
  description,
  optionsDescription,
}: VisualizationInfoPanelProps) {
  return (
    <div
      className={classnames(
        "visualization-info-panel",
        "bg-[rgba(0,0,0,0.05)] h-full flex flex-col w-96"
      )}
    >
      <div
        className={classnames(
          "visualization-info-panel__header",
          "p-8 pt-16 space-y-2"
        )}
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        <p
          className={classnames(
            "visualization-info-panel__description",
            "text-gray-400"
          )}
        >
          {description}
        </p>
      </div>

      <hr className="border-slate-600" />

      <div
        className={classnames(
          "visualization-info-panel__details",
          "flex-grow flex flex-col p-8 gap-y-4 overflow-y-auto"
        )}
      >
        <h3 className="text-2xl font-bold">Options</h3>
        <div className="flex-grow overflow-auto">{optionsDescription}</div>
      </div>
    </div>
  );
}
