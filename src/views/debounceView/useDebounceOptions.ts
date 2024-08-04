import { ChangeEventHandler, useState } from "react";

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

  return {
    isLeading,
    handleLeading,
    isTrailing,
    handleTrailing,
    isCancellable,
    handleCancellable,
    wait,
    handleWait,
  };
}
