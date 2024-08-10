import DropdownGroup from "../../components/dropdownGroup/DropdownGroup";
import InputGroup from "../../components/inputGroup/InputGroup";
import SwitchGroup from "../../components/switchGroup/SwitchGroup";
import { classnames } from "../../util/classnames";
import { VisualizationOptions } from "./VisualizationLayout";

interface VisualizationOptionsPanelProps {
  options: VisualizationOptions[];
}

export default function VisualizationOptionsPanel({
  options,
}: VisualizationOptionsPanelProps) {
  return (
    <div
      className={classnames(
        "visualization-options-panel",
        "w-52  bg-app-dark-blue"
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
          "flex flex-col items-start gap-y-8 p-4"
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
          if (option.type === "switch" && option.switchGroupProps) {
            return (
              <SwitchGroup
                key={option.switchGroupProps.label}
                switchGroupClassName="w-full between"
                {...option.switchGroupProps}
              />
            );
          }
        })}
      </form>
    </div>
  );
}
