import VisualizationInfo from "../../layouts/visualizationLayout/VisualizationInfo";
import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import StackVisual from "./StackVisual";

export function StackView() {
  return (
    <VisualizationLayout
      infoPanel={<StackInfoPanel />}
      visual={<StackVisual />}
    />
  );
}

function StackInfoPanel() {
  return (
    <VisualizationInfo
      title="Stack"
      description={<StackDescription />}
      moreInfo={<StackInfo />}
    />
  );
}

function StackDescription() {
  return (
    <span>
      A stack is a data structure that follows the{" "}
      <strong className="text-white">Last In, First Out (LIFO)</strong>{" "}
      principle. Elements are added and removed from the top.
    </span>
  );
}

function StackInfo() {
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
