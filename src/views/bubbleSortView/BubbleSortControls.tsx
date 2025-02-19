import Button from "../../components/button/Button";
import {
  ArrowPathIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { classnames } from "../../lib/util/classnames";
import {
  useBSArrayActionContext,
  useBSAutoSortContext,
  useBSManualSortContext,
  useBSRefContext,
  useBSSortStatusContext,
} from "../../context/BubbleSortContext";
import { useViewportStateContext } from "../../context/ViewportContext";

interface BubbleSortControlsProps {}

export default function BubbleSortControls({}: BubbleSortControlsProps) {
  const { isMobile } = useViewportStateContext();
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
        {!isMobile && <NextIterationButton />}
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
const RefreshIcon = (props?: any) => <ArrowPathIcon {...props} />;
function RefreshButton() {
  const { isAutoSort } = useBSSortStatusContext();
  const { handleRefresh } = useBSArrayActionContext();
  return (
    <Button
      onClick={handleRefresh}
      disabled={isAutoSort}
      variant="icon"
      icon={RefreshIcon}
    />
  );
}

const NextIcon = (props?: any) => <ForwardIcon {...props} />;
function NextIterationButton() {
  const { isAutoSort, isSorted } = useBSSortStatusContext();
  const { nextIteration } = useBSManualSortContext();
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
