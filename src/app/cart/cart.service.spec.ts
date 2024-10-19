import { TestBed } from "@angular/core/testing";
import { CartService } from "./cart.service";
import { IItem } from "../item/item.model";
import { CartItem } from "./cart.model";

describe('Shopping cart service', () => {

    let cartService: CartService;

    const itemMock: IItem = {
        id: '1',
        name: 'Stylish Shirt',
        description: 'A trendy shirt made with premium cotton.',
        colors: [
            {
                colorName: 'Blue',
                sizes: [
                    { name: 'S', available: true },
                    { name: 'M', available: true },
                    { name: 'L', available: false }
                ],
                photos: ['blue-shirt-1.jpg', 'blue-shirt-2.jpg']
            },
            {
                colorName: 'Red',
                sizes: [
                    { name: 'S', available: true },
                    { name: 'M', available: false },
                    { name: 'L', available: true }
                ],
                photos: ['red-shirt-1.jpg', 'red-shirt-2.jpg']
            }
        ],
        price: 50,
        discountedPrice: 40,
        nbrSold: 100,
        rating: 4.8,
        numberOfReviews: 150,
        brand: {
            name: 'Fashion Brand',
            photoUrl: 'fashion-brand-logo.jpg'
        },
        gender: 'male',
        age: 'Adulte',
        category: 'Shirts',
        shippingCoast: 5
    };

    const selectedColor: string = itemMock.colors[0].colorName;
    const selectedSize: string = itemMock.colors[0].sizes[0].name;


    beforeEach(() => {
        cartService = TestBed.inject(CartService);
    });

    it("should add a new item to the cart", () => {
        cartService.addItem(itemMock, selectedColor, selectedSize, 2);
        const cartItem = cartService.shoppingCart.cartItems[0]
        expect(cartItem.itemId).toBe(itemMock.id);
        expect(cartItem.color).toBe(selectedColor);
        expect(cartItem.size).toBe(selectedSize);
        expect(cartItem.quantity).toBe(2);
        expect(cartItem.totalPrice).toBe(80);
        expect(cartItem.totalShipping).toBe(10);
    });

    it("Should increase the quantity when adding an existing item", () => {

        cartService.addItem(itemMock, selectedColor, selectedSize, 1);

        cartService.addItem(itemMock, selectedColor, selectedSize, 1);

        const cartItem: CartItem = cartService.shoppingCart.cartItems[0];

        expect(cartItem.quantity).toBe(2);
        expect(cartItem.totalPrice).toBe(80);
        expect(cartItem.totalShipping).toBe(10);

    });

    it("Should remove and item from the cart", () => {
        cartService.addItem(itemMock, selectedColor, selectedSize, 1);
        const cartItem: CartItem = cartService.shoppingCart.cartItems[0];
        cartService.removeCartItem(cartItem);
        expect(cartService.shoppingCart.cartItems.length).toBe(0);
    });

    it("The emptyTheCart should remove all items", () => {
        cartService.addItem(itemMock, selectedColor, selectedSize, 1);
        cartService.addItem(itemMock, selectedColor, selectedSize, 1);

        cartService.emptyTheCart();
        expect(cartService.shoppingCart.cartItems.length).toBe(0);
    });

    it("")
});