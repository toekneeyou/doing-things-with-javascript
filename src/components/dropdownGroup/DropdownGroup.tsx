import { useId } from "react";
import { classnames } from "../../util/classnames";
import { TooltipProps } from "../tooltip/Tooltip";
import DropdownLabel from "./DropdownLabel";

export interface DropdownProps
  extends Omit<
    React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    "className"
  > {
  label?: string;
  showLabel?: boolean;
  options: React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  >[];
  labelClassName?: string;
  dropdownGroupClassName?: string;
  selectClassName?: string;
  tooltipProps?: Omit<TooltipProps, "children">;
}

export default function DropdownGroup<T>({
  label,
  showLabel,
  options,
  labelClassName,
  selectClassName,
  dropdownGroupClassName,
  tooltipProps,
  ...selectAttributes
}: DropdownProps) {
  const id = useId();

  return (
    <div
      className={classnames(
        "dropdown-group",
        "min-w-32 flex flex-col gap-y-1",
        dropdownGroupClassName
      )}
    >
      {showLabel && label !== undefined && (
        <DropdownLabel
          labelClassName={labelClassName}
          id={selectAttributes.id ?? id}
          label={label}
          tooltipProps={tooltipProps}
        />
      )}
      <select
        aria-label={label}
        id={selectAttributes.id ?? id}
        className={classnames(
          "dropdown",
          "w-full bg-app-slate-blue border-2 border-slate-600 rounded-3xl px-4 h-10",
          "focus:outline-none focus:border-app-yellow",
          selectClassName
        )}
        {...selectAttributes}
      >
        {options.map(({ ...optionAttributes }) => (
          <option
            {...optionAttributes}
            key={`${optionAttributes.label}-${optionAttributes.value}`}
          />
        ))}
      </select>
    </div>
  );
}
