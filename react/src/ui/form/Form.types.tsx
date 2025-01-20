import { type FormikConfig, type FormikContextType } from 'formik';
import type React from 'react';
import { type FormFieldProps } from './field';

type FormProps<T = unknown> = Pick<
    React.FormHTMLAttributes<HTMLFormElement>,
    'aria-label' | 'aria-labelledby' | 'title'
> & {
  className?: string;
    /** Formik context */
    formikBag: FormikContextType<T>;

    /** Form identifier */
    identifier?: string;

    /** Form can focus automatically error fields */
    enableErrorFocus?: boolean;
};
type FormConfig<T> = FormikConfig<T>;

export type { FormProps, FormConfig };
export type { FormFieldProps };
