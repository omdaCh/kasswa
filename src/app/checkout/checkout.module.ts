import { NgModule } from "@angular/core";
import { CheckoutComponent } from "./checkout.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { ShippingInformaitonComponent } from "./shipping-information/shipping-infromation.component";
import { PaymentInformationComponent } from "./payment-information/payment-information.component";
import { CheckoutConfirmationComponent } from "./confirmation/checkout-confirmation.component";


const routes: Routes = [
    {
        path: "",
        component: CheckoutComponent
    }
]

@NgModule({
    declarations: [CheckoutComponent,ShippingInformaitonComponent,PaymentInformationComponent,CheckoutConfirmationComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbAlertModule, RouterModule.forChild(routes), ],
    providers: [HttpClientModule]
})
export class CheckoutModule {

}


