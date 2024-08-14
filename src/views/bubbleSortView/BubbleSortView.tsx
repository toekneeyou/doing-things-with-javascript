import {
  ArrowPathIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/16/solid";
import VisualizationInfo from "../../layouts/visualizationLayout/VisualizationInfo";
import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import BubbleSortVisual from "./BubbleSortVisual";

export function BubbleSortView() {
  return (
    <VisualizationLayout
      infoPanel={<BubbleSortInfoPanel />}
      visual={<BubbleSortVisual />}
    />
  );
}

function BubbleSortInfoPanel() {
  return (
    <VisualizationInfo
      title="Bubble Sort"
      moreInfo={<BubbleSortInfo />}
      description={<BubbleSortDescription />}
    />
  );
}

function BubbleSortDescription() {
  return (
    <span>
      Bubble sort repeatedly steps through an unsorted array, compares adjacent
      elements, and swaps them if they are in the wrong order.
    </span>
  );
}

function BubbleSortInfo() {
  return (
    <ul className="text-gray-400 space-y-2">
      <li>
        - The <strong className="text-white inline-block">white</strong> bars
        are unsorted.
      </li>
      <li>
        - The <strong className="text-app-yellow inline-block">yellow</strong>{" "}
        bar is the current bar.
      </li>
      <li>
        - The <strong>gray</strong> bars have already been sorted.
      </li>
      <li>
        - Click on the{" "}
        <strong className="text-app-yellow inline-block">
          <PlayIcon className="size-4" />
        </strong>{" "}
        button to begin sorting.
      </li>
      <li>
        - Click on the{" "}
        <strong className="text-app-yellow inline-block">
          <PauseIcon className="size-4" />
        </strong>{" "}
        button to pause sorting.
      </li>
      <li>
        - Pause and click on the{" "}
        <strong className="text-app-yellow inline-block">
          <ForwardIcon className="size-4" />
        </strong>{" "}
        to move onto the next iteration manually.
      </li>
      <li>
        - Click on the{" "}
        <strong className="text-app-yellow inline-block">
          <ArrowPathIcon className="size-4" />
        </strong>{" "}
        button to generate a new unsorted array.
      </li>
      <li>
        - Speed things up or slow things down by clicking on the{" "}
        <strong className="text-app-yellow">1x</strong> button.
      </li>
    </ul>
  );
}
