import type { CreateUserRequestPayload } from '@actions/user/create-user.action';
import type { UpdateUserRequestPayload } from '@actions/user/update-user.action';
import { isEmpty } from '@utils/validator/common';

class UserDTO {
    constructor(
        private readonly payload:
            | CreateUserRequestPayload
            | UpdateUserRequestPayload,
    ) {}

    getPayload = () => {
        return this.payload;
    };

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
            if (idnum1!.length !== 13) {
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

export class CreateUserDTO extends UserDTO {
    constructor(payload: CreateUserRequestPayload) {
        super(payload);
    }
}

export class UpdateUserDTO extends UserDTO {
    constructor(payload: UpdateUserRequestPayload) {
        super(payload);
    }
}
