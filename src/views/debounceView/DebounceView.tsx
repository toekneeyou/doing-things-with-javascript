import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import DebounceOptionsDescription from "./DebounceOptionsDescription";
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
            This component debounces user input, updating the result after a
            delay. The red bar shows the wait time, which resets with each
            keystroke. Only the final input is processed, unless you tweak the
            options below.
          </span>
        }
        optionsDescription={<DebounceOptionsDescription />}
        options={<DebounceOptions />}
      >
        <DebounceVisual />
      </VisualizationLayout>
    </DebounceContextProvider>
  );
}
