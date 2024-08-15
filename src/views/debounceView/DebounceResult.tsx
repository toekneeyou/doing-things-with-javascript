import { forwardRef } from "react";
import DebounceProgress from "./DebounceProgress";
import { classnames } from "../../lib/util/classnames";
import Card from "../../features/card/Card";

interface DebounceResultProps {
  result: string;
  isWaiting: boolean;
}

const DebounceResult = forwardRef(
  ({ result, isWaiting }: DebounceResultProps, ref) => (
    <Card
      className="w-full"
      header={<DebounceResultCardHeader />}
      body={
        <DebounceResultCardBody
          result={result}
          isWaiting={isWaiting}
          ref={ref}
        />
      }
    />
  )
);

const DebounceResultCardHeader = () => {
  return <Card.Header title={<h2 className="text-lg">Debounced Result</h2>} />;
};

interface DebounceResultCardBodyProps extends DebounceResultProps {}

const DebounceResultCardBody = forwardRef(
  ({ isWaiting, result }: DebounceResultCardBodyProps, ref) => {
    return (
      <Card.Body>
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
      </Card.Body>
    );
  }
);

export default DebounceResult;
