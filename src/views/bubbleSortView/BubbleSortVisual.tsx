import { useState } from "react";
import { classnames } from "../../util/classnames";

import BubbleSortControls from "./BubbleSortControls";
import useBubbleSortSpeed from "./useBubbleSortSpeed";
import BubbleSortChart from "./BubbleSortChart";

const NUM_OF_ELEMENTS = 20;
const MAX_VALUE = 100;

/**
 *
 * @param numberOfElements
 * @param maxValue
 * @returns An array of size `numberOfElements` with randomly generated numbers that have a max value of `maxValue`.
 */
const createArray = (numberOfElements: number, maxValue: number) => {
  return new Array(numberOfElements).fill(1).map((_, i) => ({
    position: i,
    originalPosition: i,
    value: Math.ceil(Math.random() * maxValue),
    className: "",
  }));
};

export interface BubbleSortBar {
  position: number;
  originalPosition: number;
  value: number;
  className?: string;
}

export default function BubbleSortVisual() {
  const [unsortedArray, setUnsortedArray] = useState<BubbleSortBar[]>(
    createArray(NUM_OF_ELEMENTS, MAX_VALUE)
  );
  const [arrayKey, setArrayKey] = useState(0);
  const { speedRef, calculateSpeed } = useBubbleSortSpeed();

  const refreshArray = () => {
    setUnsortedArray(createArray(NUM_OF_ELEMENTS, MAX_VALUE));
    setArrayKey(Math.random());
  };

  return (
    <div
      className={classnames(
        "bubble-sort-visual",
        "h-full w-full centered flex-col gap-y-8",
        "p-8 lg:p-0"
      )}
    >
      <div
        className={classnames("bubble-sort-visual__top", "w-full lg:w-auto")}
      >
        <BubbleSortChart
          unsortedArray={unsortedArray}
          arrayKey={arrayKey}
          speedRef={speedRef}
        />
      </div>
      <BubbleSortControls
        unsortedArray={unsortedArray}
        refreshArray={refreshArray}
        setUnsortedArray={setUnsortedArray}
        speedRef={speedRef}
        calculateSpeed={calculateSpeed}
      />
    </div>
  );
}
