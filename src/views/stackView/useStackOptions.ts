import { useState } from "react";

export default function useStackOptions() {
  const [stack, setStack] = useState<number[]>([]);

  const push = (stck: number[]) => {
    const last = stck[stck.length - 1] ?? 0;
    const newStack = [...stck, last + 1];
    setStack(newStack);
  };

  const pop = (stck: number[]) => {
    const newStack = [...stck];
    newStack.pop();
    setStack(newStack);
  };

  const clear = () => {
    setStack([]);
  };

  return { stack, push, pop, clear };
}
