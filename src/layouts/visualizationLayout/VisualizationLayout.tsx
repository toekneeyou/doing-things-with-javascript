import { ReactNode } from "react";
import { InfoOutlined } from "@mui/icons-material";
import { classnames } from "../../util/classnames";
import Tooltip from "../../components/tooltip/Tooltip";
import InputGroup, {
  InputGroupProps,
} from "../../components/inputGroup/InputGroup";
import DropdownGroup, {
  DropdownProps,
} from "../../components/dropdownGroup/DropdownGroup";

export interface VisualizationOptions {
  type: "text" | "number" | "dropdown";
  inputGroupProps?: InputGroupProps;
  dropdownProps?: DropdownProps;
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
              <InfoOutlined />
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
      {options !== undefined && (
        <div
          className={classnames(
            "visualization-layout__options",
            "min-w-64 bg-app-dark-blue"
          )}
        >
          <h2
            className={classnames(
              "debounced-options__header",
              "text-2xl font-bold p-4 text-center border-b-2 border-b-slate-600"
            )}
          >
            Options
          </h2>
          <form
            className={classnames(
              "debounced-options__form",
              "flex flex-col items-start gap-y-6 p-4"
            )}
          >
            {options.map((option) => {
              if (
                (option.type === "text" || option.type === "number") &&
                option.inputGroupProps
              ) {
                return (
                  <InputGroup
                    key={option.inputGroupProps.label}
                    inputGroupClassName="w-full"
                    type={option.type}
                    autoComplete="off"
                    {...option.inputGroupProps}
                  />
                );
              }
              if (option.type === "dropdown" && option.dropdownProps) {
                return (
                  <DropdownGroup
                    key={option.dropdownProps.label}
                    dropdownGroupClassName="w-full"
                    {...option.dropdownProps}
                  />
                );
              }
            })}
          </form>
        </div>
      )}
    </div>
  );
}
