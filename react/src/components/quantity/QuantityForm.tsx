import { useFormContext } from "../../contexts/FormProvider";
import OmraForm from "../products/omra/OmraForm";
import QuranForm from "../products/quran/QuranForm";
import WheelchairForm from "../products/wheelchair/WheelchairForm";

const QuantityForm = () => {
  const { formik } = useFormContext();
  const { values } = formik;
  const { beneficiaries } = values;
  const productType = values.productType;
  const isWheelchair = productType === "wheelchair";
  const isQuran = productType === "quran";
  const isOmra = productType === "omra";
  const isOmraRamadan = productType === "omraRamadan";

  return (
    <div className="flex flex-col gap-4">
      {beneficiaries.map((beneficiary, index) => {
        return (
          <div
            className="bg-dark-light flex flex-col  gap-4 pt-[14px] rounded-[20px] p-[6px]"
            key={index}
          >
            {isWheelchair &&
              "wheelchairCount" in beneficiary && (
                <WheelchairForm index={index} beneficiary={beneficiary} />
              )}
            {isQuran && "quranCount" in beneficiary && (
              <QuranForm index={index} beneficiary={beneficiary} />
            )}

            {(isOmra || isOmraRamadan) && "omraCount" in beneficiary && (
              <OmraForm index={index} beneficiary={beneficiary} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuantityForm;
