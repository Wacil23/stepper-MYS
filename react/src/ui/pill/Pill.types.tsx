
import { type BaseComponentModel } from "../../types/base/BaseComponentType";
import { type FormFieldInputProps } from "../form";

type PillProps = FormFieldInputProps<BaseComponentModel> & {
  parentRef?: React.RefObject<HTMLElement> | undefined;
  isGroupActive?: boolean;
};

export type { PillProps };
