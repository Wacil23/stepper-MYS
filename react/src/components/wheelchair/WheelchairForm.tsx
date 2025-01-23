import { Trans, useTranslation } from "react-i18next";
import { useFormContext } from "../../contexts/FormProvider";
import { Form } from "../../ui/form/Form";
import { RadioGroup } from "../../ui/radio";

type CurrentProduct = {
  currentTitle: string;
  currentId: string;
  currentPrice: string;
};
const WheelchairForm = () => {
  const { formik, currentProduct } = useFormContext();
  const product = (currentProduct as CurrentProduct) ?? {
    currentId: "12346488",
    currentTitle: "Produit title",
    currentPrice: "16900",
  };
  const { t } = useTranslation();
  const { setFieldValue, values } = formik;
  const { beneficiaries } = values;
  const wheelchairOptions = [
    {
      label: t("quantity.wheelchair.label"),
      value: 1,
      description: t("quantity.wheelchair.description"),
    },
    {
      label: t("quantity.wheelchair.label_2"),
      value: 2,
      promo: "5.62",
      description: t("quantity.wheelchair.description_2"),
    },
    {
      label: t("quantity.wheelchair.label_3"),
      value: 3,
      promo: "11.242",
      description: t("quantity.wheelchair.description_3"),
    },
    {
      label: t("quantity.wheelchair.label_custom"),
      value: 4,
      isCustom: true,
      promo: "15",
    },
  ];

  const handleWheelChairSelectionChanged = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number
  ) => {
    const value = e.target.value;
    const numericValue = Number(value);

    setFieldValue(`beneficiaries[${index}].wheelchairSelection`, value);
    setFieldValue(`beneficiaries[${index}].wheelchairCount`, numericValue);
  };

  const handleWheelChairCountChanged = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number,
  ) => {
    const value = Number(e.target.value);

    if (value >= 4) {
      setFieldValue(`beneficiaries[${index}].wheelchairCount`, value);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {beneficiaries.map((beneficiary, index) => {
        return (
          <div
            className="bg-dark-light flex flex-col  gap-4 pt-[14px] rounded-[20px] p-[6px]"
            key={index}
          >
            <p className="text-base text-center">
              <Trans
                i18nKey="quantity.title"
                values={{ name: beneficiary.name }}
                components={{
                  span: <span className="capitalize font-medium" />,
                }}
              />
            </p>
            <Form.Field
              name={`beneficiaries[${index}].wheelchairCount`}
              component={RadioGroup}
              inputProps={{
                className: "!rounded-[18px]",
                id: `beneficiaries-${index}.wheelchairCount`,
                options: wheelchairOptions,
                numberValues: beneficiary.wheelchairCount,
                numberSelection: 4,
                onNumberChange: (e) => handleWheelChairCountChanged(e, index),
                productPrice: product.currentPrice ?? "16900",
              }}
              onChange={(
                e: React.ChangeEvent<
                  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                >,
              ) => handleWheelChairSelectionChanged(e, index)}
              label=""
            />
          </div>
        );
      })}
    </div>
  );
};

export default WheelchairForm;
