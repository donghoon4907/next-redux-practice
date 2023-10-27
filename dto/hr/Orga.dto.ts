import type { CreateOrgaRequestPayload } from '@actions/hr/create-orga.action';
import { UpdateOrgaRequestPayload } from '@actions/hr/update-orga.action';
import { isEmpty } from '@utils/validator/common';

class OrgaDTO {
    constructor(
        private readonly payload:
            | CreateOrgaRequestPayload
            | UpdateOrgaRequestPayload,
    ) {}

    getPayload = () => {
        return this.payload;
    };

    requiredValidate = () => {
        const {
            orga_rank,
            orga_name,
            upper_idx,
            manager_id,
            status,
            indate,
            insucode,
        } = this.payload;

        // 코드 유효성 검사
        for (let i = 0; i < insucode.length; i++) {
            const { wcode, fccode, dist } = insucode[i];
            if (!wcode || !fccode) {
                let message = '';

                if (!wcode) {
                    message += '보험사를 ';
                } else if (!fccode) {
                    message += '코드를 ';
                }

                message += '설정하지 않은 ';

                if (dist === '손보') {
                    message += '손해';
                } else {
                    message += '생명';
                }

                message += '보험사코드가 있습니다.';

                alert(message);

                return false;
            }
        }

        if (isEmpty(orga_rank)) {
            alert('조직등급을 선택해주세요.');

            return false;
        }

        if (isEmpty(orga_name)) {
            alert('조직명을 입력해주세요.');

            return false;
        }

        if (isEmpty(upper_idx)) {
            alert('소속을 선택해주세요.');

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

export class UpdateOrgaDTO extends OrgaDTO {
    constructor(payload: UpdateOrgaRequestPayload) {
        super(payload);
    }
}
