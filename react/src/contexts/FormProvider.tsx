import React, { createContext, useContext, ReactNode } from "react";
import { useFormik, FormikProps, FormikProvider } from "formik";
import * as Yup from "yup";
import { BeneficiariesCreationModel } from "../models/beneficiary/BeneficiaryCreationModel";

interface FormContextProps {
  formik: FormikProps<BeneficiariesCreationModel>;
  currentProduct: any,
  cadreProduct: any
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
  onSubmitSuccess?: (values: BeneficiariesCreationModel) => void;
  product: {currentProduct: any, cadreProduct: any}
}

export const FormProvider: React.FC<FormProviderProps> = ({ children, onSubmitSuccess, product }) => {
  const validationSchema = Yup.object().shape({
    beneficiaries: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string()
            .required("Le nom est requis")
            .min(2, "Le nom doit contenir au moins 2 caractères")
            .max(25, "Le nom ne peut dépasser 25 caractères"),
          gender: Yup.string()
            .oneOf(["femme", "homme"], "Genre invalide")
            .required("Le genre est requis"),
          status: Yup.string()
            .oneOf(["Malade", "Décédé(e)", "Non"], "Statut invalide")
            .required("Le statut est requis"),
          wheelchairCount: Yup.number()
            .min(1, "Doit être au moins 1")
            .required("Le nombre de fauteuil roulant est requis"),
          frameType: Yup.string()
            .oneOf(["mail", "qr"], "Type de cadre invalide")
            .required("Le type de cadre est requis"),
          isValid: Yup.boolean(),
        })
      )
      .min(1, "Au moins un bénéficiaire est requis"),

  });

  const formik = useFormik<BeneficiariesCreationModel>({
    initialValues: {
      beneficiaries: [
        {
          name: "",
          gender: "femme",
          status: "Malade",
          wheelchairCount: 1,
          wheelchairSelection: 1,
          frameType: "mail",
          isValid: false,
        },
      ],
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      onSubmitSuccess?.(values);
    },
  });
  const {currentProduct, cadreProduct} = product;
  return (
    <FormContext.Provider  value={{ formik, currentProduct, cadreProduct }}>
      <FormikProvider value={formik}>
      {children}
      </FormikProvider>
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext doit être utilisé à l’intérieur de <FormProvider>.");
  }
  const {currentProduct, formik, cadreProduct} = context
  return {formik, currentProduct, cadreProduct};
};
