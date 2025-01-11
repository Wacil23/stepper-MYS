import React from "react";
import { Form } from "../../../ui/form/Form";
import ModifyBeneficiary from "./ModifyBeneficiary";
import { FieldArray } from "formik";
import { BeneficiariesCreationModel } from "../../../models/beneficiary/BeneficiaryCreationModel";
import { useBeneficiaryForm } from "../useBeneficiaryForm";

type BeneficiaryFormProps = {
  onSubmitSuccess?: (values: BeneficiariesCreationModel) => void;
};

const BeneficiaryForm: React.FC<BeneficiaryFormProps> = ({
  onSubmitSuccess,
}) => {
  const formik = useBeneficiaryForm({onSubmitSuccess});
  const initialValue = {
    name: "",
    gender: "femme",
    status: "malade",
  };
  const {beneficiaries} = formik.values;

  return (
    <Form formikBag={formik} enableErrorFocus>
      <FieldArray
        name="beneficiaries"
        render={(arrayHelpers) => (
          <>
            <div className="flex flex-col gap-4">
              {beneficiaries.map((_, index) => (
                <ModifyBeneficiary
                  numberOfBeneficiary={beneficiaries.length}
                  onSubmitSuccess={onSubmitSuccess}
                  key={index}
                  index={index}
                />
              ))}
            </div>
            <button
              type="button"
              className="mt-4 text-blue-500 hover:underline"
              onClick={() => arrayHelpers.push(initialValue)}
            >
              + Ajouter un bénéficiaire
            </button>
          </>
        )}
      />
    </Form>
  );
};

export default BeneficiaryForm;
