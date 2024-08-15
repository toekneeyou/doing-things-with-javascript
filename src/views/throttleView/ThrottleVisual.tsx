import { useCallback, useState } from "react";
import { useThrottleStateContext } from "../../context/ThrottleContext";
import ThrottleProgress from "./ThrottleProgress";
import Card from "../../features/card/Card";
import Badge from "../../features/badge/Badge";
import { classnames } from "../../lib/util/classnames";
import Button from "../../components/button/Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import throttle from "../../lib/util/throttle";

interface ThrottleVisualProps {
  optionsModal: JSX.Element;
}

export default function ThrottleVisual({ optionsModal }: ThrottleVisualProps) {
  const [count, setCount] = useState(0);
  const [throttledCount, setThrottledCount] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [throttleKey, setThrottleKey] = useState(0);

  const { wait, isLeading, isTrailing } = useThrottleStateContext();

  const throttledIncrementCount = useCallback(
    throttle(
      (num: number) => {
        setThrottledCount(num);
      },
      Number(wait),
      {
        isLeading,
        isTrailing,
        isCancellable: true,
        handleWait: (iw, tk) => {
          setIsWaiting(iw);
          if (tk !== undefined) {
            setThrottleKey(tk);
          }
        },
      }
    ),
    [isLeading, isTrailing, wait]
  );

  const handleIncrement = () => {
    setCount((p) => {
      throttledIncrementCount(p + 1);
      return p + 1;
    });
  };

  const IncrementIcon = (props?: any) => <PlusIcon {...props} />;

  return (
    <div className="w-full h-full centered flex-col gap-y-4">
      <div className="w-[528px] space-y-4">
        {optionsModal}
        <div className="centered gap-x-standard">
          <div>0ms</div>
          <ThrottleProgress
            key={throttleKey}
            wait={Number(wait)}
            start={isWaiting}
          />
          <div>{wait}ms</div>
        </div>
        <div className="grid grid-cols-2 gap-2 relative rounded-xl overflow-hidden">
          <Card cardClassName="w-64" title={<h2>Count</h2>}>
            <div className="centered h-44">
              <Badge
                key={count}
                size="xl"
                className={classnames({
                  "animate-yellowRing": count !== 0,
                })}
              >
                {count}
              </Badge>
            </div>
          </Card>

          <Button
            onClick={handleIncrement}
            className="absolute left-[15.125rem] top-12"
            variant="icon-filled"
            iconLeft={IncrementIcon}
          />

          <Card cardClassName="w-64" title={<h2>Throttled Count</h2>}>
            <div className="centered h-44">
              <Badge
                key={throttledCount}
                size="xl"
                className={classnames({
                  "animate-yellowRing": throttledCount !== 0,
                })}
              >
                {throttledCount}
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
