import { useCallback, useState } from "react";
import { InfoOutlined } from "@mui/icons-material";
import Button from "../../components/Button";
import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import throttle from "../../util/throttle";
import useThrottleOptions from "./useThrottleOptions";
import ThrottleProgress from "./ThrottleProgress";
import { classnames } from "../../util/classnames";
import Tooltip from "../../components/tooltip/Tooltip";
import Card from "../../features/card/Card";
import Badge from "../../features/badge/Badge";

export default function ThrottleView() {
  const [count, setCount] = useState(0);
  const [throttledCount, setThrottledCount] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [throttleKey, setThrottleKey] = useState(0);
  const { isLeading, isTrailing, isCancellable, wait, options } =
    useThrottleOptions();

  const throttledIncrementCount = useCallback(
    throttle(
      (num: number) => {
        setThrottledCount(num);
      },
      Number(wait),
      {
        isLeading: isLeading === "true",
        isTrailing: isTrailing === "true",
        isCancellable: isCancellable === "true",
        handleWait: (iw, tk) => {
          setIsWaiting(iw);
          if (tk !== undefined) {
            setThrottleKey(tk);
          }
        },
      }
    ),
    [isLeading, isTrailing, isCancellable, wait]
  );

  const handleIncrement = () => {
    setCount((p) => {
      throttledIncrementCount(p + 1);
      return p + 1;
    });
  };

  const cancelThrottle = () => {
    throttledIncrementCount.cancel?.();
  };

  return (
    <VisualizationLayout
      title="Throttle"
      tooltip="Throttling ensures that a function is called once within a
                specified time period. This can happen before and/or after the waiting period."
      options={options}
    >
      <div className="w-full h-full centered flex-col gap-y-4">
        <div className="w-[528px] space-y-4">
          <div className="centered gap-x-4">
            <div>0ms</div>
            <ThrottleProgress
              key={throttleKey}
              wait={Number(wait)}
              start={isWaiting}
            />
            <div>{wait}ms</div>
            {isCancellable && (
              <Button
                onClick={cancelThrottle}
                disabled={!isWaiting}
                className="bg-red-500 text-app-dark-blue"
              >
                Cancel
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 relative rounded-xl overflow-hidden">
            <Card
              cardClassName="w-64"
              title={
                <>
                  <h2>Regular Increment</h2>
                  <Tooltip content="This count will increment with every click.">
                    <InfoOutlined />
                  </Tooltip>
                </>
              }
            >
              <div className="centered h-44">
                <Badge
                  key={count}
                  size="xl"
                  className={classnames({ "animate-yellowRing": count !== 0 })}
                >
                  {count}
                </Badge>
              </div>
            </Card>

            <Button
              onClick={handleIncrement}
              className="absolute left-60 top-16"
            >
              +
            </Button>

            <Card
              cardClassName="w-64"
              title={
                <>
                  <h2>Throttled Increment</h2>
                  <Tooltip content="This count will be set only once within the specified wait period. This can happen before and/or after the waiting period.">
                    <InfoOutlined />
                  </Tooltip>
                </>
              }
            >
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
    </VisualizationLayout>
  );
}
