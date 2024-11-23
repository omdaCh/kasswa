import { Injectable } from "@angular/core";
import { CartItem, ShoppingCart } from "./cart.model";
import { IItem } from "../item/item.model";

@Injectable({ providedIn: 'root' })
export class CartService {

    public shoppingCart: ShoppingCart = new ShoppingCart();

    constructor() {
    }


    addItem(item: IItem, selectedColor: string, selectedSize: string, quantity: number): void {

        const existingItem = this.shoppingCart.cartItems.find(cartItem => cartItem?.itemId === item.id && cartItem.color === selectedColor && cartItem.size === selectedSize);

        if (existingItem) {
            this.setCartItemQuantity(existingItem,existingItem.quantity +1);
        } else {
            //create new cart item
            const photoUrl = item.colors.find(itemColor => itemColor.colorName == selectedColor)?.photos[0];
            const price = item.discountedPrice ? item.discountedPrice : item.price;
            const totalPrice: number = price * quantity;
            const shippingCoast: number = item.shippingCoast ? item.shippingCoast : 0;
            const totalShipping: number = shippingCoast * quantity;
            const newCartItem: CartItem = new CartItem(item.id, item.name, quantity, price, totalPrice,shippingCoast, totalShipping, selectedColor, selectedSize, photoUrl);
            this.shoppingCart.cartItems.push(newCartItem);
        }

        this.updateCart();
    }

    setCartItemQuantity(cartItem: CartItem, quantity: number): void {
        cartItem.quantity = quantity;
        this.computeAndSetCartItemCosts(cartItem);
        this.updateCart();
    }

    private computeAndSetCartItemCosts(cartItem: CartItem): void {
        cartItem.totalPrice = cartItem.price * cartItem.quantity;
        cartItem.totalShipping = cartItem.shippingCoast * cartItem.quantity;
    }

    // Method to remove an item from the cart
    removeCartItem(_cartItem: CartItem): void {
        this.shoppingCart.cartItems = this.shoppingCart.cartItems.filter(cartItem => !(cartItem.itemId === _cartItem.itemId && cartItem.color === _cartItem.color && cartItem.size === _cartItem.size));
        this.updateCart();
    }

    emptyTheCart(): void {
        this.shoppingCart.cartItems = [];
        this.updateCart();
    }

    // Method to calculate and update the total quantity and price
    private updateCart(): void {
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