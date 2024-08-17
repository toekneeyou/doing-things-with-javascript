import { useRef } from "react";
import TallArray, { TallArrayHandle } from "../../features/tallArray/TallArray";
import useStackOptions from "./useStackOptions";
import Button from "../../components/button/Button";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { classnames } from "../../lib/util/classnames";
import wait from "../../lib/util/wait";
import {
  MAX_STACK_LENGTH,
  STACK_TRANSITION_DURATION,
} from "../../lib/constants";

export default function StackVisual() {
  const stackContainerRef = useRef<TallArrayHandle>(null);
  const { stack, push, pop, clear } = useStackOptions();
  /**
   * doNotInterruptRef prevents popping of a value from the stack of a transition is in progress
   */
  const doNotInterruptRef = useRef(false);
  /**
   * handlePush pushes a value into the stack
   */
  const handlePush = () => {
    if (stack.length === 0) {
      push(1);
    } else {
      const newValue = stack[stack.length - 1] + 1;
      push(newValue);
    }
  };
  /**
   * animatePop animates the popping of a value from the stack
   */
  const animatePop = async () => {
    if (!doNotInterruptRef.current) {
      doNotInterruptRef.current = true;
      const stackContainer = stackContainerRef.current!;
      const lastEl = stackContainer.getChild(stack[stack.length - 1]);
      if (lastEl) {
        lastEl.style.transform = "translateX(100%)";
        lastEl.style.transitionDuration = STACK_TRANSITION_DURATION;
        await wait(250);
        pop(stack[stack.length - 1]);
        doNotInterruptRef.current = false;
      }
    }
  };
  /**
   * animateClear animates the clearing of the stack
   */
  const animateClear = async () => {
    const stackContainer = stackContainerRef.current!;
    const items = stackContainer.getAllChildren();
    let delay = 0;
    if (items) {
      for (let i = items.length - 1; i >= 0; i--) {
        const liEl = items[i];
        liEl.style.transform = "translateX(100%)";
        liEl.style.transitionDelay = `${delay}ms`;
        delay += 50;
      }
    }
    await wait(delay + 300);
    clear();
  };

  return (
    <div
      className={classnames(
        "stack-visual",
        "w-full h-full centered flex-col gap-y-8"
      )}
    >
      <TallArray ref={stackContainerRef} array={stack} />

      <StackControls
        push={handlePush}
        pop={animatePop}
        clear={animateClear}
        isEmpty={stack.length === 0}
        isFull={stack.length === MAX_STACK_LENGTH}
      />
    </div>
  );
}

interface StackControlsProps {
  push: () => void;
  pop: () => void;
  clear: () => void;
  isEmpty: boolean;
  isFull: boolean;
}

function StackControls({
  push,
  pop,
  clear,
  isEmpty,
  isFull,
}: StackControlsProps) {
  const PushIcon = (props?: any) => <PlusIcon {...props} />;
  const PopIcon = (props?: any) => <MinusIcon {...props} />;
  const ClearIcon = (props?: any) => <XMarkIcon {...props} />;

  return (
    <ul
      className={classnames(
        "stack-controls",
        "grid grid-cols-3 gap-x-standard"
      )}
    >
      <li className="w-full">
        <Button
          className="w-full"
          onClick={push}
          disabled={isFull}
          iconLeft={PushIcon}
        >
          Push
        </Button>
      </li>
      <li className="w-full">
        <Button
          className="w-full"
          onClick={pop}
          disabled={isEmpty}
          iconLeft={PopIcon}
        >
          Pop
        </Button>
      </li>

      <li className="w-full">
        <Button
          className="w-full"
          onClick={clear}
          disabled={isEmpty}
          iconLeft={ClearIcon}
        >
          Clear
        </Button>
      </li>
    </ul>
  );
}
