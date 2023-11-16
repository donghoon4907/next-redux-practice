import type { CreateGeneralRequestPayload } from '@actions/contract/general/create.action';
import type { UpdateGeneralRequestPayload } from '@actions/contract/general/update.action';
import { isEmpty } from '@utils/validator/common';

class GeneralDTO {
    constructor(
        private readonly payload:
            | CreateGeneralRequestPayload
            | UpdateGeneralRequestPayload,
    ) {}

    getPayload = () => {
        return this.payload;
    };

    requiredValidate = () => {
        const { userid, wcode, cnum, p_code, contdate, bo_dateto, payment } =
            this.payload;

        if (!userid) {
            alert('담당자를 선택해주세요.');

            return false;
        }

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

        if (isEmpty(bo_dateto)) {
            alert('보장만기를 입력해주세요.');

            return false;
        }

        if (payment === -1) {
            alert('실적보험료를 입력해주세요.');

            return false;
        }

        return true;
    };
}

export class CreateGeneralDTO extends GeneralDTO {
    constructor(payload: CreateGeneralRequestPayload) {
        super(payload);
    }
}

export class UpdateGeneralDTO extends GeneralDTO {
    constructor(payload: UpdateGeneralRequestPayload) {
        super(payload);
    }
}
