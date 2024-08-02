import React, { ChangeEvent, MouseEventHandler, useId, useRef } from "react";

import { classnames } from "../../util/classnames";
import NumberSpinButtons from "./NumberSpinButtons";

interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "className"
  > {
  label?: string;
  showLabel?: boolean;
  inputGroupClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export default function Input({
  label,
  showLabel,
  inputGroupClassName,
  labelClassName,
  inputClassName,
  ...inputAttributes
}: InputProps) {
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
        "flex flex-col min-w-40 relative",
        inputGroupClassName
      )}
    >
      {showLabel && (
        <label
          className={classnames(
            "label",
            "text-sm translate-x-4 opacity-80",
            labelClassName
          )}
          htmlFor={inputAttributes.id ?? id}
        >
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        aria-label={label}
        id={inputAttributes.id ?? id}
        className={classnames(
          "input",
          "w-full border-app-yellow border-2 rounded-3xl bg-app-slate-blue text-white px-4 h-10",
          "focus:outline-none",
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
