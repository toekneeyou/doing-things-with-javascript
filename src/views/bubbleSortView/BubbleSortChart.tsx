import { MutableRefObject } from "react";
import { classnames } from "../../util/classnames";
import { BubbleSortBar } from "./BubbleSortVisual";
import { SORT_SPEED } from "./useBubbleSortSpeed";

interface BubbleSortChartProps {
  unsortedArray: BubbleSortBar[];
  arrayKey: number;
  speedRef: MutableRefObject<number>;
}

export default function BubbleSortChart({
  unsortedArray,
  arrayKey,
  speedRef,
}: BubbleSortChartProps) {
  return (
    <div className="p-4 pb-0 rounded-xl bg-app-dark-blue">
      <ul
        className={classnames(
          "h-72 flex items-end relative",
          "w-full lg:min-w-96 lg:w-[30rem]"
        )}
      >
        {unsortedArray.map((item) => {
          return (
            <li
              id={`bubble-${item.originalPosition}`}
              key={`${arrayKey}-${item.originalPosition}`}
              style={{
                height: `${item.value}%`,
                width: `calc(100% / ${unsortedArray.length} - 1px)`,
                left: `calc(${item.position} * (100% / ${unsortedArray.length}) + 1px)`,
                bottom: 0,
                transitionDuration: `${SORT_SPEED / speedRef.current - 10}ms`,
              }}
              className={classnames("absolute transition-all bg-white")}
            ></li>
          );
        })}
      </ul>
    </div>
  );
}
