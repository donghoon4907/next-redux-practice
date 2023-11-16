import type { CreateLongRequestPayload } from '@actions/contract/long/create.action';
import type { UpdateLongRequestPayload } from '@actions/contract/long/update.action';
import { isEmpty } from '@utils/validator/common';

class LongDTO {
    constructor(
        private readonly payload:
            | CreateLongRequestPayload
            | UpdateLongRequestPayload,
    ) {}

    getPayload = () => {
        return this.payload;
    };

    requiredValidate = () => {
        const {
            userid,
            wcode,
            cnum,
            p_code,
            contdate,
            pay_cycle,
            pay_dateto,
            bo_dateto,
            payment,
            c_idx,
            // p_name,
        } = this.payload;

        if (isEmpty(userid)) {
            alert('담당자를 선택해주세요.');

            return false;
        }

        if (isEmpty(wcode)) {
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

        if (isEmpty(c_idx)) {
            alert('계약자를 설정해주세요.');

            return false;
        }

        // if (isEmpty(p_name)) {
        //     alert('피보험자를 설정해주세요.');

        //     return false;
        // }

        if (isEmpty(contdate)) {
            alert('계약일자를 입력해주세요.');

            return false;
        }

        if (isEmpty(pay_dateto)) {
            alert('납입만기를 입력해주세요.');

            return false;
        }

        if (isEmpty(pay_cycle)) {
            alert('납입주기를 선택해주세요.');

            return false;
        }

        if (isEmpty(bo_dateto)) {
            alert('보장만기를 입력해주세요.');

            return false;
        }

        if (isEmpty(payment)) {
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

export class UpdateLongDTO extends LongDTO {
    constructor(payload: UpdateLongRequestPayload) {
        super(payload);
    }
}
