import React, { ChangeEvent, MouseEventHandler, useId, useRef } from "react";

import { classnames } from "../../lib/util/classnames";
import NumberSpinButtons from "./NumberSpinButtons";
import { TooltipProps } from "../tooltip/Tooltip";
import InputLabel from "./InputLabel";

export interface InputGroupProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "className"
  > {
  label?: string;
  showLabel?: boolean;
  labelPosition?: "top" | "left";
  inputGroupClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  tooltipProps?: Omit<TooltipProps, "children">;
}

export default function InputGroup({
  tooltipProps,
  label,
  showLabel,
  inputGroupClassName,
  labelClassName,
  inputClassName,
  labelPosition = "left",
  ...inputAttributes
}: InputGroupProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  /**
   * Creates a ChangeEvent to pass onto ChangeEvent handlers
   *
   * @returns {ChangeEvent<HTMLInputElement>}
   */
  const createChangeEvent = (): ChangeEvent<HTMLInputElement> => {
    const event = new Event("change");
    Object.defineProperty(event, "target", {
      writable: true,
      value: inputRef.current!,
    });
    return event as unknown as ChangeEvent<HTMLInputElement>;
  };

  /**
   * Increments number-type inputs by `step` if lesser than or equal to `max`.
   *
   * @param e
   */
  const handleIncrement: MouseEventHandler = (e) => {
    e.preventDefault();
    const { onChange, step = 1 } = inputAttributes;
    if (onChange) {
      const inputEl = inputRef.current!;
      const newValue = Number(inputEl.value) + Number(step);
      const isLesserThanOrEqualToMax =
        newValue <=
        (inputAttributes.max !== undefined
          ? Number(inputAttributes.max)
          : Infinity);
      if (isLesserThanOrEqualToMax) {
        inputEl.value = String(newValue);
        const changeEvent = createChangeEvent();
        onChange(changeEvent);
      }
    }
  };

  /**
   * Decrements number-type inputs by `step` if greater than or equal to `min`.
   *
   * @param e
   */
  const handleDecrement: MouseEventHandler = (e) => {
    e.preventDefault();
    const { onChange, step = 1 } = inputAttributes;
    if (onChange) {
      const inputEl = inputRef.current!;
      const newValue = Number(inputEl.value) - Number(step);
      const isGreaterThanOrEqualToMin =
        newValue >=
        (inputAttributes.min !== undefined
          ? Number(inputAttributes.min)
          : -Infinity);
      if (isGreaterThanOrEqualToMin) {
        inputEl.value = String(newValue);
        const changeEvent = createChangeEvent();
        onChange(changeEvent);
      }
    }
  };

  return (
    <div
      className={classnames(
        "input-group",
        "flex min-w-40 relative",
        {
          "gap-x-1": labelPosition === "left",
          "flex-col gap-y-1": labelPosition === "top",
        },
        inputGroupClassName
      )}
    >
      {showLabel && label !== undefined && (
        <InputLabel
          id={inputAttributes.id ?? id}
          tooltipProps={tooltipProps}
          labelClassName={labelClassName}
          label={label}
        />
      )}
      <input
        ref={inputRef}
        aria-label={label}
        id={inputAttributes.id ?? id}
        className={classnames(
          "input",
          "w-full border-slate-600 border-2 rounded-3xl bg-app-slate-blue text-white px-4 h-10",
          "focus:outline-none focus:border-app-yellow",
          "disabled:opacity-50",
          inputClassName
        )}
        {...inputAttributes}
      />

      {inputAttributes.type === "number" && (
        <NumberSpinButtons
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          disabled={inputAttributes.disabled ?? false}
        />
      )}
    </div>
  );
}
