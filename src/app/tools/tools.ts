export function getDiscountPercentage(price: number, discountedPrice: number): number {
  if (!price || price <= 0 || !discountedPrice || discountedPrice <= 0) {
    return 0; // Return 0 if the price is invalid or the discountedPrice is not greater than 0
  }

  const discount: number = ((price - discountedPrice) / price) * 100;
  return Math.round(discount);
}