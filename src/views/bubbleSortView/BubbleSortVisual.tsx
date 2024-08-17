import { classnames } from "../../lib/util/classnames";

import BubbleSortControls from "./BubbleSortControls";
import BubbleSortChart from "./BubbleSortChart";

export default function BubbleSortVisual() {
  return (
    <div
      className={classnames(
        "bubble-sort-visual",
        "h-full w-full max-w-[30rem] centered flex-col gap-y-8"
      )}
    >
      <div
        className={classnames(
          "bubble-sort-visual__top",
          "w-full"
        )}
      >
        <BubbleSortChart />
      </div>
      <BubbleSortControls />
    </div>
  );
}
