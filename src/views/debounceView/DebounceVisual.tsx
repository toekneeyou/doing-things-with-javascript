import { ChangeEventHandler, useCallback, useRef, useState } from "react";
import InputGroup from "../../components/inputGroup/InputGroup";
import { classnames } from "../../util/classnames";
import { debounce } from "../../util/debounce";
import { useDebounceStateContext } from "../../context/DebounceContext";
import DebounceResult from "./DebounceResult";

interface DebounceVisualProps {
  optionsModal: JSX.Element;
}

const DebounceVisual = ({ optionsModal }: DebounceVisualProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [inputString, setInputString] = useState("");
  const [result, setResult] = useState(inputString);
  const { isLeading, isTrailing, wait } = useDebounceStateContext();

  const debouncedSetResult = useCallback(
    debounce(
      (string: string) => {
        setResult(string);
      },
      Number(wait),
      {
        isLeading,
        isTrailing,
        isCancellable: true,
        handleWait: (newIsWaiting) => {
          const progressEl = progressRef.current;
          if (progressEl) {
            progressEl.style.animationDuration = `${wait}ms`;
            if (newIsWaiting) {
              progressEl.classList.remove("animate-slideRight");
              void progressEl.offsetWidth; // Trigger reflow
              progressEl.classList.add("animate-slideRight");
            } else {
              progressEl.classList.remove("animate-slideRight");
            }
          }
        },
      }
    ),
    [isLeading, isTrailing, wait]
  );

  const handleInputString: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setInputString(value);
    debouncedSetResult(value);
  };

  return (
    <div
      className={classnames(
        "debounce-visual",
        "h-full w-full centered",
        "p-8 lg:p-0"
      )}
    >
      <div className="centered flex-col gap-y-8 w-full">
        <div
          className={classnames("flex items-end space-x-2", "w-full lg:w-96")}
        >
          {optionsModal}
          <InputGroup
            showLabel={true}
            labelPosition="top"
            label="Regular Input"
            value={inputString}
            onChange={handleInputString}
            inputGroupClassName="w-full"
            autoComplete="off"
            placeholder="Type Here..."
          />
        </div>

        <DebounceResult result={result} ref={progressRef} />
      </div>
    </div>
  );
};

export default DebounceVisual;
