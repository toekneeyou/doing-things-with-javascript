import { ChangeEventHandler, useState } from "react";
import { VisualizationOptions } from "../../layouts/visualizationLayout/VisualizationLayout";

export default function useThrottleOptions() {
  const [isLeading, setIsLeading] = useState(true);
  const [isTrailing, setIsTrailing] = useState(true);
  const [isCancellable, setIsCancellable] = useState(true);
  const [wait, setWait] = useState("1000");

  const handleLeading: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    setIsLeading(true);
  };
  const handleTrailing: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    setIsTrailing(true);
  };
  const handleCancellable: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (e) => {
    setIsCancellable(true);
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
      type: "switch",
      switchGroupProps: {
        label: "Leading",
        showLabel: true,
        checked: isLeading,
        onChange: handleLeading,
        name: "leading",
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
      type: "switch",
      switchGroupProps: {
        label: "Trailing",
        showLabel: true,
        checked: isTrailing,
        onChange: handleTrailing,
        name: "trailing",
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
      type: "switch",
      switchGroupProps: {
        label: "Cancellable",
        showLabel: true,
        checked: isCancellable,
        onChange: handleCancellable,
        name: "cancellable",
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
