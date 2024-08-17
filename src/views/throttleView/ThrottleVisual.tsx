import { ReactNode, useCallback, useState } from "react";
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
    <div className={classnames("throttle-visual", "w-full h-full centered")}>
      <div className={classnames("w-full max-w-[26rem] space-y-4")}>
        <div className="centered gap-x-standard">
          <div>0ms</div>
          <ThrottleProgress
            key={throttleKey}
            wait={Number(wait)}
            start={isWaiting}
          />
          <div>{wait}ms</div>
          {optionsModal}
        </div>

        <div
          className={classnames(
            "flex rounded-xl w-full overflow-hidden",
            "gap-1 lg:gap-2"
          )}
        >
          <IncrementCard
            header={<RegularIncrementCardHeader />}
            count={count}
          />
          <div className="mx-[-20px] z-[1]">
            <Button
              onClick={handleIncrement}
              className="mt-12"
              variant="icon-filled"
              iconLeft={IncrementIcon}
            />
          </div>

          <IncrementCard
            header={<ThrottledIncrementCardHeader />}
            count={throttledCount}
          />
        </div>
      </div>
    </div>
  );
}

const IncrementCard = ({
  count,
  header,
}: {
  count: number;
  header: ReactNode;
}) => {
  return (
    <Card
      className="md:w-64 basis-full"
      header={header}
      body={<IncrementCardBody count={count} />}
    />
  );
};
const IncrementCardBody = ({ count }: { count: number }) => {
  return (
    <div className="centered h-44 bg-app-faded-blue">
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
  );
};
const RegularIncrementCardHeader = () => {
  return (
    <Card.Header title={<h2 className="text-sm lg:text-base">Count</h2>} />
  );
};
const ThrottledIncrementCardHeader = () => {
  return (
    <Card.Header
      title={<h2 className="text-sm lg:text-base">Throttled Count</h2>}
    />
  );
};
