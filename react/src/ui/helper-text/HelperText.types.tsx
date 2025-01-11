import { BaseComponentModel } from "../../types/base/BaseComponentType";
import { StylableProps } from "../../types/base/StylableProps";

type HelperTextProps = React.PropsWithChildren<
  BaseComponentModel & {
    text?: string | React.ReactNode;
    variant?: "default" | "warning" | "error";
    hideIcon?: boolean;
  }
>;

type HelperTextStyleProps = StylableProps<HelperTextProps, "variant", never>;

export { type HelperTextProps, type HelperTextStyleProps };
