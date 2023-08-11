import type { FC } from 'react';
import type { Custcar } from '@models/custcar';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { CustomerState } from '@reducers/customer';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { useInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { MyDatepicker } from '@components/datepicker';
import { isEmpty } from '@utils/validator/common';
import { hideCreateCustcarModal } from '@actions/modal/create-custcar.action';
import { createCustcar } from '@actions/customer/set-custcar.action';
import { generateIndex } from '@utils/generate';

interface Props {}

export const CreateCustcarCarModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowCreateCustcarCarModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { custcars } = useSelector<AppState, CustomerState>(
        (state) => state.customer,
    );

    // 차량번호
    const [carnum] = useInput('', { noSpace: true });
    // 차량정보
    const [carname] = useInput('');
    // 차명코드
    const [carcode] = useInput('', { noSpace: true });
    // 보험만기일
    const [bo_dateto] = useDatepicker(null);
    // 비고
    const [remark] = useInput('');

    const handleClose = () => {
        dispatch(hideCreateCustcarModal('car'));
    };

    const handleSubmit = () => {
        const tf = confirm('입력한 내용대로 설정하시겠습니까?');
        if (tf) {
            const payload = createPayload();

            dispatch(createCustcar(payload));

            handleClose();
        }
    };

    const createPayload = () => {
        const payload: Custcar = {
            p_type: 'car',
            index: generateIndex(custcars),
            checked: false,
        };

        if (!isEmpty(carnum.value)) {
            payload['carnum'] = carnum.value;
        }

        if (!isEmpty(carname.value)) {
            payload['carname'] = carname.value;
        }

        if (!isEmpty(carcode.value)) {
            payload['carcode'] = carcode.value;
        }

        if (!isEmpty(bo_dateto.value)) {
            payload['bo_dateto'] = dayjs(bo_dateto.value).format('YYYY-MM-DD');
        }

        if (!isEmpty(remark.value)) {
            payload['remark'] = remark.value;
        }

        return payload;
    };

    return (
        <Modal
            isOpen={isShowCreateCustcarCarModal}
            toggle={handleClose}
            size="lg"
        >
            <ModalHeader toggle={handleClose}>보유차량 추가</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-6">
                        <WithLabel id="carNum" label="차량번호" type="active">
                            <MyInput
                                type="text"
                                id="carNum"
                                placeholder="서울00가0000"
                                {...carnum}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel
                                id="carname"
                                label="차량정보"
                                type="active"
                            >
                                <MyInput
                                    type="text"
                                    id="carname"
                                    placeholder="차량정보"
                                    {...carname}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col-6">
                        <WithLabel id="carcode" label="차명코드" type="active">
                            <MyInput
                                type="text"
                                id="carcode"
                                placeholder="차명코드"
                                {...carcode}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel
                                id="bo_dateto"
                                label="보험만기일"
                                type="active"
                            >
                                <MyDatepicker
                                    id="bo_dateto"
                                    size="sm"
                                    placeholder="보험만기일"
                                    hooks={bo_dateto}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col-6">
                        <WithLabel id="remark" label="비고" type="active">
                            <MyInput
                                type="text"
                                id="remark"
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
