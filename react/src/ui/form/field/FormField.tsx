import { useField, useFormikContext } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { InputsHTMLTypes } from './FormField.config';
import { type ValidationInputProps, type FormFieldProps } from './FormField.types';
import { useFormSchemaContext } from '..';
const FormField = <T,>(props: FormFieldProps<T>) => {
    const { component: InputComponent, inputProps = {}, className } = props;

    // Value is special for checkboxes & radio buttons so Formik handles it differently
    // by specifying the HTML input type
    const htmlInputType = InputsHTMLTypes.get(InputComponent);

    // Pass radio/checkbox reference values with refValue
    const [field, meta] = useField({ name: props.name as string, type: htmlInputType, value: props.refValue });

    // Validation schema
    const { validationSchema, identifier: formIdentifier } = useFormSchemaContext() || {};

    // Know if form is validating on mount to check if we display error if field has not been touched yet
    const { validateOnMount, values } = useFormikContext();

    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        /** Formik onBlur handler */
        field?.onBlur(event);

        /** Event propagation */
        props.onBlur?.(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        /** Event propagation */
        props.onFocus?.(event);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        /** Formik onChange handler */
        field.onChange(event);

        /** Event propagation */
        props.onChange?.(event);
    };

    /** Get the HTML input validation props */
    const validationProps = React.useMemo((): ValidationInputProps => {
        if (validationSchema) {
            try {
                // Resolve field validation schema
                const fieldValidation = Yup.reach(validationSchema, props.name)
                    .resolve({ parent: values })
                    .describe() as Yup.SchemaObjectDescription;


                if (fieldValidation?.tests) {
                    const minLength = fieldValidation.tests.find((p) => p.name === 'min')?.params?.min as number;
                    const maxLength = fieldValidation.tests.find((p) => p.name === 'max')?.params?.max as number;
                    // We compute "required" attribute for accessibility needs essentially
                    const required = !!fieldValidation.tests.find((p) => p.name === 'required');

                    return { minLength, maxLength, required };
                }
            } catch (err) {
                // Schema not resolved temporarily as schema is maybe not well updated
            }
        }
        return {};
    }, [validationSchema, props.name, values]);

    const error = meta.touched || validateOnMount ? meta.error : undefined;
    return (
        <div className={className} data-name={field.name} data-error={!!error}>
            <InputComponent
                {...(inputProps as T)}
                {...validationProps}
                name={field.name}
                value={field.value ?? props.refValue}
                checked={field.checked}
                label={props.label}
                disabled={props.disabled}
                readOnly={props.readOnly}
                touched={meta.touched}
                error={error}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={props.placeholder}
                formIdentifier={formIdentifier}
            />
        </div>
    );
};

export { FormField };
