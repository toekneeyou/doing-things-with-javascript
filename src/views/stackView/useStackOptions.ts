import { useState } from "react";

export default function useStackOptions() {
  const [stack, setStack] = useState<number[]>([]);

  const push = (value: number) => {
    setStack((prevStack) => [...prevStack, value]);
  };

  const pop = (value: number) => {
    setStack((prevStack) => {
      return prevStack.filter((v) => v !== value);
    });
  };

  const clear = () => {
    setStack([]);
  };

  return { stack, push, pop, clear };
}
