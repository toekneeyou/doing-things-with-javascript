import { useMemo } from "react";
import { classnames } from "../../lib/util/classnames";
import { ButtonColor, ButtonVariant } from "./Button";
import { darkBlue } from "../../../tailwind.config";

export default function useButtonIcon(
  renderIcon: ((props?: Record<string, any>) => JSX.Element) | undefined,
  { variant, color }: { variant: ButtonVariant; color: ButtonColor }
) {
  const isIconButton =
    variant === "icon" ||
    variant === "icon-filled" ||
    variant === "icon-outlined";

  const iconProps = useMemo(() => {
    return isIconButton
      ? {
          className: classnames("size-6"),
          style: {
            color: variant === "icon-filled" ? darkBlue : color,
            backgroundColor: variant === "icon-filled" ? color : "transparent",
          },
        }
      : {
          className: classnames("size-6"),
          style: {
            color: variant === "filled" ? darkBlue : color,
            backgroundColor: variant === "filled" ? color : "transparent",
          },
        };
  }, [isIconButton, variant, color]);

  const icon = useMemo(
    () => (renderIcon ? renderIcon(iconProps) : null),
    [iconProps, renderIcon, variant, color]
  );

  return icon;
}
