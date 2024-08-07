type ThrottleOptions = {
  isLeading?: boolean;
  isTrailing?: boolean;
  isCancellable?: boolean;
  handleWait?: (isWaiting: boolean, id?: number) => void;
};

export default function throttle<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  options: Partial<ThrottleOptions> = {}
): ((...args: any) => void) & { cancel?: () => void } {
  const {
    isLeading = true,
    isTrailing = true,
    isCancellable = true,
    handleWait,
  } = options;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let waitTimeout: ReturnType<typeof setTimeout> | null = null;
  let lastCall = 0;
  let lastArgs: Parameters<T> | null = null;
  let lastContext: any = null;

  function callFunction(context: any, args: Parameters<T>) {
    func.apply(context, args);
    lastCall = Date.now();
  }

  function cancelWait() {
    handleWait?.(false);
    waitTimeout = null;
  }

  function throttledFunction(this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const elapsedTime = now - lastCall;
    const remainingTime = wait - elapsedTime;
    const callNow = isLeading && elapsedTime >= wait;
    lastArgs = args;
    lastContext = this;

    if (wait === 0 || (!isLeading && !isTrailing)) {
      callFunction(lastContext, lastArgs);
      return;
    }

    /**
     * Call Now
     */
    if (callNow) {
      handleWait?.(true, Math.random());
      callFunction(lastContext, lastArgs);
      clearTimeout(waitTimeout!);
      waitTimeout = setTimeout(cancelWait, wait);
      /**
       * Call Later
       */
    } else if (isTrailing && !timeout && lastArgs) {
      const actualWait = remainingTime > 0 ? remainingTime : wait;
      if (actualWait === wait) {
        handleWait?.(true, Math.random());
      }

      timeout = setTimeout(() => {
        // throttle call after isLeading
        clearTimeout(waitTimeout!);
        handleWait?.(true, Math.random());
        waitTimeout = setTimeout(cancelWait, wait);
        callFunction(lastContext, lastArgs!);
        timeout = null;
        lastContext = null;
        lastArgs = null;
      }, actualWait);
    }
  }

  if (isCancellable) {
    throttledFunction.cancel = () => {
      clearTimeout(timeout!);
      clearTimeout(waitTimeout!);
      cancelWait();
      timeout = null;
      lastContext = null;
      lastArgs = null;
    };
  }

  return throttledFunction;
}
