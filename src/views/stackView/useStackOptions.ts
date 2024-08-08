import { useState } from "react";

export default function useStackOptions({ maxLength }: { maxLength: number }) {
  const [stack, setStack] = useState<number[]>([]);
  const [num, setNum] = useState(1);

  const push = () => {
    if (size() < maxLength) {
      setStack((p) => [...p, Number(num)]);
      setNum((p) => p + 1);
    }
  };

  const pop = () => {
    let lastItem: number | undefined;
    setStack((p) => {
      lastItem = p.pop();
      return [...p];
    });
    return lastItem;
  };

  const peek = () => {
    if (!isEmpty()) {
      return stack[size() - 1];
    }
  };

  const size = () => {
    return stack.length;
  };

  const isEmpty = () => {
    return size() === 0;
  };

  const clear = () => {
    setStack([]);
  };

  return { stack, push, pop, peek, size, isEmpty, clear };
}
