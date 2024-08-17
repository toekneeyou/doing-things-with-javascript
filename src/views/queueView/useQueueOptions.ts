import { useState } from "react";

export default function useQueueOptions() {
  const [queue, setQueue] = useState<number[]>([]);

  const enqueue = (value: number) => {
    setQueue((prevQueue) => {
      return [...prevQueue, value];
    });
  };

  const dequeue = (value: number) => {
    setQueue((prevQueue) => {
      return prevQueue.filter((v) => v !== value);
    });
  };

  const clear = () => {
    setQueue([]);
  };
  return { queue, enqueue, dequeue, clear };
}
