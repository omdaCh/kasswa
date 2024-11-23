import { Injectable, inject } from "@angular/core";
import { IOrder, Order, OrderItem } from "../orders/order.model";
import { CartItem } from "../cart/cart.model";
import { CartService } from "../cart/cart.service";
import { Observable } from "rxjs";
import { OrderService } from "../orders/order.service";

@Injectable({ providedIn: 'root' })
export class CheckoutService {


    private cartService: CartService = inject(CartService);
    private orderService:OrderService = inject(OrderService)

    public confirmCheckout(): Observable<Order> {
        const newOrder = this.createOrderFromShoopingCart();
        this.cartService.shoppingCart.cartItems.forEach(cartItem => {
            newOrder.orderItems.push(this.creatOrderItemFromCartItem(cartItem));
        });
        return this.orderService.saveNewOrder(newOrder);
    }

   

    private createOrderFromShoopingCart(): Order {
        const newOrder: Partial<IOrder> = {};
        newOrder.date = new Date();
        newOrder.status = "pending";
        newOrder.orderItems = [];
        newOrder.totalQuantity = this.cartService.shoppingCart.totalQuantity;
        newOrder.subTotal = this.cartService.shoppingCart.subTotal;
        newOrder.totalShipping = this.cartService.shoppingCart.totalShipping;
        newOrder.totalPrice = this.cartService.shoppingCart.totalPrice;
        return newOrder as Order;
    }

    private creatOrderItemFromCartItem(cartItem: CartItem): OrderItem {
        const orderItem: Partial<OrderItem> = {}
        orderItem.itemId = cartItem.itemId;
        orderItem.itemName = cartItem.itemName;
        orderItem.color = cartItem.color;
        orderItem.colorPhotoUrl = cartItem.colorPhotoUrl;
        orderItem.size = cartItem.size;
        orderItem.quantity = cartItem.quantity;
        orderItem.price = cartItem.price;
        orderItem.totalPrice = cartItem.totalPrice;
        orderItem.shippingCoast = cartItem.shippingCoast;
        orderItem.totalShipping = cartItem.totalShipping;

        return orderItem as OrderItem;
    }



}