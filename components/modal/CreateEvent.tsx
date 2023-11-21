import type { FC } from 'react';
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
import { hideCreateEventModal } from '@actions/modal/create-event.action';
import {
    CreateEventPayload,
    createEvent,
} from '@actions/customer/set-event.action';
import { useSelect } from '@hooks/use-select';
import customerConstants from '@constants/options/customer';
import { FloatInput } from '@components/input/Float';
import { FloatSelect } from '@components/select/Float';
import { FloatDatepicker } from '@components/datepicker/Float';
import { MyUnit } from '@components/Unit';

interface Props {}

export const CreateEventModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowCreateEventModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { events } = useSelector<AppState, CustomerState>(
        (state) => state.customer,
    );

    // 대상자
    const [name] = useInput('', { noSpace: true });
    // 대상자구분
    const [typeWho] = useSelect(customerConstants.eventDist, null);
    // 기념일내용
    const [title] = useInput('');
    // 기념일상세
    const [description] = useInput('');
    // 기념일
    const [birthday] = useDatepicker(null);
    const [bType, setBtype] = useState(true);
    // 관리여부
    const [notice] = useSelect(customerConstants.notice, null);
    // 비고
    const [remark] = useInput('');

    // 음/양력 클릭 핸들러
    const handleClickBirthType = () => {
        setBtype(!bType);
    };

    const handleClose = () => {
        dispatch(hideCreateEventModal());
    };

    const handleSubmit = () => {
        const tf = confirm('입력한 내용대로 설정하시겠습니까?');
        if (tf) {
            const payload = createPayload();

            dispatch(createEvent(payload));

            handleClose();
        }
    };

    const createPayload = () => {
        const payload: CreateEventPayload = {
            index: generateIndex(events),
            checked: false,
        };

        if (!isEmpty(name.value)) {
            payload['name'] = name.value;
        }

        if (typeWho.value) {
            payload['type_who'] = typeWho.value.value;
        }

        if (!isEmpty(title.value)) {
            payload['title'] = title.value;
        }

        if (!isEmpty(description.value)) {
            payload['description'] = description.value;
        }

        if (!isEmpty(birthday.value)) {
            payload['eventdate'] = dayjs(birthday.value).format('YYYY-MM-DD');

            payload['d_type'] = bType;
        }

        if (!isEmpty(remark.value)) {
            payload['remark'] = remark.value;
        }

        return payload;
    };

    return (
        <Modal isOpen={isShowCreateEventModal} toggle={handleClose} size="lg">
            <ModalHeader toggle={handleClose}>기념일 추가</ModalHeader>
            <ModalBody className="wr-pages-detail__applydatepicker">
                <div className="row">
                    <div className="flex-fill">
                        <FloatInput label="대상자" {...name} />
                    </div>
                    <div className="flex-fill">
                        <FloatSelect label="대상자구분" {...typeWho} />
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="flex-fill">
                        <FloatInput label="기념일내용" {...title} />
                    </div>
                    <div className="flex-fill">
                        <FloatInput label="기념일상세" {...description} />
                    </div>
                </div>
                <div className="row wr-mt">
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
                    <div className="flex-fill">
                        <FloatSelect label="관리여부" {...notice} />
                    </div>
                </div>
                <div className="row wr-mt">
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
