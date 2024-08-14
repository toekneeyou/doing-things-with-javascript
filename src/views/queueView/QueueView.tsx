import { useEffect } from "react";
import VisualizationInfo from "../../layouts/visualizationLayout/VisualizationInfo";
import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import QueueVisual from "./QueueVisual";

export function QueueView() {
  return (
    <VisualizationLayout
      infoPanel={<QueueInfoPanel />}
      visual={<QueueVisual />}
    />
  );
}

function QueueInfoPanel() {
  return (
    <VisualizationInfo
      title="Queue"
      description={<QueueDescription />}
      moreInfo={<QueueInfo />}
    />
  );
}

function QueueDescription() {
  return (
    <span>
      A queue is a data structure that follows the{" "}
      <strong className="text-white">
        First In, First Out (FIFO) principle
      </strong>
      .
    </span>
  );
}

function QueueInfo() {
  return (
    <ul className="text-gray-400 space-y-2">
      <li>
        - Use the <strong className="text-app-yellow">Enqueue</strong> button to
        add an element to the end of the queue.
      </li>
      <li>
        - Use the <strong className="text-app-yellow">Dequeue</strong> button to
        remove an element from the beginning of the queue.
      </li>
      <li>
        - Use the <strong className="text-app-yellow">Clear</strong> button to
        empty the queue.
      </li>
    </ul>
  );
}
