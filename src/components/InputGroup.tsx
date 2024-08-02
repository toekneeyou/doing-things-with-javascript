import React, { useId } from "react";
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
  const id = useId();

  return (
    <div
      className={classnames(
        "input-group",
        "flex flex-col min-w-40",
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
        aria-label={label}
        id={inputAttributes.id ?? id}
        className={classnames(
          "input",
          "w-full border-app-yellow border-2 rounded-3xl bg-app-slate-blue text-white px-4 py-2 focus:outline-none",
          inputClassName
        )}
        {...inputAttributes}
      />
    </div>
  );
}
