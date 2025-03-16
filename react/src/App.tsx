import React from "react";
import { FormProvider } from "./contexts/FormProvider";
import Stepper from "./ui/stepper/Stepper";
import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n";

export type CurrencyType = {
  CHF: string;
  ALL: string;
  EUR: string;
  BGN: string;
};

export const currencyMap: CurrencyType = {
  EUR: "€",
  CHF: "CHF",
  ALL: "Lek",
  BGN: "лв",
};

export default function App() {
  const [currentProduct, setCurrentProduct] = React.useState({});
  const [cadreProduct, setCadreProduct] = React.useState({});
  const [country, setCountry] = React.useState<string>("fr");

  function getCurrencyCode(moneyString: string) {
    const trimmed = moneyString.trim();
    const parts = trimmed.split(" ");
    const lastPart = parts[parts.length - 1];
    const firstPart = parts[0];
    const currencyCode = isNaN(Number(lastPart))
      ? lastPart.replace(/[^A-Z]/g, "")
      : firstPart.replace(/[^A-Z]/g, "");
    return currencyCode || "";
  }

  function getSymbolFromCurrencyCode(currencyCode: keyof CurrencyType) {
    return currencyMap[currencyCode];
  }

  React.useEffect(() => {
    const container = document.getElementById("product-stepper");
    if (container) {
      let {
        currentTitle,
        currentPrice,
        currentId,
        cadreId,
        cadreTitle,
        cadrePrice,
        currentSymbol,
        mymoney,
        currentCompareAtPrice,
      } = container.dataset;

      if (mymoney) {
        const currencyCode = getCurrencyCode(mymoney);
        const symbolFromMap = getSymbolFromCurrencyCode(
          currencyCode as keyof CurrencyType,
        );
        if (symbolFromMap) {
          currentSymbol = symbolFromMap;
        }
      }

      const currentProduct = {
        currentId,
        currentTitle,
        currentPrice,
        currentSymbol,
        currentCompareAtPrice,
      };
      const cadreProduct = { cadreId, cadreTitle, cadrePrice };
      setCurrentProduct(currentProduct);
      setCadreProduct(cadreProduct);
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <FormProvider
        product={{ cadreProduct, currentProduct }}
        country={country}
        setCountry={setCountry}
      >
        <Stepper />
      </FormProvider>
    </I18nextProvider>
  );
}
