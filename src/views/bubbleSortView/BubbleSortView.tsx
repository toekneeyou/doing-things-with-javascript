import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import BubbleSortInfo from "./BubbleSortInfo";
import BubbleSortVisual from "./BubbleSortVisual";

export function BubbleSortView() {
  return (
    <VisualizationLayout
      title="Bubble Sort"
      description="Bubble sort repeatedly steps through an unsorted array, compares
          adjacent elements, and swaps them if they are in the wrong order."
      moreInfo={<BubbleSortInfo />}
    >
      <BubbleSortVisual />
    </VisualizationLayout>
  );
}
