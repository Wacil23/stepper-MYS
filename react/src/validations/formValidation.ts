import * as Yup from 'yup';

const beneficiaryValidator = Yup.object().shape({
  name: Yup.string()
    .required('Le nom est requis'),
  gender: Yup.string()
    .required('Le genre est requis'),
  status: Yup.string()
    .required('Le status est requis'),
});

export default beneficiaryValidator
