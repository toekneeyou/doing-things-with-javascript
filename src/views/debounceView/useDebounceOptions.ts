import { ChangeEventHandler, useState } from "react";
import { VisualizationOptions } from "../../layouts/visualizationLayout/VisualizationLayout";

export default function useDebounceOptions() {
  const [isLeading, setIsLeading] = useState<"true" | "false">("false");
  const [isTrailing, setIsTrailing] = useState<"true" | "false">("true");
  const [isCancellable, setIsCancellable] = useState<"true" | "false">("true");
  const [wait, setWait] = useState("1000");

  const handleLeading: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setIsLeading(e.target.value as "true" | "false");
  };
  const handleTrailing: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setIsTrailing(e.target.value as "true" | "false");
  };
  const handleCancellable: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setIsCancellable(e.target.value as "true" | "false");
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

  return {
    isLeading,
    isTrailing,
    isCancellable,
    wait,
    options,
  };
}
