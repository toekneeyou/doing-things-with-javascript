import Button from "../../components/button/Button";
import {
  ArrowPathIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { classnames } from "../../util/classnames";
import {
  useBSArrayActionContext,
  useBSAutoSortContext,
  useBSManualSortContext,
  useBSRefContext,
  useBSSortStatusContext,
} from "../../context/BubbleSortContext";

interface BubbleSortControlsProps {}

export default function BubbleSortControls({}: BubbleSortControlsProps) {
  return (
    <div
      className={classnames(
        "bubble-sort-visual__bottom",
        "between gap-x-standard",
        "w-full lg:min-w-96 lg:w-[30rem]"
      )}
    >
      <RefreshButton />
      <div className="flex gap-x-standard">
        <SortButton />
        <NextIterationButton />
        <SpeedButton />
      </div>
    </div>
  );
}

function SortButton() {
  const { isSorted, isAutoSort } = useBSSortStatusContext();
  const { toggleAutoSort } = useBSAutoSortContext();
  const SortIcon = (props?: any) =>
    isAutoSort ? <PauseIcon {...props} /> : <PlayIcon {...props} />;

  return (
    <Button
      onClick={toggleAutoSort}
      disabled={isSorted}
      className="w-16"
      variant="icon-filled"
      icon={SortIcon}
    />
  );
}

function RefreshButton() {
  const { isAutoSort } = useBSSortStatusContext();
  const { handleRefresh } = useBSArrayActionContext();
  const RefreshIcon = (props?: any) => <ArrowPathIcon {...props} />;

  return (
    <Button
      onClick={handleRefresh}
      disabled={isAutoSort}
      variant="icon"
      icon={RefreshIcon}
    />
  );
}

function NextIterationButton() {
  const { isAutoSort, isSorted } = useBSSortStatusContext();
  const { nextIteration } = useBSManualSortContext();

  const NextIcon = (props?: any) => <ForwardIcon {...props} />;

  return (
    <Button
      onClick={nextIteration}
      disabled={isAutoSort || isSorted}
      variant="icon"
      icon={NextIcon}
    />
  );
}

function SpeedButton() {
  const { isSorted } = useBSSortStatusContext();
  const { handleSpeed } = useBSAutoSortContext();
  const { speedButtonRef, speedRef } = useBSRefContext();

  return (
    <Button
      ref={speedButtonRef}
      onClick={handleSpeed}
      disabled={isSorted}
      className="text-app-yellow"
      variant="icon"
      icon={() => <span>{speedRef.current}x</span>}
    />
  );
}
