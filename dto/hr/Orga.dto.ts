import type { CreateOrgaRequestPayload } from '@actions/hr/create-orga.action';
import { isEmpty } from '@utils/validator/common';

class OrgaDTO {
    constructor(private readonly payload: CreateOrgaRequestPayload) {}

    getPayload = () => {
        return this.payload;
    };

    requiredValidate = () => {
        const { orga_rank, orga_name, manager_id, status, indate } =
            this.payload;

        if (isEmpty(orga_rank)) {
            alert('조직등급을 선택해주세요.');

            return false;
        }

        if (isEmpty(orga_name)) {
            alert('조직명을 입력해주세요.');

            return false;
        }

        if (isEmpty(manager_id)) {
            alert('부서장을 선택해주세요.');

            return false;
        }

        if (isEmpty(status)) {
            alert('현황을 선택해주세요.');

            return false;
        }

        if (isEmpty(indate)) {
            alert('개설일을 입력해주세요.');

            return false;
        }

        return true;
    };
}

export class CreateOrgaDTO extends OrgaDTO {
    constructor(payload: CreateOrgaRequestPayload) {
        super(payload);
    }
}
