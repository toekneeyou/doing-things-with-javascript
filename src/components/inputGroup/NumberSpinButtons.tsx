import { MouseEventHandler } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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
        <ArrowDropUpIcon style={{ fontSize: "20px" }} />
      </button>
      <button
        type="button"
        onClick={handleDecrement}
        aria-label="decrement"
        className={classnames("w-5 h-5 centered", "disabled:opacity-50")}
        autoFocus={false}
        disabled={disabled}
      >
        <ArrowDropDownIcon style={{ fontSize: "20px" }} />
      </button>
    </div>
  );
}
