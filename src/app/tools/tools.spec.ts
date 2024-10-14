import { getDiscountPercentage } from './tools';

describe('getDiscountPercentage', () => {

  it('should return the correct discount percentage when price and discountedPrice are valid', () => {
    const price = 100;
    const discountedPrice = 80;
    const discount = getDiscountPercentage(price, discountedPrice);
    expect(discount).toBe(20);  // 20% discount
  });

  it('should return 0 when price equals discountedPrice (no discount)', () => {
    const price = 100;
    const discountedPrice = 100;
    const discount = getDiscountPercentage(price, discountedPrice);
    expect(discount).toBe(0);  // No discount
  });

  it('should return 0 when price is 0', () => {
    const price = 0;
    const discountedPrice = 50;
    const discount = getDiscountPercentage(price, discountedPrice);
    expect(discount).toBe(0);  // Price of 0 should return 0% discount
  });

  it('should return 0 when discountedPrice is greater than price', () => {
    const price = 100;
    const discountedPrice = 120;
    const discount = getDiscountPercentage(price, discountedPrice);
    expect(discount).toBe(-20);  // This case handles higher discount prices, should return -20% discount
  });

  it('should return 0 when price or discountedPrice is negative', () => {
    const negativePriceDiscount = getDiscountPercentage(-100, 80);
    expect(negativePriceDiscount).toBe(0);  // Negative price, return 0

    const negativeDiscountedPrice = getDiscountPercentage(100, -80);
    expect(negativeDiscountedPrice).toBe(0);  // Negative discountedPrice, return 0
  });

  it('should return 0 when price or discountedPrice is undefined or null', () => {
    const undefinedPrice = getDiscountPercentage(undefined as any, 80);
    expect(undefinedPrice).toBe(0);  // Undefined price, return 0

    const nullDiscountedPrice = getDiscountPercentage(100, null as any);
    expect(nullDiscountedPrice).toBe(0);  // Null discountedPrice, return 0
  });

});
