
import { BaseComponentModel } from "../../types/base/BaseComponentType";
import { FormFieldInputProps } from "../form";


type RadioProps = FormFieldInputProps<BaseComponentModel> & {
  parentRef?: React.RefObject<HTMLElement> | undefined;
};

export type { RadioProps };
