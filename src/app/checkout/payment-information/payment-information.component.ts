import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PaymentInfoModel } from "./payment-information.model";


@Component({
    selector: "payment-information",
    templateUrl: "./payment-information.component.html"
})
export class PaymentInformationComponent implements OnInit {

    @Input()
    paymentInfoModel!: PaymentInfoModel;

    @Output()
    nextClicked: EventEmitter<boolean> = new EventEmitter();

    private fb: FormBuilder = inject(FormBuilder)

    protected paymentInfoForm: FormGroup = this.fb.group({
        cardHolderName: ['', [Validators.required]],
        cardNumber: ['', [Validators.required, Validators.pattern(/^4\d{3}\s\d{4}\s\d{4}\s\d{4}$/)]],
        expairyDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });

    ngOnInit(): void {
        this.updateFormFromModel();
    }

    private updateFormFromModel() {
        this.paymentInfoForm.patchValue(this.paymentInfoModel); 
    }

    private updateModelFromForm(): void {
        this.paymentInfoModel = { ...this.paymentInfoModel, ...this.paymentInfoForm.value };
    }

    protected onNextClick(): void {
        if (this.paymentInfoForm.invalid)
            this.makeAsTouched();
        else
            this.updateModelFromForm();
        this.nextClicked.emit();
    }

    private makeAsTouched(): void {
        Object.keys(this.paymentInfoForm.controls).forEach(key => {
            this.paymentInfoForm.get(key)?.markAsTouched();
        })
    }

    isFormValid(): boolean {
        return this.paymentInfoForm.valid
    }
}