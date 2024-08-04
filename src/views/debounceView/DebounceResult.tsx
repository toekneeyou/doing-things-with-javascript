import { InfoOutlined } from "@mui/icons-material";
import Tooltip from "../../components/tooltip/Tooltip";
import { forwardRef } from "react";
import DebounceProgress from "./DebounceProgress";
import { classnames } from "../../util/classnames";

interface DebounceResultProps {
  result: string;
}

const DebounceResult = forwardRef(({ result }: DebounceResultProps, ref) => {
  return (
    <div className={classnames("debounce-result")}>
      <div
        className={classnames(
          "debounce-result__header",
          "centered space-x-2 bg-app-dark-blue h-20 rounded-t-xl"
        )}
      >
        <h2 className="text-xl">Debounced Result</h2>
        <Tooltip
          position="bottom"
          content="Depending on how you configured your debounced function, your
  debounced string might show up immediately or after a delay."
        >
          <InfoOutlined />
        </Tooltip>
      </div>

      <DebounceProgress ref={ref} />

      <div
        className={classnames(
          "debounce-result__content",
          "bg-app-yellow rounded-b-xl w-96 p-4 min-h-32 text-app-black centered"
        )}
      >
        <p className="text-wrap" style={{ overflowWrap: "anywhere" }}>
          {result}
        </p>
      </div>
    </div>
  );
});

export default DebounceResult;
