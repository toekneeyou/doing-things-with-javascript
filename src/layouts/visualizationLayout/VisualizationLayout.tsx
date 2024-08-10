import { lazy, ReactNode } from "react";
import { classnames } from "../../util/classnames";
import Tooltip from "../../components/tooltip/Tooltip";
import { InputGroupProps } from "../../components/inputGroup/InputGroup";
import { DropdownProps } from "../../components/dropdownGroup/DropdownGroup";
import { SwitchGroupProps } from "../../components/switchGroup/SwitchGroup";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const VisualizationOptionsPanel = lazy(
  () => import("./VisualizationOptionsPanel")
);

export interface VisualizationOptions {
  type: "text" | "number" | "dropdown" | "switch";
  inputGroupProps?: InputGroupProps;
  dropdownProps?: DropdownProps;
  switchGroupProps?: SwitchGroupProps;
}

interface VisualizationLayoutProps {
  title: string;
  children?: ReactNode;
  tooltip?: ReactNode;
  options?: VisualizationOptions[];
}

export default function VisualizationLayout({
  title,
  children,
  tooltip,
  options,
}: VisualizationLayoutProps) {
  return (
    <div className={classnames("visualization-layout", "h-screen w-full flex")}>
      <div
        className={classnames(
          "visualization-layout__visual",
          "flex-grow p-16 relative"
        )}
      >
        <div
          className={classnames(
            "visualization-layout__visual__header",
            "flex items-center justify-start space-x-4",
            "absolute left-16 top-16 z-10"
          )}
        >
          <h1 className="font-bold text-6xl">{title}</h1>
          {tooltip !== undefined && (
            <Tooltip content={<p className="w-full font-normal">{tooltip}</p>}>
              <InformationCircleIcon className="size-6 text-white" />
            </Tooltip>
          )}
        </div>
        <div
          className={classnames(
            "visualization-layout__visual__content",
            "w-full h-full"
          )}
        >
          {children}
        </div>
      </div>
      {options !== undefined && <VisualizationOptionsPanel options={options} />}
    </div>
  );
}
