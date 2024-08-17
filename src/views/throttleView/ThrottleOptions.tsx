import InputGroup from "../../components/inputGroup/InputGroup";
import SwitchGroup from "../../components/switchGroup/SwitchGroup";
import VerticalDivider from "../../components/verticalDivider/VerticalDivider";
import {
  useThrottleActionContext,
  useThrottleStateContext,
} from "../../context/ThrottleContext";
import { useViewportStateContext } from "../../context/ViewportContext";
import VisualizationOptionsPanel from "../../layouts/visualizationLayout/VisualizationOptionsPanel";

export default function ThrottleOptions() {
  const { wait, isLeading, isTrailing } = useThrottleStateContext();
  const { handleLeading, handleTrailing, handleWait } =
    useThrottleActionContext();
  const { isDesktop } = useViewportStateContext();

  return (
    <VisualizationOptionsPanel>
      <InputGroup
        type="number"
        name="wait"
        label="Wait(ms)"
        showLabel={true}
        value={wait}
        onChange={handleWait}
        inputGroupClassName="w-44 justify-between"
        inputClassName="w-24"
        step={100}
      />
      {isDesktop && <VerticalDivider />}
      <SwitchGroup
        name="leading"
        label="isLeading"
        showLabel={true}
        checked={isLeading}
        onChange={handleLeading}
        switchGroupClassName="w-44 justify-between"
      />
      {isDesktop && <VerticalDivider />}
      <SwitchGroup
        name="trailing"
        label="isTrailing"
        showLabel={true}
        checked={isTrailing}
        onChange={handleTrailing}
        switchGroupClassName="w-44 justify-between"
      />
    </VisualizationOptionsPanel>
  );
}
