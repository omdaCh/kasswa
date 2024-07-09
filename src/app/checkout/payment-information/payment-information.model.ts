export interface IPaymentInfoModel {
    cardHolderName: string;
    cardNumber: string;
    expairyDate: string;
    cvv: string;
}

export class PaymentInfoModel implements IPaymentInfoModel{
    constructor(public cardHolderName: string,
        public cardNumber: string,
        public expairyDate: string,
        public cvv: string,) { }
}