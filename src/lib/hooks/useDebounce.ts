import { useRef } from "react";
import { debounce, type DebounceOptions } from "../util/debounce";

/**
 *
 * @param fn
 * @param delay
 * @param options
 * @returns a stable debounced function
 */
const useDebounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
  options: DebounceOptions,
) => {
  const fnRef = useRef<ReturnType<typeof debounce>>(undefined);

  if (!fnRef.current) {
    fnRef.current = debounce(fn, delay, options);
  }

  return fnRef.current;
};

export default useDebounce;
