import { Injectable } from "@angular/core";
import { ShoppingCart } from "./cart.model";

@Injectable({ providedIn: 'root' })
export class CartService {

    public shoppingCart: ShoppingCart = new ShoppingCart();

    constructor() {
        // this.shoppingCart.totalQuantity = 5; 
    }

}