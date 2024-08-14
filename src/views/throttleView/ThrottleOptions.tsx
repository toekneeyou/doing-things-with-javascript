import InputGroup from "../../components/inputGroup/InputGroup";
import SwitchGroup from "../../components/switchGroup/SwitchGroup";
import VerticalDivider from "../../components/verticalDivider/VerticalDivider";
import {
  useThrottleActionContext,
  useThrottleStateContext,
} from "../../context/ThrottleContext";
import VisualizationOptionsPanel from "../../layouts/visualizationLayout/VisualizationOptionsPanel";

export default function ThrottleOptions() {
  const { wait, isLeading, isTrailing } = useThrottleStateContext();
  const { handleLeading, handleTrailing, handleWait } =
    useThrottleActionContext();

  return (
    <VisualizationOptionsPanel>
      <InputGroup
        type="number"
        name="wait"
        label="Wait(ms)"
        showLabel={true}
        value={wait}
        onChange={handleWait}
        inputClassName="w-28"
        step={100}
      />
      <VerticalDivider />
      <SwitchGroup
        name="leading"
        label="isLeading"
        showLabel={true}
        checked={isLeading}
        onChange={handleLeading}
        switchGroupClassName="flex items-center gap-x-standard"
      />
      <VerticalDivider />
      <SwitchGroup
        name="trailing"
        label="isTrailing"
        showLabel={true}
        checked={isTrailing}
        onChange={handleTrailing}
        switchGroupClassName="flex items-center gap-x-standard"
      />
    </VisualizationOptionsPanel>
  );
}
