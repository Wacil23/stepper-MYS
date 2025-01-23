export const calculWheelchairPrice = (productPrice: number, quantity: number, promoPrice: number) => {
  const convertedPrice = productPrice / 100;
  const priceWithoutDiscount = convertedPrice * quantity;
  const discountPercent = promoPrice ? promoPrice : 0
  const totalPrice = priceWithoutDiscount * (1 - discountPercent / 100);
  return { totalPrice, discountPercent, priceWithoutDiscount}
}
