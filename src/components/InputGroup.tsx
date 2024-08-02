import React, { ChangeEvent, MouseEventHandler, useId, useRef } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { classnames } from "../util/classnames";

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

  const createChangeEvent = () => {
    const event = new Event("change");
    Object.defineProperty(event, "target", {
      writable: true,
      value: inputRef.current!,
    });
    return event as unknown as ChangeEvent<HTMLInputElement>;
  };

  const handleIncrement: MouseEventHandler = (e) => {
    e.preventDefault();
    const { onChange } = inputAttributes;
    if (onChange) {
      const inputEl = inputRef.current!;
      const newValue = Number(inputEl.value) + 1;
      const isLesserThanOrEqualToMax =
        newValue <=
        (inputAttributes.max !== undefined
          ? Number(inputAttributes.max)
          : Infinity);
      if (isLesserThanOrEqualToMax) {
        inputEl.value = String(Number(inputEl.value) + 1);
        const changeEvent = createChangeEvent();
        onChange(changeEvent);
      }
    }
  };

  const handleDecrement: MouseEventHandler = (e) => {
    e.preventDefault();
    const { onChange } = inputAttributes;
    if (onChange) {
      const inputEl = inputRef.current!;
      const newValue = Number(inputEl.value) - 1;
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
          "w-full border-app-yellow border-2 rounded-3xl bg-app-slate-blue text-white px-4 h-10 focus:outline-none",
          inputClassName
        )}
        {...inputAttributes}
      />
      {inputAttributes.type === "number" && (
        <div className="flex flex-col absolute bottom-0 right-4">
          <button
            type="button"
            onClick={handleIncrement}
            aria-label="increment"
            className="w-5 h-5 centered"
            autoFocus={false}
          >
            <ArrowDropUpIcon style={{ fontSize: "20px" }} />
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            aria-label="decrement"
            className="w-5 h-5 centered"
            autoFocus={false}
          >
            <ArrowDropDownIcon style={{ fontSize: "20px" }} />
          </button>
        </div>
      )}
    </div>
  );
}
