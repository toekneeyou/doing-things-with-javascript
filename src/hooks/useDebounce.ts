import { useRef } from "react";
import { debounce, DebounceOptions } from "../util/debounce";

const useDebounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
  options: DebounceOptions
) => {
  const fnRef = useRef<ReturnType<typeof debounce>>();
  if (!fnRef.current) {
    fnRef.current = debounce(fn, delay, options);
  }

  return fnRef.current;
};

export default useDebounce;
