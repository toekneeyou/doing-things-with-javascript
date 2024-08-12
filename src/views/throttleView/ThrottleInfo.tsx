export default function ThrottleInfo() {
  return (
    <ul className="text-gray-400 space-y-2">
      <li>
        - This component throttles the count on the left, and updates the
        throttled count on the right after a delay.
      </li>
      <li>- The red bar shows the wait time.</li>
      <li>
        - If <span className="code">isLeading</span> is{" "}
        <span className="code">true</span>, the function will be called before
        kicking off a waiting period.
      </li>
      <li>
        - If <span className="code">isTrailing</span> is{" "}
        <span className="code">true</span>, any attempt to call the throttled
        function will result in one call at the end of the waiting period.
      </li>
      <li>
        - If both are <span className="code">true</span>, the function will be
        called before kicking off a waiting period, and the latest of subsequent
        attempts will be executed at the end before kicking off another waiting
        period.
      </li>
    </ul>
  );
}
