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
        public itemId: string,
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

 


}
