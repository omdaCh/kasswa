import { Component, OnInit, inject } from "@angular/core";
import { OrderService } from "./order.service";
import { Order } from "./order.model";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup } from "@angular/forms";

@Component({
    selector: 'app-my-purcheses',
    templateUrl: './orders.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class OrdersComponent implements OnInit {

    orderService: OrderService = inject(OrderService);
    orders!: Order[];

    fb: FormBuilder = inject(FormBuilder);

    filterForm: UntypedFormGroup = this.fb.group({
        status: ['pending'],
        period: ['lastMonth']
    })

    ngOnInit(): void {
        this.orderService.getAllOrders().subscribe(_orders => {
            this.orders = _orders;
        })
    }

    statueChange(): void {
        this.orderService.getOrders(this.filterForm.get('status')?.value,this.filterForm.get('period')?.value).subscribe(orders_=>{
            this.orders = orders_;
        })
    }

}