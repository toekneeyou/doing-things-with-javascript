export default function StackInfo() {
  return (
    <ul className="text-gray-400 space-y-2">
      <li>
        - Use the <strong className="text-app-yellow">Push</strong> button to
        add an element to the top of the stack.
      </li>
      <li>
        - Use the <strong className="text-app-yellow">Pop</strong> button to
        remove an element from the top of the stack.
      </li>
      <li>
        - Use the <strong className="text-app-yellow">Clear</strong> button to
        empty the stack.
      </li>
    </ul>
  );
}
