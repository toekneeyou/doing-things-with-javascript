import { useCallback, useRef } from "react";
import Button from "../../components/Button";
import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import useQueueOptions from "./useQueueOptions";
import throttle from "../../util/throttle";
import { classnames } from "../../util/classnames";
import TallArray from "../../features/tallArray/TallArray";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import QueueModalButton from "./QueueModalButton";

const MAX_STACK_LENGTH = 8;

export function QueueView() {
  const queueContainerRef = useRef<HTMLUListElement>(null);
  const { queue, enqueue, dequeue, isEmpty, clear } = useQueueOptions({
    maxLength: MAX_STACK_LENGTH,
  });

  const handleClear = () => {
    const queueContainerEl = queueContainerRef.current;
    if (queueContainerEl) {
      const items = queueContainerEl.querySelectorAll("li");
      let delay = 0;

      for (let i = 0; i < items.length; i++) {
        const liEl = items[i] as HTMLLIElement;
        liEl.style.transform = "translateX(100%)";
        liEl.style.transitionDelay = `${delay}ms`;
        delay += 50;
      }

      setTimeout(() => {
        clear();
      }, delay + 300);
    }
  };

  const handleDequeue = () => {
    const firstEl = document.getElementById(`array-${queue[0]}`);
    if (firstEl) {
      throttleDequeue(firstEl);
    }
  };

  const throttleDequeue = useCallback(
    throttle(
      (el) => {
        el.style.transform = "translateX(100%)";
        el.style.transitionDuration = "225ms";
        setTimeout(() => {
          dequeue();
        }, 250);
      },
      500,
      { isLeading: true, isTrailing: true }
    ),
    []
  );

  return (
    <VisualizationLayout title="Queue" moreInfo={<QueueModalButton />}>
      <div
        className={classnames(
          "queue",
          "w-full h-full centered flex-col gap-y-8"
        )}
      >
        <TallArray ref={queueContainerRef} array={queue} />

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
              disabled={queue.length === MAX_STACK_LENGTH}
            >
              <PlusIcon className="size-6" />
              Enqueue
            </Button>
          </li>

          <li className="w-full">
            <Button
              className="w-full"
              onClick={handleDequeue}
              disabled={isEmpty()}
            >
              <MinusIcon className="size-6" />
              Dequeue
            </Button>
          </li>

          <li className="w-full">
            <Button
              className="w-full"
              onClick={handleClear}
              disabled={isEmpty()}
            >
              <XMarkIcon className="size-6" />
              Clear
            </Button>
          </li>
        </ul>
      </div>
    </VisualizationLayout>
  );
}
