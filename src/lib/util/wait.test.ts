import wait from "./wait";

describe("wait function", () => {
  it("should resolve after specified time", async () => {
    const ms = 500;
    const startTime = Date.now();
    await wait(ms);
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThan(ms);
  });

  it("should not resolve before specified time", async () => {
    // start a fake timer
    jest.useFakeTimers();
    const ms = 500;
    // attach a mock function to be called once wait resolves
    const onResolved = jest.fn();
    wait(ms).then(onResolved);
    // advance fake timer by ms / 2
    jest.advanceTimersByTime(ms / 2);
    // mock function should not have been called
    expect(onResolved).not.toHaveBeenCalled();
    // clear fake timers
    jest.clearAllTimers();
  });
});
