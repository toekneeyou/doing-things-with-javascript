import { ChangeEventHandler, useState } from "react";
import { VisualizationOptions } from "../../layouts/visualizationLayout/VisualizationLayout";

export default function useDebounceOptions() {
  const [isLeading, setIsLeading] = useState(false);
  const [isTrailing, setIsTrailing] = useState(true);
  const [isCancellable, setIsCancellable] = useState(true);
  const [wait, setWait] = useState("1000");

  const handleLeading: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    setIsLeading(e.target.checked);
  };
  const handleTrailing: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    setIsTrailing(e.target.checked);
  };
  const handleCancellable: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (e) => {
    setIsCancellable(e.target.checked);
  };
  const handleWait: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWait(e.target.value);
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
      type: "switch",
      switchGroupProps: {
        label: "Leading",
        showLabel: true,
        checked: isLeading,
        onChange: handleLeading,
        name: "leading",
        tooltipProps: {
          content:
            "If leading is set to true, the debounced function will execute once before initiating the waiting period.",
        },
      },
    },
    {
      type: "switch",
      switchGroupProps: {
        label: "Trailing",
        showLabel: true,
        checked: isTrailing,
        onChange: handleTrailing,
        name: "trailing",
        tooltipProps: {
          content:
            "If trailing is set to true, the debounced function will execute after the waiting period is over.",
        },
      },
    },
    {
      type: "switch",
      switchGroupProps: {
        label: "Cancellable",
        showLabel: true,
        checked: isCancellable,
        onChange: handleCancellable,
        name: "cancellable",
        tooltipProps: {
          content:
            "This allows you to cancel the debounced function if it hasn't executed yet.",
        },
      },
    },
  ];

  return {
    isLeading,
    isTrailing,
    isCancellable,
    wait,
    options,
  };
}
