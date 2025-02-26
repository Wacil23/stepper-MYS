export const calculWheelchairPrice = (
  productType: "wheelchair" | "quran" | "omra" | "omraRamadan",
  productPrice: number,
  quantity: number,
  promoPrice: number,
  promoPercent: number,
) => {
  let reduction = 0;
  if (promoPrice) {
    if (productType === "wheelchair") {
      reduction = 0;
      if (quantity === 5) {
        reduction = 0;
      } else if (quantity === 6) {
        reduction = 0;
      } else if (quantity === 7) {
        reduction = 0;
      }
    } else {
      reduction = promoPrice;
      if (productType === "quran") {
        reduction = 0;
      }
      if (quantity === 5) {
        reduction = 50.5;
      } else if (quantity === 6) {
        reduction = 60.4;
      } else if (quantity === 7) {
        reduction = 70.3;
      } else if (quantity === 8) {
        reduction = 80.2;
      } else if (quantity === 9) {
        reduction = 90.1;
      } else if (quantity === 10) {
        reduction = 100;
      } else if (quantity > 10) {
        reduction = 0;
      }
    }
  }
  const convertedPrice = productPrice / 100;
  const priceWithoutDiscount = convertedPrice * quantity;
  const discountPercent = promoPercent ? promoPercent : 0;
  let totalPrice = 0;
  if (promoPercent && productType === "wheelchair") {
    totalPrice = priceWithoutDiscount * (1 - discountPercent / 100);
  } else if (promoPercent && productType === "quran" && reduction === 0) {
    totalPrice = priceWithoutDiscount * (1 - discountPercent / 100);
  } else {
    totalPrice = priceWithoutDiscount - reduction;
  }
  return { totalPrice, discountPercent, priceWithoutDiscount };
};
