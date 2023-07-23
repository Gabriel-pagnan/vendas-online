import { PaymentStatusEntity } from "../entities/payment-status.enttity";

export class ReturnPaymentStatus {
    id: number;
    name: string;

    constructor(paymentStatus: PaymentStatusEntity) {
        this.id = paymentStatus.id;
        this.name = paymentStatus.name;
    }
}