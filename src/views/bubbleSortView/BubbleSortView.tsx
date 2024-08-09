import { useEffect, useRef, useState } from "react";
import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import Button from "../../components/Button";
import wait from "../../util/wait";

import { classnames } from "../../util/classnames";
import { yellow } from "../../../tailwind.config";
import { Pause, Refresh, Sort } from "@mui/icons-material";

const createArray = (numberOfElements: number, maxValue: number) => {
  return new Array(numberOfElements).fill(1).map((_, i) => ({
    id: i,
    value: Math.ceil(Math.random() * maxValue),
    className: "",
  }));
};

const NUM_OF_ELEMENTS = 30;
const MAX_VALUE = 100;

export function BubbleSortView() {
  const [unsortedArray, setUnsortedArray] = useState<
    { id: number; value: number; className?: string }[]
  >(createArray(NUM_OF_ELEMENTS, MAX_VALUE));
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [currId, setCurrId] = useState<number | null>(null);

  const pauseSorting = () => {
    setIsSorting(false);
  };

  const createUnsortedArray = () => {
    setI(0);
    setJ(0);
    setIsSorting(false);
    setIsSorted(false);
    setCurrId(null);
    setUnsortedArray(createArray(NUM_OF_ELEMENTS, MAX_VALUE));
  };

  // Ref to track the current array state
  const arrayRef = useRef(unsortedArray);

  useEffect(() => {
    arrayRef.current = unsortedArray;
  }, [unsortedArray]);

  useEffect(() => {
    const asyncBubbleSort = async () => {
      const copy = [...arrayRef.current];
      let localJ = j;
      let localI = i;

      if (localI >= copy.length - 1) {
        setIsSorting(false);
        setIsSorted(true);
        setCurrId(null);
        return;
      }
      if (localJ >= copy.length - 1 - localI) {
        setI((p) => p + 1);
        setJ(0);
      } else {
        if (copy[localJ].value > copy[localJ + 1].value) {
          // Swap the elements
          setCurrId(copy[localJ].id);

          let temp = copy[localJ];
          copy[localJ] = copy[localJ + 1];
          copy[localJ + 1] = temp;
          await wait(25);
          setUnsortedArray(copy);
        }
        setJ((p) => p + 1);
      }
    };

    if (isSorting && !isSorted) {
      asyncBubbleSort();
    }
  }, [i, j, isSorting, isSorted]);

  return (
    <VisualizationLayout
      title="Bubble Sort"
      tooltip="Bubble sort repeatedly steps through an unsorted array, compares adjacent elements, and swaps them if they are in the wrong order."
    >
      <div className="w-full h-full centered flex-col gap-y-8">
        <ul className="flex min-w-[25rem] w-[44rem] gap-x-1 h-[330px] items-end px-8 py-4 bg-app-faded-blue rounded-xl shadow-md">
          {unsortedArray.map(({ value, id }) => {
            return (
              <li
                key={id}
                className={classnames("flex-grow", {
                  "bg-app-yellow": id === currId,
                  "bg-white": id !== currId,
                })}
                style={{ height: `${value * 2.8}px` }}
              />
            );
          })}
        </ul>

        <div className="min-w-96 w-[44rem] between">
          <Button
            onClick={createUnsortedArray}
            variant="text"
            color={yellow}
            disabled={isSorting}
          >
            <Refresh />
            New Array
          </Button>
          <div className="flex gap-x-standard items-center">
            <Button onClick={pauseSorting} disabled={isSorted} variant="text">
              <Pause />
              Pause
            </Button>
            <Button
              disabled={isSorting || isSorted}
              onClick={() => {
                setIsSorting(true);
                if (isSorted) {
                  setI(0);
                  setJ(0);
                }
              }}
            >
              <Sort />
              Sort
            </Button>
          </div>
        </div>
      </div>
    </VisualizationLayout>
  );
}
