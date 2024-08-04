type DebounceOptions = {
  isLeading?: boolean;
  isTrailing?: boolean;
  isCancellable?: boolean;
  handleWait?: (isWaiting: boolean) => void;
};

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
  options: Partial<DebounceOptions> = {}
): ((...args: Parameters<T>) => void) & { cancel?: () => void } {
  const {
    isLeading = true,
    isTrailing = true,
    isCancellable = true,
    handleWait,
  } = options;
  let timerId: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunction = function (this: any, ...args: Parameters<T>) {
    const context = this;

    const noDebounce = !isLeading && !isTrailing;
    const callNow = isLeading && !timerId;

    // Always clear previous timeout
    if (timerId) {
      clearTimeout(timerId);
    }

    // If no debounce, execute function immediately, don't have to set any timeout
    if (noDebounce) {
      fn.apply(context, args);
      return;
    }

    const resetDelayWithoutFnCall = () => {
      handleWait?.(true);
      timerId = setTimeout(() => {
        timerId = null;
        handleWait?.(false);
      }, delay);
    };

    if (callNow) {
      // If callNow, execute function immediately and set a timeout to set timerId back to null
      fn.apply(context, args);
      resetDelayWithoutFnCall();
      return;
    }

    // If trailing, reset delay and execute function after delay
    if (isTrailing) {
      handleWait?.(true);
      timerId = setTimeout(() => {
        fn.apply(context, args);
        timerId = null;
        handleWait?.(false);
      }, delay);
      // if no trailing, reset delay only
    } else {
      resetDelayWithoutFnCall();
    }
  };

  function cancelDebounce(): void {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
      handleWait?.(false);
    }
  }

  if (isCancellable) {
    debouncedFunction.cancel = cancelDebounce;
  }

  return debouncedFunction;
}
