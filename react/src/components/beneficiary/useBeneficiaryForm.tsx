// src/hooks/useBeneficiaryForm.ts
import { useFormik, FormikConfig } from 'formik';
import * as Yup from 'yup';
import { BeneficiariesCreationModel } from '../../models/beneficiary/BeneficiaryCreationModel';


export interface UseBeneficiaryFormOptions {
  onSubmitSuccess?: (values: BeneficiariesCreationModel) => void;
}

const useBeneficiaryForm = (
  { onSubmitSuccess}: UseBeneficiaryFormOptions,
  formikOptions: Partial<FormikConfig<BeneficiariesCreationModel>> = {}
) => {

  const initialValues: BeneficiariesCreationModel = {
    beneficiaries: [{
      name: '',
      gender: 'femme',
      status: 'malade',
      wheelchairCount: 1,
      frameType: 'mail'
    }]
  }

  const validationSchema = Yup.object().shape({
    beneficiaries: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .required('Le nom est requis')
          .min(2, 'Le nom doit contenir au moins 2 caractères')
          .max(25, 'Le nom ne peut dépasser 25 caractères'),
        // Ajoutez d'autres validations ici
        wheelchairCount: Yup.number()
            .min(1, 'Doit être au moins 1')
            .required('Le nombre de fauteuils est requis'),
        frameType: Yup.mixed<'mail' | 'physique'>().oneOf(['mail', 'physique']),
      })
    ).min(1, 'Au moins un bénéficiaire est requis'),
  });

  const handleSubmit = (values: BeneficiariesCreationModel) => {
    console.log('Submitting:', values);
    onSubmitSuccess?.(values);
  };

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    ...formikOptions,
  });
  return { ...form };
};

export { useBeneficiaryForm };
