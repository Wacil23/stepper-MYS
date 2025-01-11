import { createContext, useContext, ReactNode } from "react";
import { useFormik, FormikProps } from "formik";
import beneficiaryValidator from "../validations/formValidation";
import {  type BeneficiaryCreationModel } from "../models/beneficiary/BeneficiaryCreationModel";



interface MyFormValues {
  beneficiaries: BeneficiaryCreationModel[];
}

export const FormContext = createContext<FormikProps<MyFormValues> | null>(null);

interface FormProviderProps {
  initialValues: MyFormValues;
  children: ReactNode;
}

export function FormProvider({ initialValues, children }: FormProviderProps) {
  const formik = useFormik<MyFormValues>({
    initialValues,
    validationSchema: beneficiaryValidator,
    onSubmit: (values) => {
      console.log("Soumission du formulaire :", values);
    },
  });
  console.log('initial values', typeof initialValues)
  return <FormContext.Provider value={formik}>{children}</FormContext.Provider>;
}

export function useFormContext(): FormikProps<MyFormValues> {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(
      "useFormContext doit être utilisé à l’intérieur de <FormProvider>.",
    );
  }
  return context;
}

export default {useFormContext, FormProvider}

