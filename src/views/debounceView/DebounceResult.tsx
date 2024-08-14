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
      <p className="text-wrap" style={{ overflowWrap: "anywhere" }}>
        {result}
      </p>
    </div>
  </Card>
));

export default DebounceResult;
