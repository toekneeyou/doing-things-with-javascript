import { useState } from "react";

export default function useQueueOptions({ maxLength }: { maxLength: number }) {
  const [queue, setQueue] = useState<number[]>([]);
  const [num, setNum] = useState(1);

  const enqueue = () => {
    if (size() < maxLength) {
      setQueue((p) => [...p, Number(num)]);
      setNum((p) => p + 1);
    }
  };

  const dequeue = () => {
    let firstItem: number | undefined;
    setQueue((p) => {
      firstItem = p.shift();
      return [...p];
    });
    return firstItem;
  };

  const front = () => {
    if (!isEmpty()) {
      return queue[0];
    }
  };

  const size = () => {
    return queue.length;
  };

  const isEmpty = () => {
    return size() === 0;
  };

  const clear = () => {
    setQueue([]);
  };

  return { queue, enqueue, dequeue, front, size, isEmpty, clear };
}
