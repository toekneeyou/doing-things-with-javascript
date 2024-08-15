import { useRef } from "react";
import TallArray, { TallArrayHandle } from "../../features/tallArray/TallArray";
import { classnames } from "../../lib/util/classnames";
import throttle from "../../lib/util/throttle";
import Button from "../../components/button/Button";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import wait from "../../lib/util/wait";
import useQueueOptions from "./useQueueOptions";
import {
  MAX_QUEUE_LENGTH,
  QUEUE_TRANSITION_DURATION,
} from "../../lib/constants";

export default function QueueVisual() {
  const queueContainerRef = useRef<TallArrayHandle>(null);
  const { queue, enqueue, dequeue, clear } = useQueueOptions();

  const animateDequeue = async () => {
    const queueContainer = queueContainerRef.current!;
    const firstEl = queueContainer.getChild(queue[0]);
    if (firstEl) {
      firstEl.style.transform = "translateX(100%)";
      firstEl.style.transitionDuration = QUEUE_TRANSITION_DURATION;
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
  return (
    <ul
      className={classnames(
        "queue__controls",
        "grid grid-cols-3 gap-x-standard"
      )}
    >
      <li className="w-full">
        <EnqueueButton enqueue={enqueue} isDisabled={isFull} />
      </li>
      <li className="w-full">
        <DequeueButton dequeue={dequeue} isDisabled={isEmpty} />
      </li>
      <li className="w-full">
        <ClearButton clear={clear} isDisabled={isEmpty} />
      </li>
    </ul>
  );
}

const EnqueueIcon = (props?: any) => <PlusIcon {...props} />;
function EnqueueButton({
  enqueue,
  isDisabled,
}: {
  enqueue: () => void;
  isDisabled: boolean;
}) {
  return (
    <Button
      className="w-full"
      onClick={enqueue}
      disabled={isDisabled}
      iconLeft={EnqueueIcon}
    >
      Enqueue
    </Button>
  );
}

const DequeueIcon = (props?: any) => <MinusIcon {...props} />;
function DequeueButton({
  dequeue,
  isDisabled,
}: {
  dequeue: () => void;
  isDisabled: boolean;
}) {
  return (
    <Button
      className="w-full"
      onClick={dequeue}
      disabled={isDisabled}
      iconLeft={DequeueIcon}
    >
      Dequeue
    </Button>
  );
}

const ClearIcon = (props?: any) => <XMarkIcon {...props} />;
function ClearButton({
  clear,
  isDisabled,
}: {
  clear: () => void;
  isDisabled: boolean;
}) {
  return (
    <Button
      className="w-full"
      onClick={clear}
      disabled={isDisabled}
      iconLeft={ClearIcon}
    >
      Clear
    </Button>
  );
}
