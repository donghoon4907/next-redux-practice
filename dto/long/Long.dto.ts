import type { CreateLongRequestPayload } from '@actions/long/create-long.action';
import { isEmpty } from '@utils/validator/common';

class LongDTO {
    constructor(private readonly payload: CreateLongRequestPayload) {}

    getPayload = () => {
        return this.payload;
    };

    requiredValidate = () => {
        const {
            wcode,
            cnum,
            p_code,
            contdate,
            pay_cycle,
            pay_dateto,
            payment,
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

        if (pay_cycle === -1) {
            alert('납입주기를 선택해주세요.');

            return false;
        }

        if (isEmpty(pay_dateto)) {
            alert('납입만기를 입력해주세요.');

            return false;
        }

        if (payment === -1) {
            alert('실적보험료를 입력해주세요.');

            return false;
        }

        return true;
    };
}

export class CreateLongDTO extends LongDTO {
    constructor(payload: CreateLongRequestPayload) {
        super(payload);
    }
}
