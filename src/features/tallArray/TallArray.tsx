import { forwardRef, LegacyRef } from "react";
import { classnames } from "../../util/classnames";

interface TallArrayProps {
  array: number[];
}

const TallArray = forwardRef(({ array }: TallArrayProps, ref) => {
  return (
    <ul
      ref={ref as LegacyRef<HTMLUListElement>}
      className={classnames(
        "tall-array",
        "relative overflow-hidden rounded-xl border-4 border-app-dark-blue gap-y-1 bg-app-dark-blue w-40 h-[356px] flex justify-start flex-col-reverse"
      )}
    >
      {array.map((num) => {
        return (
          <li
            key={num}
            id={`array-${num}`}
            className="tall-array__item transition-transform transition-setting w-full centered h-10 bg-app-faded-blue z-[1]"
          >
            {num}
          </li>
        );
      })}
      <div
        className={classnames(
          "h-12 centered absolute bottom-0 left-0 w-full transition-setting z-0",
          { "opacity-0": array.length > 0 }
        )}
      >
        Empty
      </div>
    </ul>
  );
});

export default TallArray;
