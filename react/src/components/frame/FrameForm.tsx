import { useFormContext } from "../../contexts/FormProvider";
import { FormField } from "../../ui/form";
import { RadioGroup } from "../../ui/radio";

const FrameForm = () => {
  const { formik, cadreProduct } = useFormContext();
  const { values } = formik;
  const { beneficiaries } = values;

  const cadrePriceInEuros = cadreProduct?.cadrePrice
    ? Number(cadreProduct.cadrePrice) / 100
    : 10.90;

  // On part de vos options de base
  const frameOptions = [
    { label: "Par mail", value: "mail" },
    { label: "Par QR code", value: "qr", description: "Recevez chez vous un cadre QR code pour visionner la vidéo du dépôts." },
  ];

  // On ajoute un suffixe à chaque option
  // - "Gratuit" si mail
  // - "<prix> €" si QR
  const frameOptionsWithSuffix = frameOptions.map((option) => {
    if (option.value === "mail") {
      return {
        ...option,
        suffix: "Gratuit",
      };
    } else {
      // Cas "qr"
      return {
        ...option,
        suffix: cadrePriceInEuros.toFixed(2) + " €"
      };
    }
  });

  return (
    <div className="flex  rounded-[20px] flex-col gap-4">
      {beneficiaries.map((beneficiary, index) => {
        return (
          <div className="flex flex-col gap-4 rounded-[20px] pt-[14px] p-[6px] bg-dark-light" key={index}>
            <p className="text-base text-center">
              Preuve du dépôt pour{" "}
              <span className="capitalize font-medium">{beneficiary.name}</span>
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
