import { classnames } from "../../util/classnames";

export default function StackInfo() {
  return (
    <div className={classnames("stack-info", "w-96")}>
      <div>
        <h2 className="text-2xl mb-4 font-bold">Stack</h2>
        <p className="text-gray-400">
          A stack is a data structure that follows the{" "}
          <strong>Last In, First Out (LIFO)</strong> principle. Elements are
          added and removed from the top.
        </p>
      </div>
      <hr className="my-8 opacity-50" />
      <div>
        <h3 className="text-xl mb-4 font-bold">Instructions</h3>
        <ul className="text-gray-400 space-y-2">
          <li>
            - Use the <strong className="text-app-yellow">Push</strong> button
            to add an element to the top of the stack.
          </li>
          <li>
            - Use the <strong className="text-app-yellow">Pop</strong> button to
            remove an element from the top of the stack.
          </li>
          <li>
            - Use the <strong className="text-app-yellow">Clear</strong> button
            to empty the stack.
          </li>
        </ul>
      </div>
    </div>
  );
}
