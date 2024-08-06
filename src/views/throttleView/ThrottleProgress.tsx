import { forwardRef, useEffect, useRef } from "react";
import { classnames } from "../../util/classnames";

interface ThrottleProgressProps {
  wait: number;
  start: boolean;
}

const ThrottleProgress = forwardRef(
  (
    { wait, start }: ThrottleProgressProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const progressEl = progressRef.current!;
      if (start) {
        progressEl.style.animationDuration = `${wait}ms`;
        progressEl.classList.remove("animate-slideRight");
        void progressEl.offsetWidth; // Trigger reflow
        progressEl.classList.add("animate-slideRight");
      } else {
        progressEl.classList.remove("animate-slideRight");
      }
    }, [start, wait]);

    return (
      <div
        className={classnames(
          "throttle-result__progress-bar",
          "w-96 bg-app-faded-blue h-2 overflow-hidden relative"
        )}
      >
        <div
          ref={progressRef}
          className={classnames(
            "bg-red-500 h-full w-full absolute left-[-100%]"
          )}
        />
      </div>
    );
  }
);

export default ThrottleProgress;
