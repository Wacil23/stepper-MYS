import React, { createContext, useContext, ReactNode, useState } from "react";
import { useFormik, FormikProps, FormikProvider } from "formik";
import * as Yup from "yup";
import { BeneficiariesCreationModel } from "../models/beneficiary/BeneficiaryCreationModel";
import { useTranslation } from "react-i18next";

interface FormContextProps<T extends "wheelchair" | "quran" | 'omra' | "omraRamadan"> {
  formik: FormikProps<
    T extends "wheelchair"
      ? BeneficiariesCreationModel & { productType: "wheelchair" }
      : T extends "quran" ? BeneficiariesCreationModel & { productType: "quran" }
      : T extends "omra" ? BeneficiariesCreationModel & { productType: "omra" }
      : BeneficiariesCreationModel & { productType: "omraRamadan" }
  >;
  currentProduct: any;
  cadreProduct: any;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  validationSchema: any;
}

const FormContext = createContext<
  FormContextProps<"wheelchair" | "quran" | "omra" | "omraRamadan"> | undefined
>(undefined);

interface FormProviderProps {
  children: ReactNode;
  onSubmitSuccess?: (values: BeneficiariesCreationModel) => void;
  product: { currentProduct: any; cadreProduct: any };
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
}

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  onSubmitSuccess,
  product,
}) => {
  const { t } = useTranslation();
  const { currentProduct: currentProductContext } = product;
  const currentProductID = currentProductContext.currentId;
  const wheelchairID = import.meta.env.VITE_WHEELCHAIR_PRODUCT_ID
  const quranrID = import.meta.env.VITE_QURAN_PRODUCT_ID
  const omraID = import.meta.env.VITE_OMRA_PRODUCT_ID

  const productType: ProductType =
  currentProductID === wheelchairID ? "wheelchair"
  : currentProductID === quranrID ? "quran"
  : currentProductID === omraID ? "omra"
  : "omraRamadan";

  const male = t("beneficiaries.fields.gender.options.male").toLocaleLowerCase();
  const female = t("beneficiaries.fields.gender.options.female").toLocaleLowerCase();
  const sick = t("beneficiaries.fields.status.options.sick");
  const deceased = t("beneficiaries.fields.status.options.deceased");
  const none = t("beneficiaries.fields.status.options.none");



  const wheelchairSchema = Yup.object({
    beneficiaries: Yup.array()
      .of(
        Yup.object({
          name: Yup.string()
            .required(t("beneficiaries.fields.name.errors.required"))
            .min(2, t("beneficiaries.fields.name.errors.minLength"))
            .max(25, t("beneficiaries.fields.name.errors.maxLength")),
          gender: Yup.string()
            .oneOf([male, female], "Genre invalide")
            .required(t("beneficiaries.fields.gender.errors.required")),
          status: Yup.string()
            .oneOf([sick, deceased, none], "Statut invalide")
            .required(t("beneficiaries.fields.status.errors.required")),
          frameType: Yup.string()
            .oneOf(["mail", "qr"], "Type de cadre invalide")
            .required(t("frame.frameType.errors.required")),
          isValid: Yup.boolean(),
          price: Yup.number(),
        }),
      )
      .min(1, "Au moins un bénéficiaire est requis"),
  });

  const quranSchema = Yup.object({
    beneficiaries: Yup.array()
      .of(
        Yup.object({
          name: Yup.string()
            .required(t("beneficiaries.fields.name.errors.required"))
            .min(2, t("beneficiaries.fields.name.errors.minLength"))
            .max(25, t("beneficiaries.fields.name.errors.maxLength")),
          gender: Yup.string()
            .oneOf([male, female], "Genre invalide")
            .required(t("beneficiaries.fields.gender.errors.required")),
          status: Yup.string()
            .oneOf([sick, deceased, none], "Statut invalide")
            .required(t("beneficiaries.fields.status.errors.required")),
          frameType: Yup.string()
            .oneOf(["mail", "qr"], "Type de cadre invalide")
            .required(t("frame.frameType.errors.required")),
          isValid: Yup.boolean(),
          price: Yup.number(),
        }),
      )
      .min(1, "Au moins un bénéficiaire est requis"),
  });

  const omraSchema = Yup.object({
    beneficiaries: Yup.array()
      .of(
        Yup.object({
          name: Yup.string()
            .required(t("beneficiaries.fields.name.errors.required"))
            .min(2, t("beneficiaries.fields.name.errors.minLength"))
            .max(25, t("beneficiaries.fields.name.errors.maxLength")),
          fatherName: Yup.string()
          .min(2, t("beneficiaries.fields.fatherName.errors.minLength"))
          .max(25, t("beneficiaries.fields.fatherName.errors.maxLength"))
          .nullable(),
          gender: Yup.string()
            .oneOf([male, female], "Genre invalide")
            .required(t("beneficiaries.fields.gender.errors.required")),
          status: Yup.string()
            .oneOf([sick, deceased, none], "Statut invalide")
            .required(t("beneficiaries.fields.status.errors.required")),
          frameType: Yup.string()
            .oneOf(["mail", "qr"], "Type de cadre invalide")
            .required(t("frame.frameType.errors.required")),
          isValid: Yup.boolean(),
          price: Yup.number(),
        }),
      )
      .min(1, "Au moins un bénéficiaire est requis"),
  });

  type ProductType = "wheelchair" | "quran" | "omra" | "omraRamadan";
  const validationSchema = productType === "wheelchair" ? wheelchairSchema : productType === "quran" ? quranSchema : omraSchema;


  const initialValues: BeneficiariesCreationModel =
    productType === "wheelchair"
      ? {
          productType: "wheelchair",
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
        }
      : productType === 'quran' ? {
          productType: "quran",
          beneficiaries: [
            {
              name: "",
              gender: female,
              status: sick,
              quranCount: 1,
              quranSelection: 1,
              frameType: "mail",
              isValid: false,
              price: 0,
            },
          ],
        } : productType === "omra" ? {
          productType: "omra",
          beneficiaries: [
            {
              name: "",
              fatherName: "",
              gender: female,
              status: sick,
              omraCount: 1,
              omraSelection: 1,
              frameType: "mail",
              isValid: false,
              price: 0,
            },
          ],
        } : {
          productType: "omraRamadan",
          beneficiaries: [
            {
              name: "",
              fatherName: "",
              gender: female,
              status: sick,
              omraCount: 1,
              omraSelection: 1,
              frameType: "mail",
              isValid: false,
              price: 0,
            },
          ],
        };


  const formik = useFormik<BeneficiariesCreationModel>({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: (values) => { onSubmitSuccess?.(values) },
  });
  const { currentProduct, cadreProduct } = product;
  const [totalPrice, setTotalPrice] = useState<number>(0);

  return (
    <FormContext.Provider
      value={{
        formik,
        currentProduct,
        cadreProduct,
        totalPrice,
        setTotalPrice,
        validationSchema,
      }}
    >
      <FormikProvider value={formik}>{children}</FormikProvider>
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(
      "useFormContext doit être utilisé à l’intérieur de <FormProvider>.",
    );
  }
  const {
    currentProduct,
    formik,
    cadreProduct,
    setTotalPrice,
    totalPrice,
    validationSchema,
  } = context;
  const formikBag = { ...formik, validationSchema };
  return {
    formik: formikBag,
    currentProduct,
    cadreProduct,
    setTotalPrice,
    totalPrice,
    validationSchema,
  };
};
