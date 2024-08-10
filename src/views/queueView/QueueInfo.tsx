import { classnames } from "../../util/classnames";

export default function QueueInfo() {
  return (
    <div className={classnames("queue-info", "w-96")}>
      <div>
        <h2 className="text-2xl mb-4 font-bold">Queue</h2>
        <p className="text-gray-400">
          A queue is a data structure that follows the{" "}
          <strong>First In, First Out (FIFO) principle</strong>.
        </p>
      </div>
      <hr className="my-8 opacity-50" />
      <div>
        <h3 className="text-xl mb-4 font-bold">Instructions</h3>
        <ul className="text-gray-400 space-y-2">
          <li>
            - Use the <strong className="text-app-yellow">Enqueue</strong>{" "}
            button to add an element to the end of the queue.
          </li>
          <li>
            - Use the <strong className="text-app-yellow">Dequeue</strong>{" "}
            button to remove an element from the beginning of the queue.
          </li>
          <li>
            - Use the <strong className="text-app-yellow">Clear</strong> button
            to empty the queue.
          </li>
        </ul>
      </div>
    </div>
  );
}
