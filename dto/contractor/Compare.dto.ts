import { isEmpty } from '@utils/validator/common';

export class CompareDTO {
    constructor(private readonly payload: any) {}

    getPayload = () => {
        return this.payload;
    };

    requiredValidate = () => {
        const {
            jumin,
            idate,
            name,
            caruse,
            carfamily,
            carage,
            carcode,
            caryear,
            cardate,
            dambo2,
            dambo3,
            dambo4,
            dambo5,
            dambo6,
            goout1,
            goout_dist,
            guipcarrer,
            guipcarrer_car,
            traffic,
            childdrive,
            halin,
            special_code,
            special_code2,
            ss_sago3,
        } = this.payload;

        if (isEmpty(jumin)) {
            alert('주민번호를 입력하세요.');

            return false;
        }

        if (jumin.length !== 14) {
            alert('주민번호를 확인하세요.');

            return false;
        }

        if (isEmpty(idate)) {
            alert('가입예정일을 입력하세요.');

            return false;
        }

        if (isEmpty(name)) {
            alert('고객명을 입력하세요.');

            return false;
        }

        if (isEmpty(caruse)) {
            alert('차량용도를 선택하세요.');

            return false;
        }

        if (isEmpty(carfamily)) {
            alert('가족한정을 선택하세요.');

            return false;
        }

        if (isEmpty(carage)) {
            alert('운전자연령을 선택하세요.');

            return false;
        }

        if (isEmpty(carcode)) {
            alert('차명코드를 확인하세요.');

            return false;
        }

        if (isEmpty(caryear)) {
            alert('차량연식을 선택하세요.');

            return false;
        }

        if (isEmpty(cardate)) {
            alert('차량등록일을 입력하세요.');

            return false;
        }

        if (isEmpty(dambo2)) {
            alert('대인배상II을 선택하세요.');

            return false;
        }

        if (isEmpty(dambo3)) {
            alert('대물한도를 선택하세요.');

            return false;
        }

        if (isEmpty(dambo4)) {
            alert('자손/자상을 선택하세요.');

            return false;
        }

        if (isEmpty(dambo5)) {
            alert('무보험차을 선택하세요.');

            return false;
        }

        if (isEmpty(dambo6)) {
            alert('자기차량을 선택하세요.');

            return false;
        }

        if (isEmpty(goout1)) {
            alert('긴급출동을 선택하세요.');

            return false;
        }

        if (isEmpty(goout_dist)) {
            alert('긴급출동세부을 선택하세요.');

            return false;
        }

        if (isEmpty(guipcarrer)) {
            alert('보험가입경력 - 피보험자를 선택하세요.');

            return false;
        }

        if (isEmpty(guipcarrer_car)) {
            alert('보험가입경력 - 차량을 선택하세요.');

            return false;
        }

        if (isEmpty(traffic)) {
            alert('교통법규위반을 선택하세요.');

            return false;
        }

        if (isEmpty(childdrive)) {
            alert('총차량대수을 선택하세요.');

            return false;
        }

        if (isEmpty(halin)) {
            alert('할인할증률을 선택하세요.');

            return false;
        }

        if (isEmpty(special_code)) {
            alert('특별할증율 - 기본할증을 선택하세요.');

            return false;
        }

        if (isEmpty(special_code2)) {
            alert('특별할증율 - 추가할증을 선택하세요.');

            return false;
        }

        if (isEmpty(ss_sago3)) {
            alert('3년간사고요율 - 3년간요율을 선택하세요.');

            return false;
        }

        return true;
    };
}
