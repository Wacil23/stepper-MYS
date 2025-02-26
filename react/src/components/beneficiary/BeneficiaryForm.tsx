import React from "react";
import ModifyBeneficiary from "./ModifyBeneficiary";
import { FieldArray } from "formik";
import { useFormContext } from "../../contexts/FormProvider";
import { BeneficiariesCreationModel } from "../../models/beneficiary/BeneficiaryCreationModel";
import { Form } from "../../ui/form/Form";

type BeneficiaryFormProps = {
  onSubmitSuccess?: (values: BeneficiariesCreationModel) => void;
  openIndexes: number[];
  onToggleBeneficiary: (index: number) => void;
};

const BeneficiaryForm: React.FC<BeneficiaryFormProps> = ({openIndexes, onToggleBeneficiary}) => {
  const {formik} = useFormContext();
  const { beneficiaries } = formik.values;


  const handleDeleteBeneficiary = (e: React.MouseEvent<SVGElement, MouseEvent>, index: number) => {
    e.stopPropagation()
    if (formik.values.beneficiaries.length > 1) {
      const updatedBeneficiaries = [...formik.values.beneficiaries];
      updatedBeneficiaries.splice(index, 1);
      formik.setFieldValue("beneficiaries", updatedBeneficiaries);

      if (formik.touched.beneficiaries && formik.touched.beneficiaries[index]) {
        const updatedTouched = [
          ...(formik.touched.beneficiaries as Array<any>),
        ];
        updatedTouched.splice(index, 1);
        formik.setTouched({
          ...formik.touched,
          beneficiaries: updatedTouched,
        });
      }

      if (formik.errors.beneficiaries && formik.errors.beneficiaries[index]) {
        const updatedErrors = [...(formik.errors.beneficiaries as Array<any>)];
        updatedErrors.splice(index, 1);
        formik.setErrors({
          ...formik.errors,
          beneficiaries: updatedErrors,
        });
      }

      if (openIndexes.includes(index)) {
        onToggleBeneficiary(index)
      }
    }
  };


  return (
    <Form formikBag={formik} enableErrorFocus>
      <FieldArray
        name="beneficiaries"
        render={() => (
          <div className="flex flex-col gap-2 bg-dark-light rounded-[20px] p-[10px]">
            {beneficiaries.map((_, index) => (
                  <ModifyBeneficiary
                    numberOfBeneficiary={beneficiaries.length}
                    key={index}
                    isOpen={openIndexes.includes(index)}
                    onToggle={() => onToggleBeneficiary(index)}
                    index={index}
                    handleDeleteBeneficiary={(e) => handleDeleteBeneficiary(e, index)}
                  />
            ))}
          </div>
        )}
      />
    </Form>
  );
};

export default BeneficiaryForm;
