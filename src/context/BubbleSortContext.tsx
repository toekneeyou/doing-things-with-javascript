import {
  createContext,
  Dispatch,
  MutableRefObject,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useBubbleSortSpeed, {
  SORT_SPEED,
} from "../views/bubbleSortView/useBubbleSortSpeed";
import wait from "../lib/util/wait";
import { BubbleSortChartHandle } from "../views/bubbleSortView/BubbleSortChart";
/**
 *
 *
 * Context Creation
 *
 *
 */
interface BSArrayStateContextValue {
  unsortedArray: BubbleSortBar[];
  arrayKey: number;
}
interface BSArrayActionContextValue {
  setUnsortedArray: Dispatch<SetStateAction<BubbleSortBar[]>>;
  handleRefresh: () => void;
}
interface BSRefContextValue {
  bubbleSortChartRef: MutableRefObject<BubbleSortChartHandle | null>;
  speedRef: MutableRefObject<number>;
  speedButtonRef: MutableRefObject<HTMLButtonElement | null>;
}
interface BSSortStatusContextValue {
  isAutoSort: boolean;
  isSorted: boolean;
}
interface BSAutoSortContextValue {
  toggleAutoSort: () => void;
  handleSpeed: () => void;
}
interface BSManualSortContextValue {
  nextIteration: () => void;
}
const BSArrayStateContext = createContext<BSArrayStateContextValue | null>(
  null
);
const BSArrayActionContext = createContext<BSArrayActionContextValue | null>(
  null
);
const BSRefContext = createContext<BSRefContextValue | null>(null);
const BSSortStatusContext = createContext<BSSortStatusContextValue | null>(
  null
);
const BSAutoSortContext = createContext<BSAutoSortContextValue | null>(null);
const BSManualSortContext = createContext<BSManualSortContextValue | null>(
  null
);
/**
 *
 *
 * Context Provider component
 *
 *
 */
const NUM_OF_ELEMENTS = 20;
const MAX_VALUE = 100;

export interface BubbleSortBar {
  position: number;
  originalPosition: number;
  value: number;
  className?: string;
}
export default function BubbleSortContextProvider({
  children,
}: PropsWithChildren) {
  const [unsortedArray, setUnsortedArray] = useState<BubbleSortBar[]>(
    createArray(NUM_OF_ELEMENTS, MAX_VALUE)
  );
  const [arrayKey, setArrayKey] = useState(1); // this is used to create a brand new array
  // sorting logic below
  const [isAutoSort, setIsAutoSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const { speedRef, speedButtonRef, calculateSpeed } = useBubbleSortSpeed();
  const doNotInteruptManualSort = useRef(false); // prevents next from being called while bars are still animating
  const isEarlyTermination = useRef(false);
  const bubbleSortChartRef = useRef<BubbleSortChartHandle>(null);
  const unsortedArrayCopy = useRef(unsortedArray);

  /**
   * make a copy of unsorted array for sorting functions to use
   */
  useEffect(() => {
    unsortedArrayCopy.current = [...unsortedArray];
  }, [unsortedArray]);

  /**
   * handleSort takes in a `localI` and `localJ` and swaps them and updates styling if necessary.
   * It will also increment i and j according.
   */
  const handleSort = useCallback(
    async (localI: number, localJ: number, isManual: boolean) => {
      const makeElYellow = (el: HTMLLIElement) => {
        el.classList.remove("bg-white");
        el.classList.add("bg-app-yellow");
      };

      const makeElWhite = (el: HTMLLIElement) => {
        el.classList.remove("bg-app-yellow");
        el.classList.add("bg-white");
      };

      const makeElGray = (el: HTMLLIElement) => {
        el.classList.remove("bg-white", "bg-app-yellow");
        el.classList.add("bg-gray-600");
      };

      const array = unsortedArrayCopy.current;
      const bubbleSortChart = bubbleSortChartRef.current!;
      // Don't interupt!
      doNotInteruptManualSort.current = true;
      // Don't need to terminate prematurely
      isEarlyTermination.current = false;
      // find curr and next el
      const curr = array.find((item) => item.position === localJ)!;
      const next = array.find((item) => item.position === localJ + 1)!;
      // make currEl yellow
      let currEl = bubbleSortChart.getElement(curr.originalPosition)!;
      makeElYellow(currEl);
      // once colors are set, wait a little for user to see which bar is the current bar
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
        makeElWhite(currEl);
        currEl = bubbleSortChart.getElement(next.originalPosition);
        makeElYellow(currEl);
      }
      // update last element we're done looping through j
      const isEndOfIteration = localJ === array.length - 2 - localI;

      if (!isManual) {
        await wait(SORT_SPEED / speedRef.current);
      }

      setUnsortedArray([...array]);

      if (isEndOfIteration) {
        makeElGray(currEl);
      }

      // update i, j
      const newJ = isEndOfIteration ? 0 : localJ + 1;
      let newI = isEndOfIteration ? localI + 1 : localI;
      const isFinishedSorting = newI >= array.length - 1;
      setJ(newJ);
      setI(newI);

      if (isFinishedSorting) {
        // make the last el gray
        const finalNum = unsortedArray.find((item) => item.position === 0)!;
        const finalEl = bubbleSortChart.getElement(finalNum.originalPosition)!;
        makeElGray(finalEl);
        // update state
        setIsSorted(true);
        setIsAutoSorting(false);
      }
      // can interupt now
      doNotInteruptManualSort.current = false;
    },
    []
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

  /**
   *
   *
   * Context Values!
   *
   *
   */
  const bsArrayStateValue: BSArrayStateContextValue = useMemo(
    () => ({ unsortedArray, arrayKey }),
    [unsortedArray, arrayKey]
  );
  const bsArrayActionValue: BSArrayActionContextValue = useMemo(
    () => ({
      setUnsortedArray,
      handleRefresh: () => {
        setIsAutoSorting(false);
        setIsSorted(false);
        setI(0);
        setJ(0);
        setUnsortedArray(createArray(NUM_OF_ELEMENTS, MAX_VALUE));
        setArrayKey(Math.random());
      },
    }),
    []
  );
  const bsRefValue: BSRefContextValue = useMemo(
    () => ({
      bubbleSortChartRef,
      speedButtonRef,
      speedRef,
    }),
    []
  );
  const bsSortStatusValue: BSSortStatusContextValue = useMemo(
    () => ({
      isAutoSort,
      isSorted,
    }),
    [isAutoSort, isSorted]
  );
  const bsAutoSortValue: BSAutoSortContextValue = useMemo(
    () => ({
      toggleAutoSort: () => {
        setIsAutoSorting((p) => !p);
      },
      handleSpeed: () => {
        speedRef.current = calculateSpeed(speedRef.current);
        const speedButton = speedButtonRef.current!;
        speedButton.textContent = `${speedRef.current}x`;
      },
    }),
    []
  );
  const bsManualSortValue: BSManualSortContextValue = useMemo(
    () => ({
      nextIteration: async () => {
        // if previous sort isn't finished... don't call handleSort
        if (!doNotInteruptManualSort.current) {
          await handleSort(i, j, true);
        }
      },
    }),
    [i, j]
  );

  return (
    <BSArrayStateContext.Provider value={bsArrayStateValue}>
      <BSArrayActionContext.Provider value={bsArrayActionValue}>
        <BSRefContext.Provider value={bsRefValue}>
          <BSSortStatusContext.Provider value={bsSortStatusValue}>
            <BSAutoSortContext.Provider value={bsAutoSortValue}>
              <BSManualSortContext.Provider value={bsManualSortValue}>
                {children}
              </BSManualSortContext.Provider>
            </BSAutoSortContext.Provider>
          </BSSortStatusContext.Provider>
        </BSRefContext.Provider>
      </BSArrayActionContext.Provider>
    </BSArrayStateContext.Provider>
  );
}
/**
 *
 *
 * Hooks to consume context
 *
 *
 */
export const useBSArrayStateContext = () => {
  const context = useContext(BSArrayStateContext);
  if (!context) throw new Error("useBSArrayStateContext");
  return context;
};
export const useBSArrayActionContext = () => {
  const context = useContext(BSArrayActionContext);
  if (!context) throw new Error("useBSArrayActionContext");
  return context;
};
export const useBSRefContext = () => {
  const context = useContext(BSRefContext);
  if (!context) throw new Error("useBSRefContext");
  return context;
};
export const useBSSortStatusContext = () => {
  const context = useContext(BSSortStatusContext);
  if (!context) throw new Error("useBSSortStatusContext");
  return context;
};
export const useBSAutoSortContext = () => {
  const context = useContext(BSAutoSortContext);
  if (!context) throw new Error("useBSAutoSortContext");
  return context;
};
export const useBSManualSortContext = () => {
  const context = useContext(BSManualSortContext);
  if (!context) throw new Error("useBSManualSortContext");
  return context;
};

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
