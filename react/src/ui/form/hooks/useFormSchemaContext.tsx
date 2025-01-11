import * as React from 'react';
import type * as Yup from 'yup';

type FormSchemaContextProps<T extends Yup.AnyObject> = {
    schema: Yup.ObjectSchema<T>;
    children: React.ReactNode;
    identifier?: string;
};

type ProviderType<T extends Yup.AnyObject = Yup.AnyObject> = {
    validationSchema: Yup.ObjectSchema<T>;
    identifier?: string;
};

const FormSchemaContext = React.createContext<ProviderType<Yup.AnyObject> | null>(null);

/**
 * Form schema context & provider as Formik doesn't pass validation schema
 * (should be ok in Formik v3)
 */
export const useFormSchemaContext = (): ProviderType | null => React.useContext(FormSchemaContext);

export const FormSchemaProvider = <T extends Yup.AnyObject = Yup.AnyObject>(
    props: FormSchemaContextProps<T>
): JSX.Element => {
    const { children, schema, identifier } = props;

    return (
        <FormSchemaContext.Provider
            value={{ validationSchema: schema as ProviderType<Yup.AnyObject>['validationSchema'], identifier }}
        >
            {children}
        </FormSchemaContext.Provider>
    );
};
