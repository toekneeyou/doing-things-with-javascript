import { InfoOutlined } from "@mui/icons-material";
import Button from "../../components/Button";
import Tooltip from "../../components/tooltip/Tooltip";
import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import useStackOptions from "./useStackOptions";
import { useCallback, useRef } from "react";

const MAX_STACK_LENGTH = 8;

export default function StackView() {
  const { stack, push, pop, peek, clear, isEmpty } = useStackOptions({
    maxLength: MAX_STACK_LENGTH,
  });
  let popTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePeek = () => {
    if (!isEmpty()) {
      const lastNum = peek();
      const lastEl = document.getElementById(`stack-${lastNum}`)!;
      lastEl.classList.toggle("animate-yellowRing");
      setTimeout(() => {
        lastEl.classList.toggle("animate-yellowRing");
      }, 300);
    }
  };

  const handlePop = useCallback(() => {
    if (!isEmpty()) {
      clearTimeout(popTimeout.current!);
      const lastNum = peek();
      const lastEl = document.getElementById(`stack-${lastNum}`)!;
      lastEl.style.transform = "translateX(100%)";
      popTimeout.current = setTimeout(() => {
        pop();
        popTimeout.current = null;
      }, 100);
    }
  }, [stack]);

  return (
    <VisualizationLayout
      title="Stack"
      tooltip={
        "A stack is a data structure that follows the Last In, First Out (LIFO) principle. Elements are added and removed from the top."
      }
    >
      <div className="w-full h-full centered flex-col gap-y-8">
        <div className="centered gap-x-4">
          <ul className="duration-100 overflow-hidden border-2 gap-y-1 border-t-0 border-app-white w-40 pt-4 h-[25rem] flex justify-start flex-col-reverse">
            {stack.map((num) => {
              return (
                <li
                  id={`stack-${num}`}
                  className="transition-transform w-full centered h-10 bg-app-faded-blue"
                >
                  {num}
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="grid grid-cols-4 gap-x-4">
          <li className="w-full">
            <Button
              className="w-full"
              onClick={push}
              disabled={stack.length === MAX_STACK_LENGTH}
            >
              Push
              <Tooltip content="Incrementally add a number into the stack.">
                <InfoOutlined />
              </Tooltip>
            </Button>
          </li>
          <li className="w-full">
            <Button className="w-full" onClick={handlePop} disabled={isEmpty()}>
              Pop
              <Tooltip content="Remove the last element from the top of the stack.">
                <InfoOutlined />
              </Tooltip>
            </Button>
          </li>
          <li className="w-full">
            <Button
              className="w-full"
              onClick={handlePeek}
              disabled={isEmpty()}
            >
              Peek
              <Tooltip content="Look at the last element in the stack.">
                <InfoOutlined />
              </Tooltip>
            </Button>
          </li>
          <li className="w-full">
            <Button className="w-full" onClick={clear} disabled={isEmpty()}>
              Clear
              <Tooltip content="Clear the stack.">
                <InfoOutlined />
              </Tooltip>
            </Button>
          </li>
        </ul>
      </div>
    </VisualizationLayout>
  );
}
