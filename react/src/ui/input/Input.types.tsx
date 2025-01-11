import { FormFieldInputProps } from "../form";
import { BaseComponentModel } from "../../types/base/BaseComponentType";
import { StylableProps } from "../../types/base/StylableProps";


type InputProps = FormFieldInputProps<
    BaseComponentModel & {
        /** An Input can have a type */
        type?: 'text' | 'email' | 'password' | 'tel' | 'file';
        /** An input can have a hint */
        hint?: string | React.ReactNode;
        /** An input can have autocomplete enabled to allow the browser to predict the value  */
        autoComplete?: string;
        /** An input can have its error message hidden (when included in a form field group for example) */
        hideErrorMessage?: boolean;
        clearable?: boolean;
        fluid?: boolean;
        inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
        pattern?: React.InputHTMLAttributes<HTMLInputElement>['pattern'];
        /** An input can have a custom icon */
        // icon?: React.ComponentType<IconProps>;
        iconAriaLabel?: string;
        /** Icon event handler */
        onIconClick?: () => void;
        /** Input event handler -- same as onChange but this event is fired even though a character is replaced by a same character ex: https://codesandbox.io/p/sandbox/react-onchange-vs-oninput-coggf */
        onInput?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
        /**Key down event */
        onKeyDown?: (event: React.KeyboardEvent) => void;
    }
> & { ref?: React.ForwardedRef<HTMLInputElement> };

/** Input props styled */
type InputStyleProps = StylableProps<InputProps, never, 'error' | 'disabled' | 'fluid'> & {
    $active: boolean;
    $success: boolean;
    $withIcon: boolean;
};

export type { InputProps, InputStyleProps };
