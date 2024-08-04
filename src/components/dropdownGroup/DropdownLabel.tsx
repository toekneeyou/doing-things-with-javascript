import { InfoOutlined } from "@mui/icons-material";
import { classnames } from "../../util/classnames";
import Tooltip, { TooltipProps } from "../tooltip/Tooltip";

interface DropdownLabelProps {
  labelClassName?: string;
  label: string;
  id: string;
  tooltipProps?: Omit<TooltipProps, "children">;
}

export default function DropdownLabel({
  labelClassName,
  id,
  label,
  tooltipProps,
}: DropdownLabelProps) {
  return (
    <div
      className={classnames(
        "dropdown-label",
        "translate-x-4 flex items-center justify-start"
      )}
    >
      <label
        className={classnames(
          "dropdown-label__label",
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
            "dropdown-label__tooltip",
            "ml-1 -translate-y-[2px]"
          )}
          {...tooltipProps}
        >
          <InfoOutlined style={{ fontSize: "16px" }} />
        </Tooltip>
      )}
    </div>
  );
}
