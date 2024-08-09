import { Switch as MuiSwitch, styled, SwitchProps } from "@mui/material";
import { slateBlue, yellow } from "../../../tailwind.config";
import { classnames } from "../../util/classnames";
import Tooltip, { TooltipProps } from "../tooltip/Tooltip";
import { InfoOutlined } from "@mui/icons-material";
import { useId } from "react";

export interface SwitchGroupProps extends SwitchProps {
  label?: string;
  showLabel?: boolean;
  id?: string;
  tooltipProps?: Omit<TooltipProps, "children">;
  switchGroupClassName?: string;
}

const SwitchGroup = styled(
  ({
    label,
    showLabel,
    id,
    tooltipProps,
    switchGroupClassName,
    ...switchProps
  }: SwitchGroupProps) => {
    const defaultId = useId();

    return (
      <div
        className={classnames(
          "switch-group",
          "flex items-center gap-x-standard",
          switchGroupClassName
        )}
      >
        {showLabel && label !== undefined && (
          <div
            className={classnames(
              "switch-group__label",
              "flex items-center gap-x-2 text-sm"
            )}
          >
            {tooltipProps !== undefined && (
              <Tooltip {...tooltipProps}>
                <InfoOutlined style={{ fontSize: "16px" }} />
              </Tooltip>
            )}
            <label htmlFor={id ?? defaultId}>{label}</label>
          </div>
        )}
        <MuiSwitch
          aria-label={label}
          id={id ?? defaultId}
          focusVisibleClassName=".Mui-focusVisible"
          disableRipple
          {...switchProps}
        />
      </div>
    );
  }
)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: yellow,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: yellow,
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.75,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: slateBlue,
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default SwitchGroup;
