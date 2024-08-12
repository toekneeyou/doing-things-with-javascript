import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import DebounceInfo from "./DebounceInfo";
import DebounceOptions from "./DebounceOptions";
import DebounceVisual from "./DebounceVisual";
import DebounceContextProvider from "../../context/DebounceContext";

export function DebounceView() {
  return (
    <DebounceContextProvider>
      <VisualizationLayout
        title="Debounce"
        description={
          <span>
            Debounce is a programming technique that ensures a function is only
            executed after a specified period of inactivity, preventing it from
            being called multiple times in quick succession.
          </span>
        }
        moreInfo={<DebounceInfo />}
        options={<DebounceOptions />}
      >
        <DebounceVisual />
      </VisualizationLayout>
    </DebounceContextProvider>
  );
}
