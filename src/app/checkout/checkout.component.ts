import { Component, OnInit, ViewChild, inject } from "@angular/core";
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
} from '@angular/animations';
import { countriesList } from "../tools/coutries-list";
import { ShippingInformaitonComponent } from "./shipping-information/shipping-infromation.component";
import { PaymentInformationComponent } from "./payment-information/payment-information.component";
import { CheckoutConfirmationComponent } from "./confirmation/checkout-confirmation.component";
import { ShippingInfoModel } from "./shipping-information/shipping-infromation.model";
import { PaymentInfoModel } from "./payment-information/payment-information.model";
import { CartService } from "../cart/cart.service";
import { CheckoutService } from "./checkout.service";



@Component({
    templateUrl: "./checkout.component.html",
    animations: [
        trigger('slideIn', [
            state('hidden', style({ transform: 'translateX(100%)', display: 'none' })),
            state('visible', style({ transform: 'translateX(0)', display: 'block' })),
            transition('hidden => visible', [
                style({ display: 'block' }), // Ensure element is displayed during animation
                animate('0.5s ease-in')
            ]),
        ])
    ]
})
export class CheckoutComponent implements OnInit {

    cartService: CartService = inject(CartService);
    checkoutService: CheckoutService = inject(CheckoutService);

    currentStep: number = 1;
    enterStep = true;
    countriesList = countriesList;

    //this variable used to remove the alert from the DOM because when we close it the under element don't behave to click
    formErrorsAlertOpen: boolean = false;

    @ViewChild('shipInfoComp')
    shipInfoComp!: ShippingInformaitonComponent;
    shipInfoNextClicked: boolean = false;
    shippingInfoModel: ShippingInfoModel;

    @ViewChild('paymentInfoComp')
    paymentInfoComp!: PaymentInformationComponent;
    paymentInfoNextClicked: boolean = false;
    paymentInfoModel: PaymentInfoModel;

    @ViewChild('checkoutConfirmation')
    checkoutConfComp!: CheckoutConfirmationComponent;
    checkoutConfNextClicked: boolean = true;

    checkOutConfirmed: boolean = false;

    constructor() {
        this.shippingInfoModel = this.cartService.shoppingCart.shippingInfo;
        this.paymentInfoModel = this.cartService.shoppingCart.paymentInfo;
    }

    selectStep(stepNumber: number): void {
        this.currentStep = stepNumber;
        this.enterStep = !this.enterStep;
    }

    addressNextClicked(): void {
        this.shipInfoNextClicked = true;
        if (this.shipInfoComp.isFormValid()) {
            this.selectStep(2);
        }
        else {
            this.formErrorsAlertOpen = true;
        }
    }

    paymentNextClicked() {
        this.paymentInfoNextClicked = true
        if (this.paymentInfoComp.isFormValid()) {
            this.selectStep(3);
        }
        else {
            this.formErrorsAlertOpen = true;
        }
    }

    // confirmePayment(): void {
    //     this.checkOutConfirmed = true;
    // }

    ngOnInit(): void {
    }

    onCheckOutConfirmationClick(): void {

        this.checkoutService.confirmCheckout().subscribe({
            next: resp => {
                this.checkOutConfirmed = true;
                this.cartService.emptyTheCart();
            },
            error: err => {
                console.log(err);
            }
        });
    }

}