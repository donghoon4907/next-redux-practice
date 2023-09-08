import type { FC, ChangeEvent } from 'react';
import type { Family } from '@models/family';
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
import { createFamily } from '@actions/customer/set-family.action';
import { hideCreateFamilyModal } from '@actions/modal/create-family.action';

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
    const [type, setType] = useState('가족');
    // 관계
    const [relation] = useInput('', { noSpace: true });
    // 생년월일
    const [birthday] = useDatepicker(null);
    const [bType, setBtype] = useState(true);
    // 성별
    const [sex, setSex] = useState('M');
    // 비고
    const [remark] = useInput('');

    const handleChangeType = (evt: ChangeEvent<HTMLInputElement>) => {
        setType(evt.target.value);
    };

    const handleChangeSex = (evt: ChangeEvent<HTMLInputElement>) => {
        setSex(evt.target.value);
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
            type,
            index: generateIndex(family),
            checked: false,
            sex,
        };

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
            <ModalBody>
                <div className="row">
                    <div className="col">
                        <WithLabel id="fname" label="이름" type="active">
                            <MyInput
                                type="text"
                                id="fname"
                                placeholder="이름"
                                {...name}
                            />
                        </WithLabel>
                    </div>
                    <div className="col">
                        <WithLabel label="구분" type="active">
                            <div className="wr-with__container">
                                <MyRadio
                                    label="가족"
                                    value="가족"
                                    checked={type === '가족'}
                                    onChange={handleChangeType}
                                />
                                <MyRadio
                                    label="지인"
                                    value="지인"
                                    checked={type === '지인'}
                                    onChange={handleChangeType}
                                />
                            </div>
                        </WithLabel>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col">
                        <WithLabel id="frelation" label="관계" type="active">
                            <MyInput
                                type="text"
                                id="frelation"
                                placeholder="관계"
                                {...relation}
                            />
                        </WithLabel>
                    </div>
                    <div className="col">
                        <DateAndSLInput
                            id="fbirthday"
                            label="생년월일"
                            dateHooks={birthday}
                            type={bType}
                            setType={setBtype}
                            labelType="active"
                            size="sm"
                        />
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col">
                        <WithLabel label="성별" type="active">
                            <div className="wr-with__container">
                                <MyRadio
                                    label="남"
                                    value="M"
                                    checked={sex === 'M'}
                                    onChange={handleChangeSex}
                                />
                                <MyRadio
                                    label="여"
                                    value="F"
                                    checked={sex === 'F'}
                                    onChange={handleChangeSex}
                                />
                            </div>
                        </WithLabel>
                    </div>
                    <div className="col">
                        <WithLabel id="fremark" label="비고" type="active">
                            <MyInput
                                type="text"
                                id="fremark"
                                placeholder="비고"
                                {...remark}
                            />
                        </WithLabel>
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
