import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../../components/button/Button";
import {
  ArrowPathIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { classnames } from "../../util/classnames";
import { BubbleSortBar } from "./BubbleSortVisual";
import wait from "../../util/wait";
import { SORT_SPEED } from "./useBubbleSortSpeed";

interface BubbleSortControlsProps {
  unsortedArray: BubbleSortBar[];
  refreshArray: () => void;
  setUnsortedArray: Dispatch<SetStateAction<BubbleSortBar[]>>;
  speedRef: MutableRefObject<number>;
  calculateSpeed: (speed: number) => number;
}

export default function BubbleSortControls({
  unsortedArray,
  refreshArray,
  setUnsortedArray,
  speedRef,
  calculateSpeed,
}: BubbleSortControlsProps) {
  const [isAutoSort, setIsAutoSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);

  const doNotInteruptManualSort = useRef(false); // prevents next from being called while bars are still animating
  const isEarlyTermination = useRef(false);
  const unsortedArrayCopy = useRef(unsortedArray);
  const speedButtonRef = useRef<HTMLButtonElement>(null);
  let previousElRef = useRef<HTMLElement>();

  // update ref to make sure it has updated values
  useEffect(() => {
    unsortedArrayCopy.current = unsortedArray;
  }, [unsortedArray]);

  const handleRefresh = () => {
    setIsAutoSorting(false);
    setIsSorted(false);
    setI(0);
    setJ(0);
    refreshArray();
  };

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
        await wait(SORT_SPEED / speedRef.current);
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
          await wait(SORT_SPEED / speedRef.current);
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
        await wait(SORT_SPEED / speedRef.current);
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
        // make the last el gray
        const finalNum = unsortedArray.find((item) => item.position === 0)!;
        const finalEl = document.getElementById(
          `bubble-${finalNum.originalPosition}`
        )!;
        finalEl.classList.remove("bg-white", "bg-app-yellow");
        finalEl.classList.add("bg-gray-600");
        setIsSorted(true);
        setIsAutoSorting(false);
      }
      setJ(newJ);
      setI(newI);
      // can interupt now
      doNotInteruptManualSort.current = false;
    },
    []
  );

  /**
   * Toggles auto sorting
   */
  const toggleAutoSort = () => {
    setIsAutoSorting((p) => !p);
  };

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

  /**
   * Manually sort the current item
   */
  const nextIteration = async () => {
    // if previous sort isn't finished... don't call handleSort
    if (!doNotInteruptManualSort.current) {
      await handleSort(i, j, true);
    }
  };

  const handleSpeed = () => {
    speedRef.current = calculateSpeed(speedRef.current);
    const speedButton = speedButtonRef.current!;
    speedButton.textContent = `${speedRef.current}x`;
  };

  const RefreshIcon = useCallback(
    (props?: any) => <ArrowPathIcon {...props} />,
    []
  );
  const SortIcon = useCallback(
    (props?: any) =>
      isAutoSort ? <PauseIcon {...props} /> : <PlayIcon {...props} />,
    [isAutoSort]
  );
  const NextIcon = useCallback((props?: any) => <ForwardIcon {...props} />, []);

  return (
    <div
      className={classnames(
        "bubble-sort-visual__bottom",
        "between gap-x-standard",
        "w-full lg:min-w-96 lg:w-[30rem]"
      )}
    >
      <Button
        onClick={handleRefresh}
        disabled={isAutoSort}
        variant="icon"
        icon={RefreshIcon}
      />
      <div className="flex gap-x-standard">
        <Button
          onClick={toggleAutoSort}
          disabled={isSorted}
          className="w-16"
          variant="icon-filled"
          icon={SortIcon}
        />
        <Button
          onClick={nextIteration}
          disabled={isAutoSort || isSorted}
          variant="icon"
          icon={NextIcon}
        />
        <Button
          ref={speedButtonRef}
          onClick={handleSpeed}
          disabled={isSorted}
          className="text-app-yellow"
          variant="icon"
          icon={() => <span>{speedRef.current}x</span>}
        ></Button>
      </div>
    </div>
  );
}
