import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import ThrottleContextProvider from "../../context/ThrottleContext";
import ThrottleVisual from "./ThrottleVisual";
import ThrottleOptions from "./ThrottleOptions";
import VisualizationInfo from "../../layouts/visualizationLayout/VisualizationInfo";
import { useViewportStateContext } from "../../context/ViewportContext";
import { lazy, Suspense } from "react";

const ThrottleOptionsModal = lazy(() => import("./ThrottleOptionsModal"));

export function ThrottleView() {
  return (
    <ThrottleContextProvider>
      <VisualizationLayout
        infoPanel={<ThrottleInfoPanel />}
        optionsPanel={<ThrottleOptions />}
        visual={<ThrottleVisual optionsModal={<LazyThrottleOptionsModal />} />}
      />
    </ThrottleContextProvider>
  );
}

function ThrottleInfoPanel() {
  return (
    <VisualizationInfo
      title="Throttle"
      description={<ThrottleDescription />}
      moreInfo={<ThrottleInfo />}
    />
  );
}

function ThrottleDescription() {
  return (
    <span>
      Throttle is a programming technique that ensures that a function is called
      only once within a specified time period.
    </span>
  );
}

function ThrottleInfo() {
  return (
    <ul className="text-gray-400 space-y-2">
      <li>
        - This component throttles the count on the left, and updates the
        throttled count on the right after a delay.
      </li>
      <li>- The red bar shows the wait time.</li>
      <li>
        - If <span className="code">isLeading</span> is{" "}
        <span className="code">true</span>, the function will be called before
        kicking off a waiting period.
      </li>
      <li>
        - If <span className="code">isTrailing</span> is{" "}
        <span className="code">true</span>, any attempt to call the throttled
        function will result in one call at the end of the waiting period.
      </li>
      <li>
        - If both are <span className="code">true</span>, the function will be
        called before kicking off a waiting period, and the latest of subsequent
        attempts will be executed at the end before kicking off another waiting
        period.
      </li>
    </ul>
  );
}

function LazyThrottleOptionsModal() {
  const viewportSize = useViewportStateContext();
  const isRendered =
    viewportSize === "xs" || viewportSize === "sm" || viewportSize === "md";

  return isRendered ? (
    <Suspense>
      <ThrottleOptionsModal />
    </Suspense>
  ) : null;
}
