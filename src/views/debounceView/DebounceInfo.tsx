export default function DebounceInfo() {
  return (
    <ul className="debounce-info space-y-2 text-gray-400">
      <li>
        - This component debounces user input, updating the result after a
        delay.
      </li>
      <li>
        - The red bar shows the wait time, which resets with each keystroke.
      </li>
      <li>
        - If <code className="code">isLeading</code> is set to
        <code className="code">true</code>, the debounced function will execute
        once before initiating the waiting period.
      </li>

      <li>
        - If <code className="code">isTrailing</code> is set to
        <code className="code">true</code>, the debounced function will execute
        after the waiting period is over.
      </li>

      <li>
        - If both are <code className="code">true</code>, the debounced function
        will execute once before the initiating a waiting period, and the latest
        of subsequent attempts will be executed at the end.
      </li>
    </ul>
  );
}
