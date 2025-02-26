import { Trans, useTranslation } from "react-i18next";
import { useFormContext } from "../../../contexts/FormProvider";
import { Form } from "../../../ui/form/Form";
import { RadioGroup } from "../../../ui/radio";
import { BeneficiaryOmraCreationModel } from "../../../models/beneficiary/BeneficiaryCreationModel";

type CurrentProduct = {
  currentTitle: string;
  currentId: string;
  currentPrice: string;
};

type OmraFormProps = {
  beneficiary: BeneficiaryOmraCreationModel;
  index: number
}

const OmraForm: React.FC<OmraFormProps> = ({beneficiary, index}) => {
  const { formik, currentProduct } = useFormContext();
  const product = (currentProduct as CurrentProduct)
  const { t } = useTranslation();
  const { setFieldValue } = formik;

  const omraOptions = [
    {
      label: t("quantity.omra.label"),
      value: 1,
      description: t("quantity.omra.description", {name: beneficiary.name}),
      promo: "",
      reduction: "0",
    },
    {
      label: t("quantity.omra.label_2"),
      value: 2,
      promo: "",
      reduction: "0",
      description: t("quantity.omra.description_2",  {name: beneficiary.name}),
    },
    {
      label: t("quantity.omra.label_3"),
      value: 3,
      promo: "",
      reduction: "0",
      description: t("quantity.omra.description_3", {name: beneficiary.name}),
    },
    {
      label: t("quantity.omra.label_custom"),
      value: 4,
      isCustom: true,
      promo: "",
      reduction: "0",
    },
  ];

  const handleomraSelectionChanged = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number,
  ) => {
    const value = e.target.value;
    const numericValue = Number(value);

    setFieldValue(`beneficiaries[${index}].omraSelection`, value);
    setFieldValue(`beneficiaries[${index}].omraCount`, numericValue);
  };

  const handleomraCountChanged = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number,
  ) => {
    const value = Number(e.target.value);

    if (value >= 4) {
      setFieldValue(`beneficiaries[${index}].omraCount`, value);
    }
  };

  return (
    <>
      <p className="text-base text-center">
        <Trans
          i18nKey="quantity.omra.title"
          values={{ name: beneficiary.name }}
          components={{
            span: <span className="capitalize font-medium" />,
          }}
        />
      </p>
      <Form.Field
        name={`beneficiaries[${index}].omraCount`}
        component={RadioGroup}
        inputProps={{
          className: "!rounded-[18px]",
          id: `beneficiaries-${index}.omraCount`,
          options: omraOptions,
          numberValues: beneficiary.omraCount,
          numberSelection: 4,
          onNumberChange: (e) => handleomraCountChanged(e, index),
          productPrice: product.currentPrice ?? "24900",
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => handleomraSelectionChanged(e, index)}
        label=""
      />
    </>
  );
};

export default OmraForm;
