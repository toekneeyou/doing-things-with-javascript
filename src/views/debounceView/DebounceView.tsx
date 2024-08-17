import VisualizationLayout from "../../layouts/visualizationLayout/VisualizationLayout";
import DebounceVisual from "./DebounceVisual";
import DebounceContextProvider from "../../context/DebounceContext";
import { useViewportStateContext } from "../../context/ViewportContext";
import { lazy, Suspense } from "react";
import VisualizationInfo from "../../layouts/visualizationLayout/VisualizationInfo";

const DebounceOptionsModal = lazy(() => import("./DebounceOptionsModal"));
const DebounceOptions = lazy(() => import("./DebounceOptions"));

export function DebounceView() {
  return (
    <DebounceContextProvider>
      <VisualizationLayout
        infoPanel={<DebounceInfoPanel />}
        optionsPanel={<LazyDebounceOptions />}
        visual={<DebounceVisual optionsModal={<LazyDebounceOptionsModal />} />}
      />
    </DebounceContextProvider>
  );
}

function DebounceInfoPanel() {
  return (
    <VisualizationInfo
      title="Debounce"
      description={<DebounceDescription />}
      moreInfo={<DebounceInfo />}
    />
  );
}

function DebounceDescription() {
  return (
    <span>
      Debounce is a programming technique that ensures a function is only
      executed after a specified period of inactivity, preventing it from being
      called multiple times in quick succession.
    </span>
  );
}

function DebounceInfo() {
  return (
    <ul className="debounce-info space-y-2 text-gray-400">
      <li>
        - This component debounces user input, updating the result after a
        delay.
      </li>
      <li>
        - The red bar shows the wait time, which resets with each keystroke.
      </li>
      <li>
        - If <code className="code">isLeading</code> is set to
        <code className="code">true</code>, the debounced function will execute
        once before initiating the waiting period.
      </li>

      <li>
        - If <code className="code">isTrailing</code> is set to
        <code className="code">true</code>, the debounced function will execute
        after the waiting period is over.
      </li>

      <li>
        - If both are <code className="code">true</code>, the debounced function
        will execute once before the initiating a waiting period, and the latest
        of subsequent attempts will be executed at the end.
      </li>
    </ul>
  );
}

function LazyDebounceOptions() {
  const { isDesktop } = useViewportStateContext();
  return isDesktop ? (
    <Suspense>
      <DebounceOptions />
    </Suspense>
  ) : null;
}

function LazyDebounceOptionsModal() {
  const { isTablet } = useViewportStateContext();
  return isTablet ? (
    <Suspense>
      <DebounceOptionsModal />
    </Suspense>
  ) : null;
}
