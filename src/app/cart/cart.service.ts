import { Injectable } from "@angular/core";
import { CartItem, ShoppingCart } from "./cart.model";
import { IItem } from "../item/item.model";

@Injectable({ providedIn: 'root' })
export class CartService {

    public shoppingCart: ShoppingCart = new ShoppingCart();

    constructor() {
    }

    // Method to add an item to the cart
    addCartItem(_cartItem: CartItem): void {

        this.shoppingCart.totalQuantity = 5;

        const existingItem = this.shoppingCart.cartItems.find(cartItem => cartItem?.itemId === _cartItem.itemId && cartItem.color === _cartItem.color && cartItem.size === _cartItem.size);

        if (existingItem) {
            existingItem.quantity += _cartItem.quantity;
            existingItem.totalPrice += _cartItem.totalPrice;
        } else {
            this.shoppingCart.cartItems.push(_cartItem);
        }

        this.updateCart();
    }

    addItem(item: IItem, selectedColor: string, selectedSize: string, quantity: number): void {

        const existingItem = this.shoppingCart.cartItems.find(cartItem => cartItem?.itemId === item.id && cartItem.color === selectedColor && cartItem.size === selectedSize);

        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.totalPrice += existingItem.price * existingItem.quantity;
        } else {
            //create new cart item
            let photoUrl = item.colors.find(itemColor => itemColor.colorName == selectedColor)?.photos[0];
            let price = item.discountedPrice ? item.discountedPrice : item.price;
            let totalPrice: number = price * quantity;
            let shippingCoast: number = item.shippingCoast ? item.shippingCoast : 0;
            let totalShipping: number = shippingCoast * quantity;
            let newCartItem: CartItem = new CartItem(item.id, item.name, quantity, price, totalPrice,shippingCoast, totalShipping, selectedColor, selectedSize, photoUrl);
            this.shoppingCart.cartItems.push(newCartItem);
        }

        this.updateCart();
    }

    setCartItemQuantity(cartItem: CartItem, quantity: number): void {
        cartItem.quantity = quantity;
        this.updateCartItemOnQantityChange(cartItem);
        this.updateCart();
    }

    private updateCartItemOnQantityChange(cartItem: CartItem): void {
        cartItem.totalPrice = cartItem.price * cartItem.quantity;
        cartItem.totalShipping = cartItem.shippingCoast * cartItem.quantity;
    }

    // Method to remove an item from the cart
    removeItem(_cartItem: CartItem): void {
        this.shoppingCart.cartItems = this.shoppingCart.cartItems.filter(cartItem => !(cartItem.itemId === _cartItem.itemId && cartItem.color === _cartItem.color && cartItem.size === _cartItem.size));
        this.updateCart();
    }

    removeAllItems(): void {
        this.shoppingCart.cartItems = [];
        this.updateCart();
    }

    setItemNbr(_cartItem: CartItem, quantity: number): void {
        let cartItem = this.shoppingCart.cartItems.find(cartItem => (cartItem.itemId === _cartItem.itemId && cartItem.color === _cartItem.color && cartItem.size === _cartItem.size));
        if (cartItem)
            cartItem.quantity = quantity;
    }

    // Method to calculate and update the total quantity and price
    updateCart(): void {
        this.shoppingCart.totalQuantity = this.shoppingCart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
        this.shoppingCart.totalPrice = this.shoppingCart.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
        this.shoppingCart.totalQuantity = 0;
        this.shoppingCart.subTotal = 0;
        this.shoppingCart.totalShipping = 0;
        this.shoppingCart.totalPrice = 0;
        this.shoppingCart.cartItems.forEach(cartItem => {
            this.shoppingCart.totalQuantity += cartItem.quantity;
            this.shoppingCart.subTotal += cartItem.price * cartItem.quantity;
            this.shoppingCart.totalShipping += cartItem.totalShipping * cartItem.quantity;
            this.shoppingCart.totalPrice = this.shoppingCart.subTotal + this.shoppingCart.totalShipping
        })
    }

}