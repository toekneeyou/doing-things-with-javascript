import InputGroup from "../../components/inputGroup/InputGroup";
import SwitchGroup from "../../components/switchGroup/SwitchGroup";
import VerticalDivider from "../../components/verticalDivider/VerticalDivider";
import {
  useDebounceActionContext,
  useDebounceStateContext,
} from "../../context/DebounceContext";
import { useViewportStateContext } from "../../context/ViewportContext";
import VisualizationOptionsPanel from "../../layouts/visualizationLayout/VisualizationOptionsPanel";

export default function DebounceOptions() {
  const { wait, isLeading, isTrailing } = useDebounceStateContext();
  const { handleLeading, handleTrailing, handleWait } =
    useDebounceActionContext();
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
        inputGroupClassName="w-44 lg:w-max justify-between"
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
        switchGroupClassName="w-44 lg:w-max justify-between"
      />
      {isDesktop && <VerticalDivider />}
      <SwitchGroup
        name="trailing"
        label="isTrailing"
        showLabel={true}
        checked={isTrailing}
        onChange={handleTrailing}
        switchGroupClassName="w-44 lg:w-max justify-between"
      />
    </VisualizationOptionsPanel>
  );
}
