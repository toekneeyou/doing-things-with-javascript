import InputGroup from "../../components/inputGroup/InputGroup";
import SwitchGroup from "../../components/switchGroup/SwitchGroup";
import VerticalDivider from "../../components/verticalDivider/VerticalDivider";
import {
  useDebounceActionContext,
  useDebounceStateContext,
} from "../../context/DebounceContext";

export default function DebounceOptions() {
  const { wait, isLeading, isTrailing } = useDebounceStateContext();
  const { handleLeading, handleTrailing, handleWait } =
    useDebounceActionContext();

  return (
    <>
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
    </>
  );
}
