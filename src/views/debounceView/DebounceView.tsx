import { ChangeEventHandler, useCallback, useRef, useState } from "react";
import InputGroup from "../../components/inputGroup/InputGroup";
import { debounce } from "../../util/debounce";
import useDebounceOptions from "./useDebounceOptions";
import DebouncedResult from "./DebounceResult";
import VisualizationLayout, {
  VisualizationOptions,
} from "../../layouts/visualizationLayout/VisualizationLayout";
import Button from "../../components/Button";

export default function DebounceView() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [inputString, setInputString] = useState("");
  const [result, setResult] = useState(inputString);
  const [isWaiting, setIsWaiting] = useState(false);

  const {
    isLeading,
    handleLeading,
    isTrailing,
    handleTrailing,
    isCancellable,
    handleCancellable,
    wait,
    handleWait,
  } = useDebounceOptions();

  const debouncedSetResult = useCallback(
    debounce(
      function (string: string) {
        setResult(string);
      },
      Number(wait),
      {
        isLeading: isLeading === "true" ? true : false,
        isTrailing: isTrailing === "true" ? true : false,
        isCancellable: isCancellable === "true" ? true : false,
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

  const options: VisualizationOptions[] = [
    {
      type: "number",
      inputGroupProps: {
        label: "Wait(ms)",
        showLabel: true,
        value: wait,
        onChange: handleWait,
        name: "wait",
        min: 0,
        step: 100,
        tooltipProps: {
          content:
            "This is the waiting period. Any attempt to call the debounced function during the waiting period will reset it.",
        },
      },
    },
    {
      type: "dropdown",
      dropdownProps: {
        label: "Leading",
        showLabel: true,
        name: "leading",
        value: isLeading,
        onChange: handleLeading,
        options: [
          { value: "true", children: "true" },
          { value: "false", children: "false" },
        ],
        tooltipProps: {
          content:
            "If leading is set to true, the debounced function will execute once before initiating the waiting period.",
        },
      },
    },
    {
      type: "dropdown",
      dropdownProps: {
        label: "Trailing",
        showLabel: true,
        name: "trailing",
        value: isTrailing,
        onChange: handleTrailing,
        options: [
          { value: "true", children: "true" },
          { value: "false", children: "false" },
        ],
        tooltipProps: {
          content:
            "If trailing is set to true, the debounced function will execute after the waiting period is over.",
        },
      },
    },
    {
      type: "dropdown",
      dropdownProps: {
        label: "Cancellable",
        showLabel: true,
        name: "cancellable",
        value: isCancellable,
        onChange: handleCancellable,
        options: [
          { value: "true", children: "true" },
          { value: "false", children: "false" },
        ],
        tooltipProps: {
          content:
            "This allows you to cancel the debounced function if it hasn't executed yet.",
        },
      },
    },
  ];

  return (
    <VisualizationLayout
      title="Debounce"
      tooltip="Debouncing is a technique used to ensure that a function is only
                executed once after a specified waiting period has passed since
                the last invocation attempt."
      options={options}
    >
      <div className="centered h-full w-full flex-col">
        <div className="flex items-end space-x-2 mb-8 w-96">
          <InputGroup
            showLabel={true}
            label="Regular Input"
            value={inputString}
            onChange={handleInputString}
            inputGroupClassName="w-full"
            autoComplete="off"
            placeholder="Type Here..."
          />
          {isCancellable === "true" && (
            <Button
              disabled={!isWaiting}
              className="bg-red-500 text-app-dark-blue"
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
    </VisualizationLayout>
  );
}
