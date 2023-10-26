import { Code } from '@models/code';
import { isEmpty } from '@utils/validator/common';

export class CodeDTO {
    constructor(private readonly payload: Code) {}

    getPayload = () => {
        return this.payload;
    };

    requiredValidate = () => {
        const { wcode, fccode, password, cent_val } = this.payload;

        if (isEmpty(wcode)) {
            return alert('보험사를 선택해주세요.');
        }

        if (isEmpty(fccode)) {
            return alert('코드를 입력해주세요.');
        }

        if (isEmpty(password)) {
            return alert('비밀번호를 입력해주세요.');
        }

        if (isEmpty(cent_val)) {
            return alert('인증번호를 입력해주세요.');
        }

        return true;
    };
}
