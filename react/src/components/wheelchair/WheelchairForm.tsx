import { useFormContext } from "../../contexts/FormProvider";
import { Form } from "../../ui/form/Form";
import {  RadioGroup } from "../../ui/radio";

type CurrentProduct = {
  currentTitle: string,
  currentId: string,
  currentPrice: string,

}
const WheelchairForm = () => {
  const {formik, currentProduct} = useFormContext();
  const product = currentProduct as CurrentProduct ?? {currentId: '12346488', currentTitle: "Produit title", currentPrice: "16900"}

  const { setFieldValue, values } = formik;
  const {beneficiaries} = values;
  const wheelchairOptions = [
    { label: '1 Fauteuil', value: 1, description: "Aidez de nombreux pèlerins à accomplir leurs rites en toute sérénité."},
    { label: '2 Fauteuils', value: 2, promo: "5.62", description: "Doublez les hassanates pour vous et vos proches."},
    { label: '3 Fauteuils', value: 3, promo: "11.242", description: "Multipliez l'impact au sein de Makkah avec 3 dépôts."},
    { label: 'Quantité personnalisée', value: 4, isCustom: true},
  ]

  const handleWheelChairSelectionChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (value === 'custom') {
      setFieldValue(`beneficiaries.${index}.wheelchairSelection`, 'custom');
      setFieldValue(`beneficiaries.${index}.wheelchairCount`, 4); // Valeur par défaut minimale
    } else {
      const numericValue = Number(value);
      setFieldValue(`beneficiaries.${index}.wheelchairSelection`, value);
      setFieldValue(`beneficiaries.${index}.wheelchairCount`, numericValue);
    }
  };

  const handleWheelChairCountChanged = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const value = Number(e.target.value);
    if (value >= 4) {
      setFieldValue(`beneficiaries.${index}.wheelchairCount`, value);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {beneficiaries.map((beneficiary, index) => {
        return(
          <div className="bg-dark-light flex flex-col  gap-4 pt-[14px] rounded-[20px] p-[6px]" key={index}>
            <p className="text-base text-center">Fauteuil pour <span className="capitalize font-medium">{beneficiary.name}</span></p>
            <Form.Field
            name={`beneficiaries[${index}].wheelchairCount`}
            component={RadioGroup}
            inputProps={{
              className: "!rounded-[18px]",
              id: `beneficiaries-${index}.wheelchairCount`,
              options: wheelchairOptions,
              numberValues: beneficiary.wheelchairCount,
              onNumberChange: (e) => handleWheelChairCountChanged(e, index),
              productPrice: product.currentPrice ?? "16900",
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => handleWheelChairSelectionChanged(e, index)}
            label=""

            />

          </div>
        )
      })}
    </div>
  )
}

export default WheelchairForm
