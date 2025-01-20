import { type FieldMetaProps } from 'formik';
import { NestedPropPaths } from '../../../types/base/StylableProps';

type ValidationInputProps = {
    /** Flag to indicate input is required */
    required?: boolean;

    /** Input min length */
    minLength?: number;

    /** Input max length */
    maxLength?: number;
};

type BaseFormFieldInputProps<Model = never> = {
    /** Input name */
    name: [Model] extends [never] ? string : NestedPropPaths<Model>;

    /** Input value */
    value: any;

    /** Input label */
    label: string | React.ReactNode;

    /** Input error */
    error?: string;

    /** Form identifier */
    formIdentifier?: string;

    /** Flag to indicate input is checked (only useful for checkbox/radio type inputs) */
    checked?: boolean;

    /** Flag to indicate input is read only */
    readOnly?: boolean;

    /** Flag to indicate input is disabled */
    disabled?: boolean;

    /** Flag to indicate input is "touched" */
    touched?: boolean;

    /** Input placeholder, usable on input text and on default value for select */
    placeholder?: string;

    /** Change event handler */
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;

    /** Blur event handler */
    onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;

    /** Focus event handler */
    onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
} & ValidationInputProps;

type FormFieldInputProps<T> = T & BaseFormFieldInputProps;
type FormFieldInputType<T = never> = React.ComponentType<FormFieldInputProps<T>>;

type FormFieldProps<T = never, M = never> = {
    /** Form field input component type */
    component: FormFieldInputType<T>;

    /** Form field input component specific props */
    inputProps?: Omit<T, keyof BaseFormFieldInputProps<M>>;

    /** Form field input reference value (only useful for checkbox/radio buttons) */
    refValue?: any;

    className?: string;
} & Omit<BaseFormFieldInputProps<M>, 'checked' | keyof FieldMetaProps<never> | keyof ValidationInputProps>;

export type { ValidationInputProps, BaseFormFieldInputProps, FormFieldInputProps, FormFieldInputType, FormFieldProps };
