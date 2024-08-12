import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import ThrottleContextProvider from "../../context/ThrottleContext";
import ThrottleVisual from "./ThrottleVisual";
import ThrottleInfo from "./ThrottleInfo";
import ThrottleOptions from "./ThrottleOptions";

export function ThrottleView() {
  return (
    <ThrottleContextProvider>
      <VisualizationLayout
        title="Throttle"
        description="Throttle is a programming technique that ensures that a function is called only once within a
                specified time period."
        moreInfo={<ThrottleInfo />}
        options={<ThrottleOptions />}
      >
        <ThrottleVisual />
      </VisualizationLayout>
    </ThrottleContextProvider>
  );
}
