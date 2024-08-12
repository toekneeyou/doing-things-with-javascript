import { lazy, ReactNode, Suspense } from "react";
import { classnames } from "../../util/classnames";
import VisualizationInfoPanel from "./VIsualizationInfoPanel";

const VisualizationOptionsPanel = lazy(
  () => import("./VisualizationOptionsPanel")
);

interface VisualizationLayoutProps {
  title: string;
  children?: ReactNode;
  tooltip?: ReactNode;
  options?: ReactNode;
  moreInfo?: ReactNode;
  description?: ReactNode;
  optionsDescription?: ReactNode;
}

export default function VisualizationLayout({
  title,
  children,
  options,
  optionsDescription,
  description,
}: VisualizationLayoutProps) {
  return (
    <div
      className={classnames(
        "visualization-layout",
        "h-screen w-full flex flex-col text-sm 2xl:text-base"
      )}
    >
      <div
        className={classnames(
          "visualization-layout__top",
          "flex-grow flex overflow-hidden"
        )}
      >
        <VisualizationInfoPanel
          title={title}
          description={description}
          optionsDescription={optionsDescription}
        />

        <div
          className={classnames(
            "visualization-layout__visual__content",
            "flex-grow flex flex-col bg-[rgba(0,0,0,0.2)]"
          )}
        >
          {children}
        </div>
      </div>

      <Suspense>
        {options !== undefined && (
          <VisualizationOptionsPanel options={options} />
        )}
      </Suspense>
    </div>
  );
}
