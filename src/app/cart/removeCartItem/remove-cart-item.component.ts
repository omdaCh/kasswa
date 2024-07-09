import { Component, Input, inject } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    templateUrl:'./remove-cart-item.component.html',
    standalone: true,

})
export class RemoveCartItemComponent {
    activeModal = inject(NgbActiveModal);

	@Input() name?: string;

}