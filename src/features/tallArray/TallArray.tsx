import { forwardRef, useImperativeHandle, useRef } from "react";
import { classnames } from "../../util/classnames";

interface TallArrayProps {
  array: number[];
}

export interface TallArrayHandle {
  getAllChildren: () => NodeListOf<HTMLLIElement>;
  getChild: (num: number) => HTMLLIElement | null;
}

const TallArray = forwardRef(({ array }: TallArrayProps, ref) => {
  const tallArrayRef = useRef<HTMLUListElement>(null);

  useImperativeHandle(
    ref,
    () => {
      const tallArray = tallArrayRef.current!;
      const tallArrayHandle: TallArrayHandle = {
        getAllChildren() {
          return tallArray.querySelectorAll(".tall-array__item");
        },
        getChild(num: number) {
          return tallArray.querySelector(`#array-${num}`) as HTMLLIElement;
        },
      };
      return tallArrayHandle;
    },
    []
  );

  return (
    <ul
      ref={tallArrayRef}
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
