import type { CreateCarRequestPayload } from '@actions/contract/car/create-car.action';
import { isEmpty } from '@utils/validator/common';

class CarDTO {
    constructor(private readonly payload: CreateCarRequestPayload) {}

    getPayload = () => {
        return this.payload;
    };

    requiredValidate = () => {
        const {
            wcode,
            cnum,
            p_code,
            contdate,
            bo_datefrom,
            bo_dateto,
            payment,
            // p_persons,
        } = this.payload;

        if (wcode === -1) {
            alert('보험사를 선택해주세요.');

            return false;
        }

        if (isEmpty(cnum)) {
            alert('계약번호를 입력해주세요.');

            return false;
        }

        if (isEmpty(p_code)) {
            alert('상품을 선택해주세요.');

            return false;
        }

        if (isEmpty(contdate)) {
            alert('계약일자를 입력해주세요.');

            return false;
        }

        if (isEmpty(bo_datefrom)) {
            alert('보장시기를 입력해주세요.');

            return false;
        }

        if (isEmpty(bo_dateto)) {
            alert('보장만기를 입력해주세요.');

            return false;
        }

        if (payment === -1) {
            alert('보험료를 입력해주세요.');

            return false;
        }

        return true;
    };
}

export class CreateCarDTO extends CarDTO {
    constructor(payload: CreateCarRequestPayload) {
        super(payload);
    }
}
