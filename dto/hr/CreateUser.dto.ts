import type { CreateUserRequestPayload } from '@actions/hr/create.action';
import { isEmpty, isValidDateFormat, ymdRegex } from '@utils/validator/common';
import { isValidPhone } from '@utils/validator/user';

export class CreateUserDTO {
    constructor(private readonly payload: CreateUserRequestPayload) {}

    requiredValidate = () => {
        const { name, mobile, orga_idx, idnum1 } = this.payload;

        if (orga_idx === -1) {
            alert('부서를 선택해주세요.');

            return false;
        }

        if (isEmpty(name)) {
            alert('이름을 입력해주세요.');

            return false;
        }

        if (isEmpty(idnum1)) {
            alert('주민번호를 입력해주세요.');

            return false;
        } else {
            if (idnum1.length !== 13) {
                alert('주민번호를 확인해주세요.');

                return false;
            }
        }

        if (isEmpty(mobile)) {
            alert('핸드폰을 입력해주세요.');

            return false;
        } else {
            // if (mobile.length !== 11) {
            //     alert('핸드폰을 확인해주세요.');
            //     return false;
            // }
        }

        return true;
    };
}
