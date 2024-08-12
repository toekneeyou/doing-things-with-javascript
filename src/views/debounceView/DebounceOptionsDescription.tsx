export default function DebounceOptionsDescription() {
  return (
    <ul className="space-y-2">
      <li className="text-gray-400">
        - If <code className="code">isLeading</code> is set to
        <code className="code">true</code>, the debounced function will execute
        once before initiating the waiting period.
      </li>

      <li className="text-gray-400">
        - If <code className="code">isTrailing</code> is set to
        <code className="code">true</code>, the debounced function will execute
        after the waiting period is over.
      </li>

      <li className="text-gray-400">
        - If both are <code className="code">true</code>, the debounced function
        will execute once before the initiating a waiting period, and the latest
        of subsequent attempts will be executed at the end.
      </li>
    </ul>
  );
}
