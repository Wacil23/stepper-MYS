import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Form } from "../../../ui/form/Form";
import { InputText } from "../../../ui/input-text";
import { Civility } from "../../../ui/civility/Civility";
import { BeneficiariesCreationModel } from "../../../models/beneficiary/BeneficiaryCreationModel";
import { useFormikContext } from "formik";

type ModifyBeneficiaryProps = {
  index: number;
  numberOfBeneficiary: number;
  onSubmitSuccess?: (values: BeneficiariesCreationModel) => void;
};

const ModifyBeneficiary: React.FC<ModifyBeneficiaryProps> = ({
  index,
  numberOfBeneficiary,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const { values, setValues } = useFormikContext<BeneficiariesCreationModel>();

  const openBeneficiary = () => {
    setIsOpen((prev) => !prev);
  };

  const beneficiaryNumber = index + 1;

  const civilityOptions = [
    { value: "femme", label: "Femme" },
    { value: "homme", label: "Homme" },
  ];

  const statusOptions = [
    { value: "malade", label: "Malade" },
    { value: "decede", label: "Décédé(e)" },
    { value: "none", label: "Non" },
  ];

  const beneficiary = values.beneficiaries[index];

  const handleDeleteBeneficiary = (index: number) => {
    if(beneficiaryNumber > 1){
      const updatedBeneficiaries = [...values.beneficiaries];
      updatedBeneficiaries.splice(index, 1);
      setValues({ ...values, beneficiaries: updatedBeneficiaries });
    }
  };


  return (
    <div
      className={` border-dark-stroke border flex flex-col gap-6  px-8 py-6 bg-dark-light rounded-lg`}
    >
      <div className="flex items-center justify-between">
        <p className="text-base">
          Bénéficiaire n°{beneficiaryNumber}
          {values.beneficiaries ? (
            <span className="font-bold capitalize">: {beneficiary?.name}</span>
          ) : null}
        </p>
        {!isOpen ? (
          <FiEdit3
            size={18}
            className="cursor-pointer"
            onClick={openBeneficiary}
          />
        ) : (
          <IoClose
            size={20}
            onClick={openBeneficiary}
            className="cursor-pointer"
          />
        )}
      </div>
      {isOpen && (
        <>
          <div className="flex flex-col gap-6">
            <Form.Field
              label="Le bénéficiaire est"
              component={Civility}
              name={`beneficiaries.${index}.gender`}
              inputProps={{
                options: civilityOptions,
              }}
            />
            <Form.Field
              label="Nom complet"
              component={InputText}
              name={`beneficiaries.${index}.name`}
              placeholder="Ex: Muhammad Al Muni"
            />
          </div>
          <Form.Field
            label="Décédé ou malade ?"
            component={Civility}
            name={`beneficiaries.${index}.status`}
            inputProps={{
              options: statusOptions,
            }}
          />
          <div className="flex items-center justify-between">
            <p
              onClick={() => handleDeleteBeneficiary(index)}
              className={`font-semibold  text-base  ${numberOfBeneficiary === 1 ? 'text-red-300 cursor-not-allowed' : 'text-red-500 cursor-pointer'} `}
              aria-disabled={numberOfBeneficiary === 1}
            >
              Supprimer ce bénéficiaire
            </p>
            <button className="">Valider</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ModifyBeneficiary;
