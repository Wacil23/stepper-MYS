import { BaseComponentModel } from "../../../types/base/BaseComponentType";
import { FormFieldInputProps } from "../../form";
import { PillProps } from "../Pill.types";


type PillGroupItemProps = Pick<PillProps, "value" | "label" | "aria-label"> & {
  /** Pill group item key */
  key?: string;
};

type PillGroupProps = FormFieldInputProps<
  BaseComponentModel & {
    /** Pill group options */
    options: PillGroupItemProps[];
  }
>;

export type { PillGroupProps };
