import { type RadioGroupProps } from "./RadioGroup.types";

const useRadioGroup = (props: RadioGroupProps) => {
  const labelId = `radio-group-${props.name}`;

  return {
    role: "radiogroup",
    "aria-label": props["aria-label"],
    "aria-labelledby": props.label ? labelId : undefined,
  };
};

export { useRadioGroup };
