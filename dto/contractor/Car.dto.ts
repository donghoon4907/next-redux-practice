import type { CreateCarRequestPayload } from '@actions/contract/car/create-car.action';
import type { UpdateCarRequestPayload } from '@actions/contract/car/update-car.action';
import { isEmpty } from '@utils/validator/common';

class CarDTO {
    constructor(
        private readonly payload:
            | CreateCarRequestPayload
            | UpdateCarRequestPayload,
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
            c_idx,
            bo_datefrom,
            bo_dateto,
            payment,
            // p_persons,
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

        if (isEmpty(bo_datefrom)) {
            alert('보험시기를 입력해주세요.');

            return false;
        }

        if (isEmpty(bo_dateto)) {
            alert('보장만기를 입력해주세요.');

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

export class UpdateCarDTO extends CarDTO {
    constructor(payload: UpdateCarRequestPayload) {
        super(payload);
    }
}
