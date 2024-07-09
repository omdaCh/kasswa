export interface IShippingInfoModel {
        contactName?: string;
        contactEmail?: string;
        contactPhoneNumber?: string;
        country?: string;
        stateProvince?: string;
        city?: string;
        streetHouse?: string;
        zipCode?: string;
}

export class ShippingInfoModel implements IShippingInfoModel{
    constructor(
        public contactName?: string,
        public contactEmail?: string,
        public contactPhoneNumber?: string,
        public country?: string,
        public stateProvince?: string,
        public city?: string,
        public streetHouse?: string,
        public zipCode?: string,
    ){}
}