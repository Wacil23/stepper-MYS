import React, { createContext, useContext, ReactNode, useState } from "react";
import { useFormik, FormikProps, FormikProvider } from "formik";
import * as Yup from "yup";
import { BeneficiariesCreationModel } from "../models/beneficiary/BeneficiaryCreationModel";
import { useTranslation } from "react-i18next";

interface FormContextProps {
  formik: FormikProps<BeneficiariesCreationModel>;
  currentProduct: any,
  cadreProduct: any;
  totalPrice: number,
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>,
  validationSchema: Yup.ObjectSchema<{
    beneficiaries: {
        isValid?: boolean | undefined;
        name: string;
        gender: string;
        status: string;
        wheelchairCount: number;
        frameType: NonNullable<"mail" | "qr" | undefined>;
    }[] | undefined;
}, Yup.AnyObject, {}, "">
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
  onSubmitSuccess?: (values: BeneficiariesCreationModel) => void;
  product: {currentProduct: any, cadreProduct: any},
  country: string,
  setCountry: React.Dispatch<React.SetStateAction<string>>

}

export const FormProvider: React.FC<FormProviderProps> = ({ children, onSubmitSuccess, product }) => {
  const {t} = useTranslation();
  const male = t('beneficiaries.fields.gender.options.male').toLocaleLowerCase();
  const female = t('beneficiaries.fields.gender.options.female').toLocaleLowerCase();

  const sick = t('beneficiaries.fields.status.options.sick');
  const deceased = t('beneficiaries.fields.status.options.deceased');
  const none = t('beneficiaries.fields.status.options.none');

  const validationSchema = Yup.object().shape({
    beneficiaries: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string()
            .required(t('beneficiaries.fields.name.errors.required'))
            .min(2, t('beneficiaries.fields.name.errors.minLength'))
            .max(25, t('beneficiaries.fields.name.errors.maxLength')),
          gender: Yup.string()
            .oneOf([male, female], "Genre invalide")
            .required(t('beneficiaries.fields.gender.errors.required')),
          status: Yup.string()
            .oneOf([sick, deceased, none], "Statut invalide")
            .required(t('beneficiaries.fields.status.errors.required')),
          wheelchairCount: Yup.number()
            .min(1, t('quantity.wheelchair.errors.minLength'))
            .required(t('quantity.wheelchair.errors.required')),
          frameType: Yup.string()
            .oneOf(["mail", "qr"], "Type de cadre invalide")
            .required(t('frame.frameType.errors.required')),
          isValid: Yup.boolean(),
        })
      )
      .min(1, "Au moins un bénéficiaire est requis"),

  });

  let formik = useFormik<BeneficiariesCreationModel>({
    initialValues: {
      beneficiaries: [
        {
          name: "",
          gender: female,
          status: sick,
          wheelchairCount: 1,
          wheelchairSelection: 1,
          frameType: "mail",
          isValid: false,
          price: 0,
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
  const [totalPrice, setTotalPrice] = useState<number>(0)

  return (
    <FormContext.Provider  value={{ formik, currentProduct, cadreProduct, totalPrice, setTotalPrice, validationSchema }}>
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
  const {currentProduct, formik, cadreProduct, setTotalPrice, totalPrice, validationSchema} = context
  const formikBag = {...formik, validationSchema}
  return {formik: formikBag, currentProduct, cadreProduct, setTotalPrice, totalPrice, validationSchema};
};
