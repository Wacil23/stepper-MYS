import React from "react";
import { FaChevronDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../../contexts/FormProvider";
import { Form } from "../../ui/form/Form";
import { InputText } from "../../ui/input-text";
import { Civility } from "../../ui/civility/Civility";

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
  const { t } = useTranslation();
  const productType = values.productType;
  const isOmra = productType === "omra" || productType === "omraRamadan";

  const genderValue = formik.values.beneficiaries[index]?.gender;
  const isFemale =
    genderValue ===
    t("beneficiaries.fields.gender.options.female").toLowerCase();

  const beneficiaryNumber = index + 1;
  const beneficiary = values.beneficiaries[index];

  const civilityOptions = [
    {
      value: t(
        "beneficiaries.fields.gender.options.female",
      ).toLocaleLowerCase(),
      label: t("beneficiaries.fields.gender.options.female"),
    },
    {
      value: t("beneficiaries.fields.gender.options.male").toLocaleLowerCase(),
      label: t("beneficiaries.fields.gender.options.male"),
    },
  ];

  const statusOptions = [
    {
      value: t("beneficiaries.fields.status.options.sick"),
      label: t("beneficiaries.fields.status.options.sick"),
    },
    {
      value: t("beneficiaries.fields.status.options.deceased"),
      label: t("beneficiaries.fields.status.options.deceased"),
    },
    {
      value: t("beneficiaries.fields.status.options.none"),
      label: t("beneficiaries.fields.status.options.none"),
    },
  ];

  return (
    <>
      <div
        onClick={onToggle}
        className={`flex flex-col overflow-hidden transition-all duration-300 ${isOpen && isOmra ? "max-h-[700px]" : isOpen ? "max-h-[370px]" : " max-h-16"} rounded-2xl  bg-white px-4 py-5 cursor-pointer gap-5 justify-between`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              className="w-6 rounded-full"
              src={
                isFemale
                  ? "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/girlmuslim.png?v=1737260312"
                  : "https://cdn.shopify.com/s/files/1/0793/7412/3350/files/menmuslim.png?v=1737260312"
              }
            />
            <p className="text-base font-bold">
              {t("beneficiaries.title", { number: beneficiaryNumber })}
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
          className={`flex flex-col gap-7 transition-all duration-300  ${isOpen && isOmra ? "max-h-[700px]" : isOpen ? "max-h-80" : "max-h-0"}  height-transition bg-white rounded-b-2xl`}
        >
          <>
            <Form.Field
              label={t("beneficiaries.fields.name.label")}
              component={InputText}
              name={`beneficiaries[${index}].name`}
              placeholder={t("beneficiaries.fields.name.placeholder")}
              inputProps={{
                id: `beneficiaries-${index}-name`,
              }}
            />
            <Form.Field
              label={t("beneficiaries.fields.gender.label")}
              component={Civility}
              name={`beneficiaries[${index}].gender`}
              inputProps={{
                options: civilityOptions,
                id: `beneficiaries-${index}-gender`,
              }}
            />
            <Form.Field
              label={t("beneficiaries.fields.status.label")}
              component={Civility}
              name={`beneficiaries[${index}].status`}
              inputProps={{
                options: statusOptions,
                id: `beneficiaries-${index}-status`,
              }}
            />
            {isOmra && (
              <Form.Field
                label={t("beneficiaries.fields.fatherName.label")}
                component={InputText}
                name={`beneficiaries[${index}].fatherName`}
                inputProps={{
                  id: `beneficiaries-${index}-fatherName`,
                  hint: t("beneficiaries.fields.fatherName.hint"),
                }}
              />
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default ModifyBeneficiary;
