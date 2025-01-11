import React, { type PropsWithChildren } from "react";
import { FormikProvider } from "formik";
import { FormField } from "./field";
import { FormSchemaProvider } from "./hooks/useFormSchemaContext";
import { FormGroup } from "./group";
import { useFormErrorFocus } from "../../hooks/useFormErrorFocus";
import { FormProps } from ".";
import { Form } from "formik";

const Wrapper = <T,>(props: PropsWithChildren<FormProps<T>>): JSX.Element => {
  const {
    children,
    formikBag: { validationSchema, ...formikBag },
    identifier,
    enableErrorFocus = false,
    ...htmlFormProps
  } = props;
  const formRef = React.useRef(null);

  useFormErrorFocus({
    context: formikBag,
    enabled: enableErrorFocus,
    formElement: formRef?.current!,
  });

  return (
    <FormSchemaProvider schema={validationSchema} identifier={identifier}>
      <FormikProvider value={formikBag}>
        <Form ref={formRef} noValidate {...htmlFormProps}>
          {children}
        </Form>
      </FormikProvider>
    </FormSchemaProvider>
  );
};

const Component = Object.assign(Wrapper, {
  Field: FormField,
  Group: FormGroup,
});

export { Component as Form };
