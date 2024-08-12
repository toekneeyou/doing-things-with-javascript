import { useCallback, useEffect, useRef, useState } from "react";
import { classnames } from "../../util/classnames";
import Button from "../../components/Button";
import wait from "../../util/wait";
import {
  ArrowPathIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";

const NUM_OF_ELEMENTS = 20;
const MAX_VALUE = 100;
const SPEED = 250;

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

export default function BubbleSortVisual() {
  const [unsortedArray, setUnsortedArray] = useState<
    {
      position: number;
      originalPosition: number;
      value: number;
      className?: string;
    }[]
  >(createArray(NUM_OF_ELEMENTS, MAX_VALUE));
  const [isAutoSort, setIsAutoSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);

  const [arrayKey, setArrayKey] = useState(0);

  const doNotInteruptManualSort = useRef(false); // prevents next from being called while bars are still animating
  const isEarlyTermination = useRef(false);
  const unsortedArrayCopy = useRef(unsortedArray);
  const speed = useRef(1);
  let previousElRef = useRef<HTMLElement>();
  const speedButtonRef = useRef<HTMLButtonElement>(null);

  const handleRefresh = () => {
    setIsAutoSorting(false);
    setIsSorted(false);
    setI(0);
    setJ(0);
    setUnsortedArray(createArray(NUM_OF_ELEMENTS, MAX_VALUE));
    setArrayKey((p) => p + 1);
  };

  const handleSpeed = () => {
    switch (speed.current) {
      case 0.5:
        speed.current = 0.75;
        break;
      case 1:
        speed.current = 1.5;
        break;
      case 1.5:
        speed.current = 2;
        break;
      case 2:
        speed.current = 3;
        break;
      case 3:
        speed.current = 4;
        break;
      case 4:
        speed.current = 0.5;
        break;
      default:
        speed.current = 1;
        break;
    }
    const speedButton = speedButtonRef.current!;
    speedButton.textContent = `${speed.current}x`;
  };

  /**
   * Toggles auto sorting
   */
  const toggleAutoSort = () => {
    setIsAutoSorting((p) => !p);
  };

  /**
   * Manually sort the current item
   */
  const nextIteration = async () => {
    // if previous sort isn't finished... don't call handleSort
    if (!doNotInteruptManualSort.current) {
      await handleSort(i, j, true);
    }
  };

  // update ref to make sure it has updated values
  useEffect(() => {
    unsortedArrayCopy.current = unsortedArray;
  }, [unsortedArray]);

  /**
   * handleSort takes in a `localI` and `localJ` and swaps them and updates styling if necessary.
   * It will also increment i and j according.
   */
  const handleSort = useCallback(
    async (localI: number, localJ: number, isManual: boolean) => {
      const array = unsortedArrayCopy.current!;
      // Don't interupt!
      doNotInteruptManualSort.current = true;
      // Don't need to terminate prematurely
      isEarlyTermination.current = false;
      // reset bar colors if any
      let previousEl = previousElRef.current;
      previousEl?.classList.add("bg-white");
      previousEl?.classList.remove("bg-app-yellow");
      // find curr and next el
      const curr = array.find((item) => item.position === localJ)!;
      const next = array.find((item) => item.position === localJ + 1)!;
      // update colors
      let currEl = document.getElementById(`bubble-${curr.originalPosition}`)!;
      currEl.classList.remove("bg-white");
      currEl.classList.add("bg-app-yellow");
      // once colors are set, should wait a little for user to see which bar is the current bar
      if (!isManual || (isManual && localJ === 0)) {
        await wait(SPEED / speed.current);
      }
      // swap elements if necessary
      const isSwap = curr.value > next.value;
      // if terminating early, reset isEarlyTermination and doNotInterput
      if (isEarlyTermination.current) {
        isEarlyTermination.current = false;
        doNotInteruptManualSort.current = false;
        return;
      }
      if (isSwap) {
        // Swap elements
        curr.position++;
        next.position--;
      } else {
        // wait a little if not changing positions, this is the 'animation'
        if (!isManual) {
          await wait(SPEED / speed.current);
        }
        // no swapping necessary
        // update colors
        currEl.classList.add("bg-white");
        currEl.classList.remove("bg-app-yellow");
        currEl = document.getElementById(`bubble-${next.originalPosition}`)!;
        currEl.classList.remove("bg-white");
        currEl.classList.add("bg-app-yellow");
      }
      // update last element we're done looping through j
      const isEndOfIteration = localJ === array.length - 2 - localI;

      if (!isManual) {
        await wait(SPEED / speed.current);
      }

      setUnsortedArray([...array]);
      if (isEndOfIteration) {
        currEl.classList.remove("bg-white", "bg-app-yellow");
        currEl.classList.add("bg-gray-600");
      }
      // update i, j
      const newJ = isEndOfIteration ? 0 : localJ + 1;
      let newI = isEndOfIteration ? localI + 1 : localI;
      const isFinishedSorting = newI >= array.length - 1;
      if (isFinishedSorting) {
        setIsSorted(true);
        setIsAutoSorting(false);
      }
      setJ(newJ);
      setI(newI);
      // can interupt now
      doNotInteruptManualSort.current = false;
    },
    [speed]
  );

  /**
   * This useEffect contains auto sorting logic
   */
  useEffect(() => {
    const array = unsortedArrayCopy.current!;
    if (isAutoSort && !isSorted) {
      const bubbleSort = async () => {
        const shouldSort = i < array.length - 1 && j < array.length - 1 - i;
        if (shouldSort) {
          await handleSort(i, j, false);
        }
      };

      bubbleSort();
    }
    return () => {
      isEarlyTermination.current = true;
    };
  }, [i, j, handleSort, isAutoSort, isSorted]);

  return (
    <div
      className={classnames(
        "bubble-sort-visual",
        "h-full w-full centered flex-col gap-y-8"
      )}
    >
      <div className="bubble-sort-visual__top">
        <div className="p-4 pb-0 rounded-xl bg-app-dark-blue">
          <ul className="min-w-96 w-[30rem] h-72 flex items-end relative">
            {unsortedArray.map((item) => {
              return (
                <li
                  id={`bubble-${item.originalPosition}`}
                  key={`${arrayKey}-${item.originalPosition}`}
                  style={{
                    height: `${item.value}%`,
                    width: `calc(30rem / ${unsortedArray.length} - 1px)`,
                    left: `calc(${item.position} * (30rem / ${unsortedArray.length}) + 1px)`,
                    bottom: 0,
                    transitionDuration: `${SPEED / speed.current - 10}ms`,
                  }}
                  className={classnames("absolute transition-all bg-white")}
                ></li>
              );
            })}
          </ul>
        </div>
      </div>

      <div
        className={classnames(
          "bubble-sort-visual__bottom",
          "between gap-x-standard min-w-96 w-[30rem]"
        )}
      >
        <Button onClick={handleRefresh} disabled={isAutoSort} variant="icon">
          <ArrowPathIcon className="size-6 text-app-yellow" />
        </Button>
        <div className="flex gap-x-standard">
          <Button onClick={toggleAutoSort} disabled={isSorted} className="w-16">
            {isAutoSort ? (
              <PauseIcon className="size-6" />
            ) : (
              <PlayIcon className="size-6" />
            )}
          </Button>
          <Button
            onClick={nextIteration}
            disabled={isAutoSort || isSorted}
            variant="icon"
          >
            <ForwardIcon className="size-6 text-app-yellow" />
          </Button>
          <Button
            ref={speedButtonRef}
            onClick={handleSpeed}
            disabled={isSorted}
            className="text-app-yellow"
            variant="icon"
          >
            {speed.current}x
          </Button>
        </div>
      </div>
    </div>
  );
}
