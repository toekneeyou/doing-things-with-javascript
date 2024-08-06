import { ChangeEventHandler, createElement, useState } from "react";
import { VisualizationOptions } from "../../layouts/visualizationLayout/VisualizationLayout";

export default function useThrottleOptions() {
  const [isLeading, setIsLeading] = useState<"true" | "false">("true");
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
          content: (
            <p>
              This is the waiting period. Any attempt to call the throttled
              function will result in one call at the end of the waiting period
              if <span className="code">isTrailing</span> is{" "}
              <span className="code">true</span>.
            </p>
          ),
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
          content: (
            <p>
              If <span className="code">isLeading</span> is{" "}
              <span className="code">true</span>, the function will be called
              before kicking off a waiting period.
            </p>
          ),
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
          content: (
            <p>
              If <span className="code">isTrailing</span> is{" "}
              <span className="code">true</span>, any attempt to call the
              throttled function will result in one call at the end of the
              waiting period.
            </p>
          ),
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
            "This allows you to cancel the throttled function if it hasn't executed yet.",
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
