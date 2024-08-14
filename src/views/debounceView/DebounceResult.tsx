import { forwardRef } from "react";
import DebounceProgress from "./DebounceProgress";
import { classnames } from "../../util/classnames";
import Card from "../../features/card/Card";

interface DebounceResultProps {
  result: string;
  isWaiting: boolean;
}

const DebounceResult = forwardRef(
  ({ result, isWaiting }: DebounceResultProps, ref) => (
    <Card
      cardClassName="w-full"
      title={<h2 className="text-lg">Debounced Result</h2>}
    >
      <DebounceProgress ref={ref} />
      <div
        className={classnames(
          "debounce-result__content",
          "rounded-b-xl p-4 min-h-32 centered",
          "w-full lg:w-96"
        )}
      >
        <p
          className={classnames("text-wrap", {
            "opacity-25 transition-setting": isWaiting,
          })}
          style={{ overflowWrap: "anywhere" }}
        >
          {result}
        </p>
      </div>
    </Card>
  )
);

export default DebounceResult;
