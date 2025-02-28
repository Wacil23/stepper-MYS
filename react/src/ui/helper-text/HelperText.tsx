import React from "react";
import { HelperTextProps } from "./HelperText.types";
import { FiAlertCircle, FiCircle, FiInfo } from "react-icons/fi";

const icons: Record<
  NonNullable<HelperTextProps["variant"]>,
  React.ComponentType
> = {
  default: FiInfo,
  error: FiCircle,
  warning: FiAlertCircle,
};

const HelperText: React.FC<HelperTextProps> = (props) => {
  const { variant = "default", hideIcon, children, text, ...baseProps } = props;
  const Icon = icons[variant];

  const handleClassVariant = () => {
    switch (variant) {
      case "default":
        return "text-[#6B6B6B]";
      case "error":
        return "text-[#FF4B4B]";
      case "warning":
        return "text-[#FFA057";
      default:
        return "text-[#6B6B6B]";
    }
  }

  return (
    <>
      {(text || children) && (
          <span className={`${handleClassVariant()} flex items-center gap-2 mt-1 text-xs`} {...baseProps}>
            {!hideIcon && <Icon />}
            {text ?? children}
          </span>
        )}
    </>
  );
};

export { HelperText };
