import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Form } from "../../ui/form/Form";
import { InputText } from "../../ui/input-text";
import { Civility } from "../../ui/civility/Civility";
import { useFormContext } from "../../contexts/FormProvider";
import { IoClose } from "react-icons/io5";
import { FieldInputProps } from "formik";

type ModifyBeneficiaryProps = {
  index: number;
  numberOfBeneficiary: number;
  isOpen: boolean;
  onToggle: () => void;
  handleDeleteBeneficiary: (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    index: number,
  ) => void;
};

const ModifyBeneficiary: React.FC<ModifyBeneficiaryProps> = ({
  index,
  handleDeleteBeneficiary,
  onToggle,
  isOpen,
}) => {
  const { formik } = useFormContext();
  const { values } = formik;
  const [currentGender, setCurrentGender] =
    useState<FieldInputProps<any> | null>(null);

  useEffect(() => {
    const currentCivility = formik.getFieldProps(
      `beneficiaries[${index}].gender`,
    );
    setCurrentGender(currentCivility);
  }, [formik, index]);

  const beneficiaryNumber = index + 1;
  const beneficiary = values.beneficiaries[index];

  const civilityOptions = [
    { value: "femme", label: "Femme" },
    { value: "homme", label: "Homme" },
  ];

  const statusOptions = [
    { value: "Malade", label: "Malade" },
    { value: "Décédé(e)", label: "Décédé(e)" },
    { value: "Non", label: "Non" },
  ];

  return (
    <>
      <div
        onClick={onToggle}
        className={`flex flex-col overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[370px]" : " max-h-16"} rounded-2xl  bg-white px-4 py-5 cursor-pointer gap-5 justify-between`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              className="w-6 rounded-full"
              src={
                currentGender?.value === "femme"
                  ? "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/girlmuslim.png?v=1737260312"
                  : "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/menmuslim.png?v=1737260312"
              }
            />
            <p className="text-base font-bold">
              Bénéficiaire n°{beneficiaryNumber}
              {values.beneficiaries && (
                <span className="font-normal capitalize">
                  {" "}
                  : {beneficiary?.name}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FaChevronDown
              className={`${isOpen && "rotate-180"} transition-transform`}
            />
            {values.beneficiaries.length > 1 && (
              <div className="border rounded-full p-1 border-red-100">
                <IoClose
                  onClick={(e) => handleDeleteBeneficiary(e, index)}
                  className="text-red-600"
                />
              </div>
            )}
          </div>
        </div>
        <div
        onClick={(e) => e.stopPropagation()}
          className={`flex flex-col gap-7 transition-all duration-300  ${isOpen ? 'max-h-80' : 'max-h-0'}  height-transition bg-white rounded-b-2xl`}
        >
          <>
            <Form.Field
              label="Nom + Prénom"
              component={InputText}
              name={`beneficiaries[${index}].name`}
              placeholder="Ex: Muhammad Al Muni"
              inputProps={{
                id: `beneficiaries-${index}-name`,
              }}
            />
            <Form.Field
              label="Le bénéficiaire est"
              component={Civility}
              name={`beneficiaries[${index}].gender`}
              inputProps={{
                options: civilityOptions,
                id: `beneficiaries-${index}-gender`,
              }}
            />
            <Form.Field
              label="Décédé ou malade ?"
              component={Civility}
              name={`beneficiaries[${index}].status`}
              inputProps={{
                options: statusOptions,
                id: `beneficiaries-${index}-status`,
              }}
            />
          </>
        </div>
      </div>
    </>
  );
};

export default ModifyBeneficiary;
