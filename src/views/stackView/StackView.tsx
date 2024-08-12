import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import StackInfo from "./StackInfo";
import StackVisual from "./StackVisual";

export function StackView() {
  return (
    <VisualizationLayout
      title="Stack"
      description={
        <span>
          A stack is a data structure that follows the{" "}
          <strong className="text-white">Last In, First Out (LIFO)</strong>{" "}
          principle. Elements are added and removed from the top.
        </span>
      }
      moreInfo={<StackInfo />}
    >
      <StackVisual />
    </VisualizationLayout>
  );
}
