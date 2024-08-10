import { MouseEventHandler } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { classnames } from "../../util/classnames";

interface NumberSpinButtonsProps {
  handleIncrement: MouseEventHandler;
  handleDecrement: MouseEventHandler;
  disabled: boolean;
}

export default function NumberSpinButtons({
  handleIncrement,
  handleDecrement,
  disabled,
}: NumberSpinButtonsProps) {
  return (
    <div className="flex flex-col absolute bottom-0 right-4">
      <button
        type="button"
        onClick={handleIncrement}
        aria-label="increment"
        className={classnames("w-5 h-5 centered", "disabled:opacity-50")}
        autoFocus={false}
        disabled={disabled}
      >
        <ChevronUpIcon className="size-4 text-white" />
      </button>
      <button
        type="button"
        onClick={handleDecrement}
        aria-label="decrement"
        className={classnames("w-5 h-5 centered", "disabled:opacity-50")}
        autoFocus={false}
        disabled={disabled}
      >
        <ChevronDownIcon className="size-4 text-white" />
      </button>
    </div>
  );
}
