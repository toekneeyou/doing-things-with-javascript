import { ReactNode } from "react";
import { classnames } from "../../util/classnames";

interface VisualizationInfoProps {
  title: string;
  description: ReactNode;
  moreInfo: ReactNode;
}

export default function VisualizationInfo({
  title,
  description,
  moreInfo,
}: VisualizationInfoProps) {
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
      {moreInfo !== undefined && (
        <>
          <hr className="border-slate-600" />
          <div
            className={classnames(
              "visualization-info-panel__details",
              "flex-grow flex flex-col p-8 gap-y-4 overflow-y-auto"
            )}
          >
            <h3 className="text-2xl font-bold">More Info</h3>
            <div className="flex-grow overflow-auto">{moreInfo}</div>
          </div>
        </>
      )}
    </div>
  );
}
