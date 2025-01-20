import { BaseComponentModel } from "../../../types/base/BaseComponentType";
import { FormFieldInputProps } from "../../form";

type RadioNumberProps = FormFieldInputProps<BaseComponentModel> & {
  parentRef?: React.RefObject<HTMLElement> | undefined;
};

export {type RadioNumberProps}
