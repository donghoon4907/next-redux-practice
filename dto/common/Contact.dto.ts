import type { CreateContactRequestPayload } from '@actions/common/create-contact.action';
import { isEmpty } from '@utils/validator/common';

class ContactDTO {
    constructor(private readonly payload: CreateContactRequestPayload) {}

    getPayload = () => {
        return this.payload;
    };

    requiredValidate = () => {
        const { kind, channel, issuedate, replydatetime, status } =
            this.payload;

        if (isEmpty(kind)) {
            alert('상담구분을 선택해주세요.');

            return false;
        }

        if (isEmpty(channel)) {
            alert('채널을 선택해주세요.');

            return false;
        }

        if (isEmpty(issuedate)) {
            alert('사유발생일을 선택해주세요.');

            return false;
        }

        if (isEmpty(replydatetime)) {
            alert('응대예정일을 선택해주세요.');

            return false;
        }

        if (isEmpty(status)) {
            alert('진행상태를 선택해주세요.');

            return false;
        }

        return true;
    };
}

export class CreateContactDTO extends ContactDTO {
    constructor(payload: CreateContactRequestPayload) {
        super(payload);
    }
}
