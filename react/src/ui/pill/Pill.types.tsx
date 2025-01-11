
import { BaseComponentModel } from "../../types/base/BaseComponentType";
import { FormFieldInputProps } from "../form";

type PillProps = FormFieldInputProps<BaseComponentModel> & {
  parentRef?: React.RefObject<HTMLElement> | undefined;
  isGroupActive?: boolean;
};

export type { PillProps };
