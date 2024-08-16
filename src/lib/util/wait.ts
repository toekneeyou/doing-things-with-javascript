export default async function wait(
  ms: number,
  timerId?: ReturnType<typeof setTimeout>
) {
  const promise = new Promise((resolve) => {
    timerId = setTimeout(resolve, ms);
  });

  return promise as Promise<void>;
}
