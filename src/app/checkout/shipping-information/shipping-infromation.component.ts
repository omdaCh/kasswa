import { Component, EventEmitter, Input, OnInit, Output, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { countriesList } from "../../tools/coutries-list";
import { ShippingInfoModel } from "./shipping-infromation.model";

@Component({
    selector: 'shipping-information',
    templateUrl: './shipping-information.component.html'
})
export class ShippingInformaitonComponent implements OnInit {

    @Input()
    shippingInfoModel!: ShippingInfoModel

    @Output()
    protected nextClicked: EventEmitter<boolean> = new EventEmitter<boolean>()


    private fb: FormBuilder = inject(FormBuilder);

    countriesList = countriesList;



    protected shippementInfoForm: FormGroup = this.fb.group({
        contactName: ['', [Validators.required, Validators.maxLength(50)]],
        contactEmail: ['', [Validators.required, Validators.email]],
        contactPhoneNumber: ['', [Validators.required]],
        country: ['', [Validators.required]],
        stateProvince: ['', [Validators.required]],
        city: ['', [Validators.required]],
        streetHouse: ['', [Validators.required]],
        zipCode: ['', [Validators.required]]
    })



    ngOnInit(): void {
        this.updateFormFromModel();
    }

    protected onNextClicked(): void {
        if (this.shippementInfoForm.invalid) {
            this.markAsTouched();
        } else {
            this.updateModelFromForm();
        }
        this.nextClicked.emit();
    }

    protected markAsTouched(): void {
        Object.keys(this.shippementInfoForm.controls).forEach(key => {
            this.shippementInfoForm.get(key)?.markAsTouched();
        })
    }

    private updateModelFromForm(): void {
        const formValues = this.shippementInfoForm.value;
        this.shippingInfoModel = { ...this.shippingInfoModel, ...formValues };
    }

    private updateFormFromModel(): void {
        this.shippementInfoForm.patchValue(this.shippingInfoModel);
    }

    public isFormValid(): boolean {
        return this.shippementInfoForm.valid;
    }

}