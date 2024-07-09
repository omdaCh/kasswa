export function getDiscountPercentage(price: number, discountedPrice: number): number {
  if (price && discountedPrice) {
    const discount: number = ((price - discountedPrice) / price) * 100;
    return Math.round(discount);
  }
  return 0;
}