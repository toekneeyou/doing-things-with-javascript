import { useRef } from "react";
import TallArray, { TallArrayHandle } from "../../features/tallArray/TallArray";
import { classnames } from "../../lib/util/classnames";
import Button from "../../components/button/Button";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import wait from "../../lib/util/wait";
import useQueueOptions from "./useQueueOptions";
import {
  MAX_QUEUE_LENGTH,
  QUEUE_TRANSITION_DURATION,
} from "../../lib/constants";
import { useViewportStateContext } from "../../context/ViewportContext";

export default function QueueVisual() {
  const queueContainerRef = useRef<TallArrayHandle>(null);
  const { queue, enqueue, dequeue, clear } = useQueueOptions();
  /**
   * doNotInteruptRef prevents any actions that affect the queue while an animation is in progress
   */
  const doNotInteruptRef = useRef(false);
  /**
   * handles enqueuing of an item
   */
  const handleEnqueue = () => {
    if (queue.length === 0) {
      enqueue(1);
    } else {
      enqueue(queue[queue.length - 1] + 1);
    }
  };
  /**
   * animates dequeuing of an item
   */
  const animateDequeue = async () => {
    if (!doNotInteruptRef.current) {
      doNotInteruptRef.current = true;
      const queueContainer = queueContainerRef.current!;
      const firstEl = queueContainer.getChild(queue[0]);
      if (firstEl) {
        firstEl.style.transform = "translateX(100%)";
        firstEl.style.transitionDuration = QUEUE_TRANSITION_DURATION;
        await wait(250);
        dequeue(queue[0]);
        doNotInteruptRef.current = false;
      }
    }
  };
  /**
   * animateClear animates clearing of the queue
   */
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
        enqueue={handleEnqueue}
        dequeue={animateDequeue}
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
  const viewport = useViewportStateContext();
  const isMobile = viewport === "xs" || viewport === "sm";

  return (
    <ul
      className={classnames(
        "queue__controls",
        "grid grid-cols-3 gap-x-standard"
      )}
    >
      <li className="w-full">
        <EnqueueButton
          enqueue={enqueue}
          isDisabled={isFull}
          isMobile={isMobile}
        />
      </li>
      <li className="w-full">
        <DequeueButton
          dequeue={dequeue}
          isDisabled={isEmpty}
          isMobile={isMobile}
        />
      </li>
      <li className="w-full">
        <ClearButton clear={clear} isDisabled={isEmpty} isMobile={isMobile} />
      </li>
    </ul>
  );
}

const EnqueueIcon = (props?: any) => <PlusIcon {...props} />;
function EnqueueButton({
  enqueue,
  isDisabled,
  isMobile,
}: {
  enqueue: () => void;
  isDisabled: boolean;
  isMobile: boolean;
}) {
  return (
    <Button
      className="w-full"
      onClick={enqueue}
      disabled={isDisabled}
      iconLeft={isMobile ? undefined : EnqueueIcon}
    >
      Enqueue
    </Button>
  );
}

const DequeueIcon = (props?: any) => <MinusIcon {...props} />;
function DequeueButton({
  dequeue,
  isDisabled,
  isMobile,
}: {
  dequeue: () => void;
  isDisabled: boolean;
  isMobile: boolean;
}) {
  return (
    <Button
      className="w-full"
      onClick={dequeue}
      disabled={isDisabled}
      iconLeft={isMobile ? undefined : DequeueIcon}
    >
      Dequeue
    </Button>
  );
}

const ClearIcon = (props?: any) => <XMarkIcon {...props} />;
function ClearButton({
  clear,
  isDisabled,
  isMobile,
}: {
  clear: () => void;
  isDisabled: boolean;
  isMobile: boolean;
}) {
  return (
    <Button
      className="w-full"
      onClick={clear}
      disabled={isDisabled}
      iconLeft={isMobile ? undefined : ClearIcon}
    >
      Clear
    </Button>
  );
}
