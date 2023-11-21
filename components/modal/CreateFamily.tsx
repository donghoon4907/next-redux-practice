import type { FC } from 'react';
import type { Family } from '@models/family';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { CustomerState } from '@reducers/customer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { isEmpty } from '@utils/validator/common';
import { generateIndex } from '@utils/generate';
import { createFamily } from '@actions/customer/set-family.action';
import { hideCreateFamilyModal } from '@actions/modal/create-family.action';
import { FloatSelect } from '@components/select/Float';
import { FloatInput } from '@components/input/Float';
import customerConstants from '@constants/options/customer';
import commonConstants from '@constants/options/common';
import { useSelect } from '@hooks/use-select';
import { FloatDatepicker } from '@components/datepicker/Float';
import { MyUnit } from '@components/Unit';

interface Props {}

export const CreateFamilyModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowCreateFamilyModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { family } = useSelector<AppState, CustomerState>(
        (state) => state.customer,
    );

    // 이름
    const [name] = useInput('', { noSpace: true });
    // 구분
    const [type] = useSelect(customerConstants.familyDist, null);
    // 관계
    const [relation] = useInput('', { noSpace: true });
    // 생년월일
    const [birthday] = useDatepicker(null);
    const [bType, setBtype] = useState(true);
    // 성별
    const [gender] = useSelect(commonConstants.gender, null);
    // 비고
    const [remark] = useInput('');

    // 음/양력 클릭 핸들러
    const handleClickBirthType = () => {
        setBtype(!bType);
    };

    const handleClose = () => {
        dispatch(hideCreateFamilyModal());
    };

    const handleSubmit = () => {
        const tf = confirm('입력한 내용대로 설정하시겠습니까?');
        if (tf) {
            const payload = createPayload();

            dispatch(createFamily(payload));

            handleClose();
        }
    };

    const createPayload = () => {
        const payload: Family = {
            index: generateIndex(family),
            checked: false,
        };

        if (type.value) {
            payload['type'] = type.value.value;
        }

        if (gender.value) {
            payload['sex'] = gender.value.value;
        }

        if (!isEmpty(name.value)) {
            payload['name'] = name.value;
        }

        if (!isEmpty(relation.value)) {
            payload['relation'] = relation.value;
        }

        if (!isEmpty(birthday.value)) {
            payload['birthday'] = dayjs(birthday.value).format('YYYY-MM-DD');

            payload['birth_type'] = bType;
        }

        if (!isEmpty(remark.value)) {
            payload['remark'] = remark.value;
        }

        return payload;
    };

    return (
        <Modal isOpen={isShowCreateFamilyModal} toggle={handleClose} size="lg">
            <ModalHeader toggle={handleClose}>가족 및 지인 추가</ModalHeader>
            <ModalBody className="wr-pages-detail__applydatepicker">
                <div className="row">
                    <div className="flex-fill">
                        <FloatInput label="이름" {...name} />
                    </div>
                    <div className="flex-fill">
                        <FloatSelect label="구분" {...type} />
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="flex-fill">
                        <FloatInput label="관계" {...relation} />
                    </div>
                    <div className="flex-fill">
                        <FloatDatepicker
                            label="생년월일"
                            isRequired
                            hooks={birthday}
                            after={
                                <MyUnit
                                    placement="button"
                                    role="button"
                                    onClick={handleClickBirthType}
                                >
                                    {bType ? '양력' : '음력'}
                                </MyUnit>
                            }
                        />
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="flex-fill">
                        <FloatSelect label="성별" {...gender} />
                    </div>
                    <div className="flex-fill">
                        <FloatInput label="비고" {...remark} />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    등록
                </Button>
            </ModalFooter>
        </Modal>
    );
};
