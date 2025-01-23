import { Trans, useTranslation } from "react-i18next";
import { useFormContext } from "../../contexts/FormProvider";
import { FormField } from "../../ui/form";
import { RadioGroup } from "../../ui/radio";

const FrameForm = () => {
  const { formik, cadreProduct } = useFormContext();
  const { values } = formik;
  const { beneficiaries } = values;
  const { t } = useTranslation();

  const cadrePriceInEuros = cadreProduct?.cadrePrice
    ? Number(cadreProduct.cadrePrice) / 100
    : 10.9;

  // On part de vos options de base
  const frameOptions = [
    { label: t("frame.frameType.mail"), value: "mail" },
    {
      label: t("frame.frameType.qr"),
      value: "qr",
      description: t("frame.frameType.description_qr"),
    },
  ];

  const frameOptionsWithSuffix = frameOptions.map((option) => {
    if (option.value === "mail") {
      return {
        ...option,
        suffix: t("frame.frameType.price_mail"),
      };
    } else {
      return {
        ...option,
        suffix: cadrePriceInEuros.toFixed(2) + " €",
      };
    }
  });

  return (
    <div className="flex  rounded-[20px] flex-col gap-4">
      {beneficiaries.map((beneficiary, index) => {
        return (
          <div
            className="flex flex-col gap-4 rounded-[20px] pt-[14px] p-[6px] bg-dark-light"
            key={index}
          >
            <p className="text-base text-center">
              <Trans
                i18nKey="frame.title"
                values={{ name: beneficiary.name }}
                components={{
                  span: <span className="capitalize font-medium" />,
                }}
              />
            </p>
            <FormField
              name={`beneficiaries[${index}].frameType`}
              component={RadioGroup}
              inputProps={{
                id: `beneficiaries-${index}-frameType`,
                options: frameOptionsWithSuffix,
                productPrice: cadreProduct?.cadrePrice ?? "1090",
              }}
              label=""
            />
          </div>
        );
      })}
    </div>
  );
};

export default FrameForm;
