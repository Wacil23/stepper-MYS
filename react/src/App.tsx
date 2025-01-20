import React from "react";
import { FormProvider } from "./contexts/FormProvider";
import Stepper from "./ui/stepper/Stepper";

export default function App() {
  const [currentProduct, setCurrentProduct] = React.useState({});
  const [cadreProduct, setCadreProduct] = React.useState({});

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
      } = container.dataset;
      const currentProduct = { currentId, currentTitle, currentPrice };
      const cadreProduct = { cadreId, cadreTitle, cadrePrice };
      setCurrentProduct(currentProduct);
      setCadreProduct(cadreProduct);
    }
  }, []);
  return (
    <FormProvider  product={{cadreProduct, currentProduct}}>
      <Stepper  />
    </FormProvider>
  );
}
