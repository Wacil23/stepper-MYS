import { BaseComponentModel } from "../../types/base/BaseComponentType";
import { FormFieldInputProps } from "../form";
import { PillGroup } from "../pill/group/PillGroup";
import { PillGroupProps } from "../pill/group/PillGroup.types";

export type CivilitiesProps = FormFieldInputProps<BaseComponentModel> & {
  options: PillGroupProps["options"];
};

const Civility: React.FC<CivilitiesProps> = ({ ...inputProps }) => {
  const { ...componentProps } = inputProps;

  return <PillGroup {...(componentProps as PillGroupProps)} />;
};
export { Civility };
