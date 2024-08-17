import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { classnames } from "../../lib/util/classnames";
import Tooltip, { TooltipProps } from "../tooltip/Tooltip";
import { MouseEventHandler, useId, useRef } from "react";

const SWITCH_TRACK_CLASS = "switch__track";
const SWITCH_THUMB_CLASS = "switch__thumb";
const SWITCH_INPUT_CLASS = "switch__input";

export interface SwitchGroupProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "className" | "type"
  > {
  label?: string;
  showLabel?: boolean;
  switchGroupClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  tooltipProps?: Omit<TooltipProps, "children">;
}

export default function SwitchGroup({
  label,
  showLabel,
  switchGroupClassName,
  inputClassName,
  labelClassName,
  tooltipProps,
  checked,
  onChange,
  ...inputAttributes
}: SwitchGroupProps) {
  const thumbRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const el = e.target as HTMLElement;
    if (
      el.classList.contains(SWITCH_INPUT_CLASS) ||
      el.classList.contains(SWITCH_THUMB_CLASS) ||
      el.classList.contains(SWITCH_TRACK_CLASS)
    ) {
      inputRef.current?.click();
    }
  };

  return (
    <div
      className={classnames(
        "switch-group",
        "relative flex items-center gap-x-standard",
        switchGroupClassName
      )}
    >
      {showLabel && label !== undefined && (
        <div
          className={classnames(
            "switch-group__label",
            "flex items-center gap-x-2 text-sm"
          )}
        >
          {tooltipProps !== undefined && (
            <Tooltip {...tooltipProps}>
              <InformationCircleIcon className="size-4" />
            </Tooltip>
          )}
          <label htmlFor={inputAttributes.id ?? id}>{label}</label>
        </div>
      )}
      <div
        className={classnames("switch", "flex items-center h-4 relative")}
        onClick={handleClick}
      >
        <div
          className={classnames(
            "switch__track",
            "rounded-full w-8 h-3 transition-[background] transition-setting cursor-pointer",
            { "bg-app-faded-blue": !checked, "bg-app-yellow": !!checked }
          )}
        />
        <div
          ref={thumbRef}
          className={classnames(
            "switch__thumb",
            "rounded-full h-5 w-5 bg-white shadow-md cursor-pointer",
            "transition-all transition-setting",
            "absolute",
            {
              "left-0": !checked,
              "left-4": !!checked,
            }
          )}
        />
        <input
          ref={inputRef}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-label={label}
          {...inputAttributes}
          id={inputAttributes.id ?? id}
          className={classnames(
            "switch__input",
            "opacity-0 pointer-events-none absolute"
          )}
        />
      </div>
    </div>
  );
}
