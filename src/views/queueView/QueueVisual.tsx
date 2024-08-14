import { useRef } from "react";
import TallArray, { TallArrayHandle } from "../../features/tallArray/TallArray";
import { classnames } from "../../util/classnames";
import throttle from "../../util/throttle";
import Button from "../../components/button/Button";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import wait from "../../util/wait";
import useQueueOptions from "./useQueueOptions";

const MAX_QUEUE_LENGTH = 8;

export default function QueueVisual() {
  const queueContainerRef = useRef<TallArrayHandle>(null);
  const { queue, enqueue, dequeue, clear } = useQueueOptions();

  const animateDequeue = async () => {
    const queueContainer = queueContainerRef.current!;
    const firstEl = queueContainer.getChild(queue[0]);
    if (firstEl) {
      firstEl.style.transform = "translateX(100%)";
      firstEl.style.transitionDuration = "225ms";
      await wait(250);
      dequeue();
    }
  };

  const throttledDequeue = throttle(animateDequeue, 500);

  const animateClear = async () => {
    const queueContainer = queueContainerRef.current!;
    const items = queueContainer.getAllChildren();
    let delay = 0;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const liEl = items[i] as HTMLLIElement;
        liEl.style.transform = "translateX(100%)";
        liEl.style.transitionDelay = `${delay}ms`;
        delay += 50;
      }
    }
    await wait(delay + 300);
    clear();
  };

  return (
    <div
      className={classnames(
        "queue-visual",
        "w-full h-full centered flex-col gap-y-8"
      )}
    >
      <TallArray ref={queueContainerRef} array={queue} />

      <QueueControls
        enqueue={enqueue}
        dequeue={throttledDequeue}
        clear={animateClear}
        isEmpty={queue.length === 0}
        isFull={queue.length === MAX_QUEUE_LENGTH}
      />
    </div>
  );
}

interface QueueControlsProps {
  enqueue: () => void;
  dequeue: () => void;
  clear: () => void;
  isEmpty: boolean;
  isFull: boolean;
}

function QueueControls({
  enqueue,
  dequeue,
  clear,
  isEmpty,
  isFull,
}: QueueControlsProps) {
  const EnqueueIcon = (props?: any) => <PlusIcon {...props} />;
  const DequeueIcon = (props?: any) => <MinusIcon {...props} />;
  const ClearIcon = (props?: any) => <XMarkIcon {...props} />;

  return (
    <ul
      className={classnames(
        "queue__controls",
        "grid grid-cols-3 gap-x-standard"
      )}
    >
      <li className="w-full">
        <Button
          className="w-full"
          onClick={enqueue}
          disabled={isFull}
          iconLeft={EnqueueIcon}
        >
          Enqueue
        </Button>
      </li>

      <li className="w-full">
        <Button
          className="w-full"
          onClick={dequeue}
          disabled={isEmpty}
          iconLeft={DequeueIcon}
        >
          Dequeue
        </Button>
      </li>

      <li className="w-full">
        <Button
          className="w-full"
          onClick={clear}
          disabled={isEmpty}
          iconLeft={ClearIcon}
        >
          Clear
        </Button>
      </li>
    </ul>
  );
}
