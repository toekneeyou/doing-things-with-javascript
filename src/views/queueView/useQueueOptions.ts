import { useState } from "react";

export default function useQueueOptions() {
  const [queue, setQueue] = useState<number[]>([]);

  const enqueue = () => {
    setQueue((prevQueue) => {
      const last = prevQueue[prevQueue.length - 1] ?? 0;
      const newQueue = [...prevQueue, last + 1];
      return newQueue;
    });
  };

  const dequeue = () => {
    setQueue((prevQueue) => {
      return prevQueue.slice(1) ?? [];
    });
  };

  const clear = () => {
    setQueue([]);
  };
  return { queue, enqueue, dequeue, clear };
}
