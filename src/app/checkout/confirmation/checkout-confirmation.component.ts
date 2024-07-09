import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { CartService } from "../../cart/cart.service";
import { ShippingInfoModel } from "../shipping-information/shipping-infromation.model";
import { PaymentInfoModel } from "../payment-information/payment-information.model";


@Component({
    selector: 'checkout-confirmation',
    templateUrl: './checkout-confirmation.component.html'
})
export class CheckoutConfirmationComponent {

    cartService:CartService = inject(CartService);

    @Input()
    shippingInfoModel!:ShippingInfoModel;

    @Input()
    paymentInfoModel!:PaymentInfoModel;

    @Output()
    confirmationClick:EventEmitter<boolean> = new EventEmitter<boolean>();

    onConfirmationClick():void{
        this.confirmationClick.emit();
    }
  

}
