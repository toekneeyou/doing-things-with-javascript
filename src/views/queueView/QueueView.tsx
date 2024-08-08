import { useCallback } from "react";
import { InfoOutlined } from "@mui/icons-material";
import Button from "../../components/Button";
import Tooltip from "../../components/tooltip/Tooltip";
import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import useQueueOptions from "./useQueueOptions";
import throttle from "../../util/throttle";

const MAX_STACK_LENGTH = 8;

export default function QueueView() {
  const { queue, enqueue, dequeue, front, size, isEmpty, clear } =
    useQueueOptions({
      maxLength: MAX_STACK_LENGTH,
    });

  const handleFront = () => {
    if (!isEmpty()) {
      const firstNum = front();
      const firstEl = document.getElementById(`queue-${firstNum}`)!;
      firstEl.classList.toggle("animate-yellowRing");
      setTimeout(() => {
        firstEl.classList.toggle("animate-yellowRing");
      }, 300);
    }
  };

  const handleDequeue = () => {
    const firstEl = document.getElementById(`queue-${queue[0]}`);
    if (firstEl) {
      throttleDequeue(firstEl);
    }
  };

  const throttleDequeue = useCallback(
    throttle(
      (el) => {
        el.style.transform = "translateX(100%)";
        el.style.transform = "225ms";
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
    <VisualizationLayout
      title="Queue"
      tooltip={
        "A queue is a data structure that follows the First In, First Out (FIFO) principle."
      }
    >
      <div className="w-full h-full centered flex-col gap-y-8">
        <div className="centered gap-x-standard">
          <ul className="duration-100 overflow-hidden border-2 gap-y-1 border-t-0 border-app-white w-40 pt-4 h-[25rem] flex justify-start flex-col-reverse">
            {queue.map((num) => {
              return (
                <li
                  key={num}
                  id={`queue-${num}`}
                  className="transition-transform w-full centered h-10 bg-app-faded-blue"
                >
                  {num}
                </li>
              );
            })}
          </ul>
        </div>

        <ul className="grid grid-cols-4 gap-x-standard">
          <li className="w-full">
            <Button
              className="w-full"
              onClick={enqueue}
              disabled={queue.length === MAX_STACK_LENGTH}
            >
              Enqueue
              <Tooltip content="Incrementally add a number into the queue.">
                <InfoOutlined />
              </Tooltip>
            </Button>
          </li>
          <li className="w-full">
            <Button
              className="w-full"
              onClick={handleDequeue}
              disabled={isEmpty()}
            >
              Dequeue
              <Tooltip content="Remove the first element from the queue.">
                <InfoOutlined />
              </Tooltip>
            </Button>
          </li>
          <li className="w-full">
            <Button
              className="w-full"
              onClick={handleFront}
              disabled={isEmpty()}
            >
              Front
              <Tooltip content="Look at the first element in the queue.">
                <InfoOutlined />
              </Tooltip>
            </Button>
          </li>
          <li className="w-full">
            <Button className="w-full" onClick={clear} disabled={isEmpty()}>
              Clear
              <Tooltip content="Clear the queue.">
                <InfoOutlined />
              </Tooltip>
            </Button>
          </li>
        </ul>
      </div>
    </VisualizationLayout>
  );
}
