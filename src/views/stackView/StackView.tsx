import { Add, Clear, Remove } from "@mui/icons-material";
import Button from "../../components/Button";
import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import useStackOptions from "./useStackOptions";
import { useCallback, useRef } from "react";
import TallArray from "../../features/tallArray/TallArray";

const MAX_STACK_LENGTH = 8;

export function StackView() {
  const stackContainerRef = useRef<HTMLUListElement>(null);
  const { stack, push, pop, clear, isEmpty } = useStackOptions({
    maxLength: MAX_STACK_LENGTH,
  });
  let popTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClear = () => {
    const queueContainerEl = stackContainerRef.current;
    if (queueContainerEl) {
      const items = queueContainerEl.querySelectorAll("li");
      let delay = 0;

      for (let i = items.length - 1; i >= 0; i--) {
        const liEl = items[i] as HTMLLIElement;
        liEl.style.transform = "translateX(100%)";
        liEl.style.transitionDelay = `${delay}ms`;
        delay += 50;
      }

      setTimeout(() => {
        clear();
      }, delay + 300);
    }
  };

  const handlePop = useCallback(() => {
    if (stack.length > 0) {
      clearTimeout(popTimeout.current!);
      const lastNum = stack[stack.length - 1];
      const lastEl = document.getElementById(`array-${lastNum}`)!;
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
        <TallArray ref={stackContainerRef} array={stack} />

        <ul className="grid grid-cols-3 gap-x-standard">
          <li className="w-full">
            <Button
              className="w-full"
              onClick={push}
              disabled={stack.length === MAX_STACK_LENGTH}
            >
              <Add />
              Push
            </Button>
          </li>
          <li className="w-full">
            <Button className="w-full" onClick={handlePop} disabled={isEmpty()}>
              <Remove />
              Pop
            </Button>
          </li>

          <li className="w-full">
            <Button
              className="w-full"
              onClick={handleClear}
              disabled={isEmpty()}
            >
              <Clear />
              Clear
            </Button>
          </li>
        </ul>
      </div>
    </VisualizationLayout>
  );
}
