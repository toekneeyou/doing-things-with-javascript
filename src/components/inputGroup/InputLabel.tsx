import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { classnames } from "../../util/classnames";
import Tooltip, { TooltipProps } from "../tooltip/Tooltip";

interface InputLabelProps {
  labelClassName?: string;
  label: string;
  id: string;
  tooltipProps?: Omit<TooltipProps, "children">;
}

export default function InputLabel({
  labelClassName,
  id,
  label,
  tooltipProps,
}: InputLabelProps) {
  return (
    <div
      className={classnames(
        "input-label",
        "translate-x-4 flex items-center justify-start"
      )}
    >
      <label
        className={classnames(
          "input-label__label",
          "text-sm opacity-80",
          labelClassName
        )}
        htmlFor={id}
      >
        {label}
      </label>
      {tooltipProps !== undefined && (
        <Tooltip
          className={classnames(
            "input-label__tooltip",
            "ml-1"
          )}
          {...tooltipProps}
        >
          <InformationCircleIcon className="size-4 text-white" />
        </Tooltip>
      )}
    </div>
  );
}
