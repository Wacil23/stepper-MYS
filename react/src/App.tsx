import React from "react";
import { FormProvider } from "./contexts/FormProvider";
import Stepper from "./ui/stepper/Stepper";
import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n";

export default function App() {
  const [currentProduct, setCurrentProduct] = React.useState({});
  const [cadreProduct, setCadreProduct] = React.useState({});
  const [country, setCountry] = React.useState<string>("fr");

  React.useEffect(() => {
    const container = document.getElementById("product-stepper");
    if (container) {
      const {
        currentTitle,
        currentPrice,
        currentId,
        cadreId,
        cadreTitle,
        cadrePrice,
        currentSymbol
      } = container.dataset;
      const currentProduct = { currentId, currentTitle, currentPrice, currentSymbol };
      const cadreProduct = { cadreId, cadreTitle, cadrePrice };
      setCurrentProduct(currentProduct);
      setCadreProduct(cadreProduct);
    }
  }, []);


  return (
    <I18nextProvider i18n={i18n}>
      <FormProvider product={{ cadreProduct, currentProduct }} country={country} setCountry={setCountry}>
        <Stepper />
      </FormProvider>
    </I18nextProvider>
  );
}
