
import { BaseComponentModel } from "../../../types/base/BaseComponentType";
import { StylableProps } from "../../../types/base/StylableProps";
import { FormFieldInputProps } from "../../form";
import { HelperTextProps } from "../../helper-text";
import { type RadioProps } from "../Radio.types";

type RadioGroupItemProps = Pick<
  RadioProps,
  "value" | "label" | "aria-label"
> & {
  /** Radio group item key */
  key?: string;
};

type RadioGroupProps = FormFieldInputProps<
  BaseComponentModel & {
    /** Radio group options */
    options: RadioGroupItemProps[];
    hint?: string | HelperTextProps;
    inline?: boolean;
  }
>;

type StylableRadioGroupProps = StylableProps<RadioGroupProps, "inline", never>;

export type { RadioGroupProps, StylableRadioGroupProps };
