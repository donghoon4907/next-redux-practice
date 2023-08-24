import type { CreateCustomerRequestPayload } from '@actions/customer/create-customer.action';
import type { UpdateCustomerRequestPayload } from '@actions/customer/update-customer.action';
import { isEmpty } from '@utils/validator/common';

class CustomerDTO {
    constructor(
        private readonly payload:
            | CreateCustomerRequestPayload
            | UpdateCustomerRequestPayload,
    ) {}

    getPayload = () => {
        return this.payload;
    };

    requiredValidate = () => {
        const { name, idnum, custtype } = this.payload;

        if (isEmpty(name)) {
            alert('고객명을 입력해주세요.');

            return false;
        }

        if (isEmpty(idnum)) {
            if (custtype === 0) {
                alert('주민번호를 입력하세요.');

                return false;
            } else if (custtype === 1) {
                alert('사업자등록번호를 입력하세요.');

                return false;
            }
        } else {
            if (custtype === 0 && idnum!.length !== 13) {
                alert('주민번호를 확인하세요.');

                return false;
            }
        }

        return true;
    };
}

export class CreateCustomerDTO extends CustomerDTO {
    constructor(payload: CreateCustomerRequestPayload) {
        super(payload);
    }
}

export class UpdateCustomerDTO extends CustomerDTO {
    constructor(payload: UpdateCustomerRequestPayload) {
        super(payload);
    }
}
