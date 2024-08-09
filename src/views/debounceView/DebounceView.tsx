import { ChangeEventHandler, useCallback, useRef, useState } from "react";
import InputGroup from "../../components/inputGroup/InputGroup";
import { debounce } from "../../util/debounce";
import useDebounceOptions from "./useDebounceOptions";
import DebouncedResult from "./DebounceResult";
import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import Button from "../../components/Button";
import { error } from "../../../tailwind.config";

export function DebounceView() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [inputString, setInputString] = useState("");
  const [result, setResult] = useState(inputString);
  const [isWaiting, setIsWaiting] = useState(false);

  const { isLeading, isTrailing, isCancellable, wait, options } =
    useDebounceOptions();

  const debouncedSetResult = useCallback(
    debounce(
      (string: string) => {
        setResult(string);
      },
      Number(wait),
      {
        isLeading,
        isTrailing,
        isCancellable,
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
            setIsWaiting(newIsWaiting);
          }
        },
      }
    ),
    [isLeading, isTrailing, isCancellable, wait]
  );

  const handleInputString: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setInputString(value);
    debouncedSetResult(value);
  };

  return (
    <VisualizationLayout
      title="Debounce"
      tooltip="Debouncing is a technique used to ensure that a function is only
                executed once after a specified waiting period has passed since
                the last invocation attempt."
      options={options}
    >
      <div className="h-full w-full centered">
        <div className="centered flex-col gap-y-8">
          <div className="flex items-end space-x-2 w-96">
            <InputGroup
              showLabel
              label="Regular Input"
              value={inputString}
              onChange={handleInputString}
              inputGroupClassName="w-full"
              autoComplete="off"
              placeholder="Type Here..."
              tooltipProps={{
                content: (
                  <p>
                    Start typing to see the debounced string in the box below.
                  </p>
                ),
              }}
            />
            {isCancellable && (
              <Button
                disabled={!isWaiting}
                color={error}
                onClick={() => {
                  debouncedSetResult.cancel?.();
                  setIsWaiting(false);
                }}
              >
                Cancel
              </Button>
            )}
          </div>

          <DebouncedResult result={result} ref={progressRef} />
        </div>
      </div>
    </VisualizationLayout>
  );
}
