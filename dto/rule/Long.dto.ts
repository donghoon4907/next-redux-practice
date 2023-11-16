import type { CreateLongRuleRequestPayload } from '@actions/rule/long/create.action';
import { isEmpty } from '@utils/validator/common';

class LongRuleDTO {
    constructor(private readonly payload: CreateLongRuleRequestPayload) {}

    getPayload = () => {
        return this.payload;
    };

    requiredValidate = () => {
        const { rule_name } = this.payload;

        if (isEmpty(rule_name)) {
            alert('장기 지급 제도명을 입력해주세요.');

            return false;
        }

        return true;
    };
}

export class CreateLongRuleDTO extends LongRuleDTO {
    constructor(payload: CreateLongRuleRequestPayload) {
        super(payload);
    }
}
