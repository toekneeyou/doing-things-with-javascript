import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import QueueInfo from "./QueueInfo";
import QueueVisual from "./QueueVisual";

export function QueueView() {
  return (
    <VisualizationLayout
      title="Queue"
      description={
        <span>
          A queue is a data structure that follows the{" "}
          <strong>First In, First Out (FIFO) principle</strong>.
        </span>
      }
      moreInfo={<QueueInfo />}
    >
      <QueueVisual />
    </VisualizationLayout>
  );
}
