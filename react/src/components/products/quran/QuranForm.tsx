import { Trans, useTranslation } from "react-i18next";
import { useFormContext } from "../../../contexts/FormProvider";
import { Form } from "../../../ui/form/Form";
import { RadioGroup } from "../../../ui/radio";
import { type BeneficiaryQuranCreationModel } from "../../../models/beneficiary/BeneficiaryCreationModel";

type CurrentProduct = {
  currentTitle: string;
  currentId: string;
  currentPrice: string;
};

type QuranFormProps = {
  beneficiary: BeneficiaryQuranCreationModel;
  index: number;
};

const QuranForm: React.FC<QuranFormProps> = ({ beneficiary, index }) => {
  const { formik, currentProduct } = useFormContext();
  const product = currentProduct as CurrentProduct;
  const { t } = useTranslation();
  const { setFieldValue } = formik;

  const quranOptions = [
    {
      label: t("quantity.quran.label"),
      value: 1,
      description: t("quantity.quran.description", { name: beneficiary.name }),
      promo: "20",
      reduction: "0",
    },
    {
      label: t("quantity.quran.label_2"),
      value: 2,
      promo: "20",
      reduction: "0",
      description: t("quantity.quran.description_2", {
        name: beneficiary.name,
      }),
    },
    {
      label: t("quantity.quran.label_3"),
      value: 3,
      promo: "20",
      reduction: "0",
      description: t("quantity.quran.description_3", {
        name: beneficiary.name,
      }),
    },
    {
      label: t("quantity.quran.label_custom"),
      value: 4,
      isCustom: true,
      promo: "20",
      reduction: "0",
    },
  ];

  const handlequranSelectionChanged = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number,
  ) => {
    const value = e.target.value;
    const numericValue = Number(value);

    setFieldValue(`beneficiaries[${index}].quranSelection`, value);
    setFieldValue(`beneficiaries[${index}].quranCount`, numericValue);
  };

  const handlequranCountChanged = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number,
  ) => {
    const value = Number(e.target.value);

    if (value >= 4) {
      setFieldValue(`beneficiaries[${index}].quranCount`, value);
    }
  };

  return (
    <>
      <p className="text-base text-center">
        <Trans
          i18nKey="quantity.quran.title"
          values={{ name: beneficiary.name }}
          components={{
            span: <span className="capitalize font-medium" />,
          }}
        />
      </p>
      <Form.Field
        name={`beneficiaries[${index}].quranCount`}
        component={RadioGroup}
        inputProps={{
          className: "!rounded-[18px]",
          id: `beneficiaries-${index}.quranCount`,
          options: quranOptions,
          numberValues: beneficiary.quranCount,
          numberSelection: 4,
          onNumberChange: (e) => handlequranCountChanged(e, index),
          productPrice: product.currentPrice ?? "4990",
        }}
        onChange={(
          e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          >,
        ) => handlequranSelectionChanged(e, index)}
        label=""
      />
    </>
  );
};

export default QuranForm;
