import { forwardRef, LegacyRef, RefObject } from "react";
import { classnames } from "../../util/classnames";

const DebounceProgress = forwardRef(({}, ref) => {
  return (
    <div
      className={classnames(
        "debounced-result__progress-bar",
        "w-96 bg-app-faded-blue h-2 overflow-hidden relative"
      )}
    >
      <div
        ref={ref as LegacyRef<HTMLDivElement>}
        className={classnames("bg-red-500 h-full w-full absolute left-[-100%]")}
      />
    </div>
  );
});

export default DebounceProgress;
