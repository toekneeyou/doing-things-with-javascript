import { forwardRef } from "react";
import Tooltip from "../../components/tooltip/Tooltip";
import DebounceProgress from "./DebounceProgress";
import { classnames } from "../../util/classnames";
import Card from "../../features/card/Card";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

interface DebounceResultProps {
  result: string;
}

const DebounceResult = forwardRef(({ result }: DebounceResultProps, ref) => (
  <Card
    title={
      <>
        <h2 className="text-xl">Debounced Result</h2>
        <Tooltip
          position="bottom"
          content="Depending on how you configured your debounced function, your
debounced string might show up immediately or after a delay."
        >
          <InformationCircleIcon className="size-6 text-app-white" />
        </Tooltip>
      </>
    }
  >
    <DebounceProgress ref={ref} />
    <div
      className={classnames(
        "debounce-result__content",
        "rounded-b-xl w-96 p-4 min-h-32 centered"
      )}
    >
      <p className="text-wrap" style={{ overflowWrap: "anywhere" }}>
        {result}
      </p>
    </div>
  </Card>
));

export default DebounceResult;
