// import { IItem } from "../item/item.model";

import { PaymentInfoModel } from "../checkout/payment-information/payment-information.model";
import { ShippingInfoModel } from "../checkout/shipping-information/shipping-infromation.model";
import { IItem } from "../item/item.model";

// export type CartItem = { item: IItem, quantity: number }

// export interface ICart {
//     id:number;
//     cartItems: CartItem[];
//     totalQuantity:number;
//     totalPrice:number;
// }


// Define the item model
export class CartItem {
    constructor(
        // public item: IItem,
        public itemId: number,
        public itemName:string,
        public quantity: number,
        public price: number,
        // public discountedPrice: number | null = null,
        public totalPrice: number,
        public shippingCoast: number,
        public totalShipping: number,
        public color: string,
        public size: string,
        public colorPhotoUrl?: string,
    ) { }
}

// Define the main shopping cart model
export class ShoppingCart {
    public cartId: string;
    // public userId: string;
    public cartItems: CartItem[];
    public subTotal: number;
    public totalShipping: number;
    public totalQuantity: number;
    public totalPrice: number;
    // public createdAt: Date;
    // public updatedAt: Date;
    // public currency: string;
    // public status: string;
    public shippingInfo: ShippingInfoModel;
    public paymentInfo: PaymentInfoModel;
    // public sessionToken?: string;
    // public notes?: string;

    constructor() {
        this.cartId = this.generateUniqueId();
        // this.userId = userId;
        this.cartItems = [];
        this.subTotal = 0;
        this.totalShipping = 0;
        this.totalQuantity = 0;
        this.totalPrice = 0;
        // this.createdAt = new Date();
        // this.updatedAt = new Date();
        this.shippingInfo = new ShippingInfoModel('chemakhi imad', 'omda@gmail.com', '0676884563', 'Algeria', 'Guelma', 'Belkheir', 'Café mohamed salah n:10', '24015');
        this.paymentInfo = new PaymentInfoModel('Chemakhi imad', '4567 5674 3456 2645', '12/28', '472');;
        // this.currency = currency;
        // this.status = 'active';
    }

    // Method to generate a unique ID for the cart
    private generateUniqueId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    // Method to add an item to the cart
    addCartItem(_cartItem: CartItem): void {

        this.totalQuantity = 5;

        const existingItem = this.cartItems.find(cartItem => cartItem?.itemId === _cartItem.itemId && cartItem.color === _cartItem.color && cartItem.size === _cartItem.size);

        if (existingItem) {
            existingItem.quantity += _cartItem.quantity;
            existingItem.totalPrice += _cartItem.totalPrice;
        } else {
            this.cartItems.push(_cartItem);
        }

        this.updateCart();
    }

    addItem(item: IItem, selectedColor: string, selectedSize: string, quantity: number): void {

        const existingItem = this.cartItems.find(cartItem => cartItem?.itemId === item.id && cartItem.color === selectedColor && cartItem.size === selectedSize);

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
            this.cartItems.push(newCartItem);
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
        this.cartItems = this.cartItems.filter(cartItem => !(cartItem.itemId === _cartItem.itemId && cartItem.color === _cartItem.color && cartItem.size === _cartItem.size));
        this.updateCart();
    }

    removeAllItems(): void {
        this.cartItems = [];
        this.updateCart();
    }

    setItemNbr(_cartItem: CartItem, quantity: number): void {
        let cartItem = this.cartItems.find(cartItem => (cartItem.itemId === _cartItem.itemId && cartItem.color === _cartItem.color && cartItem.size === _cartItem.size));
        if (cartItem)
            cartItem.quantity = quantity;
    }

    // Method to calculate and update the total quantity and price
    updateCart(): void {
        this.totalQuantity = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
        this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
        this.totalQuantity = 0;
        this.subTotal = 0;
        this.totalShipping = 0;
        this.totalPrice = 0;
        this.cartItems.forEach(cartItem => {
            this.totalQuantity += cartItem.quantity;
            this.subTotal += cartItem.price * cartItem.quantity;
            this.totalShipping += cartItem.totalShipping * cartItem.quantity;
            this.totalPrice = this.subTotal + this.totalShipping
        })

        // this.updatedAt = new Date();
    }


}
