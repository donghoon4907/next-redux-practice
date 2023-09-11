import type { FC, ChangeEvent } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { CustomerState } from '@reducers/customer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { useInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { isEmpty } from '@utils/validator/common';
import { generateIndex } from '@utils/generate';
import { MyRadio } from '@components/radio';
import { DateAndSLInput } from '@partials/common/input/DateAndSL';
import { hideCreateEventModal } from '@actions/modal/create-event.action';
import {
    CreateEventPayload,
    createEvent,
} from '@actions/customer/set-event.action';
import { useSelect } from '@hooks/use-select';
import customerConstants from '@constants/options/customer';
import { MySelect } from '@components/select';

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
    const [typeWho, setTypeWho] = useState('');
    // 기념일내용
    const [title] = useInput('');
    // 기념일상세
    const [description] = useInput('');
    // 기념일
    const [eventdate] = useDatepicker(null);
    const [dType, setDtype] = useState(true);
    // 관리여부
    const [notice] = useSelect(customerConstants.notice, null);
    // 비고
    const [remark] = useInput('');

    const handleChangeTypeWho = (evt: ChangeEvent<HTMLInputElement>) => {
        setTypeWho(evt.target.value);
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

        if (!isEmpty(typeWho)) {
            payload['type_who'] = typeWho;
        }

        if (!isEmpty(title.value)) {
            payload['title'] = title.value;
        }

        if (!isEmpty(description.value)) {
            payload['description'] = description.value;
        }

        if (!isEmpty(eventdate.value)) {
            payload['eventdate'] = dayjs(eventdate.value).format('YYYY-MM-DD');

            payload['d_type'] = dType;
        }

        // if (notice.value) {
        //     payload['notice'] = notice.value.value;
        // }

        if (!isEmpty(remark.value)) {
            payload['remark'] = remark.value;
        }

        return payload;
    };

    return (
        <Modal isOpen={isShowCreateEventModal} toggle={handleClose} size="lg">
            <ModalHeader toggle={handleClose}>기념일 추가</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col">
                        <WithLabel id="ename" label="대상자" type="active">
                            <MyInput
                                type="text"
                                id="ename"
                                placeholder="대상자"
                                {...name}
                            />
                        </WithLabel>
                    </div>
                    <div className="col">
                        <WithLabel label="대상자구분" type="active">
                            <div className="wr-with__container">
                                <MyRadio
                                    label="자녀"
                                    value="자녀"
                                    checked={typeWho === '자녀'}
                                    onChange={handleChangeTypeWho}
                                />
                                <MyRadio
                                    label="본인"
                                    value="본인"
                                    checked={typeWho === '본인'}
                                    onChange={handleChangeTypeWho}
                                />
                            </div>
                        </WithLabel>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col">
                        <WithLabel id="etitle" label="기념일내용" type="active">
                            <MyInput
                                type="text"
                                id="etitle"
                                placeholder="기념일내용"
                                {...title}
                            />
                        </WithLabel>
                    </div>
                    <div className="col">
                        <WithLabel
                            id="edescription"
                            label="기념일상세"
                            type="active"
                        >
                            <MyInput
                                type="text"
                                id="edescription"
                                placeholder="기념일상세"
                                {...description}
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col">
                        <DateAndSLInput
                            id="eventdate"
                            label="기념일"
                            dateHooks={eventdate}
                            type={dType}
                            setType={setDtype}
                            labelType="active"
                            size="sm"
                        />
                    </div>
                    <div className="col">
                        <WithLabel id="enotice" label="관리여부" type="active">
                            <MySelect isDisabled={false} {...notice} />
                        </WithLabel>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col">
                        <WithLabel id="eremark" label="비고" type="active">
                            <MyInput
                                type="text"
                                id="eremark"
                                placeholder="비고"
                                {...remark}
                            />
                        </WithLabel>
                    </div>
                    <div className="col"></div>
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
