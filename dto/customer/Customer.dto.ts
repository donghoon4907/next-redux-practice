import type { CreateCustomerRequestPayload } from '@actions/customer/create-customer.action';
import { isEmpty } from '@utils/validator/common';

class CustomerDTO {
    constructor(private readonly payload: CreateCustomerRequestPayload) {}

    getPayload = () => {
        return this.payload;
    };

    requiredValidate = () => {
        const { name } = this.payload;

        if (isEmpty(name)) {
            alert('고객명을 입력해주세요.');

            return false;
        }

        return true;
    };
}

export class CreateCustomerDTO extends CustomerDTO {
    constructor(payload: CreateCustomerRequestPayload) {
        super(payload);
    }
}
