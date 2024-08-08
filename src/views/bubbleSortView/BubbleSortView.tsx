import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";

export default function BubbleSortView() {
  return (
    <VisualizationLayout
      title="Bubble Sort"
      tooltip="Bubble sort repeatedly steps through an unsorted array, compares adjacent elements, and swaps them if they are in the wrong order."
    >
      <div className="w-full h-full centered"></div>
    </VisualizationLayout>
  );
}
