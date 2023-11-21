import type { FC } from 'react';
import type { Custcar } from '@models/custcar';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { CustomerState } from '@reducers/customer';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { isEmpty } from '@utils/validator/common';
import { hideCreateCustcarModal } from '@actions/modal/create-custcar.action';
import { createCustcar } from '@actions/customer/set-custcar.action';
import { generateIndex } from '@utils/generate';
import { FloatInput } from '@components/input/Float';
import { FloatDatepicker } from '@components/datepicker/Float';

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
            <ModalBody className="wr-pages-detail__applydatepicker">
                <div className="row">
                    <div className="flex-fill">
                        <FloatInput label="차량번호" {...carnum} />
                    </div>
                    <div className="flex-fill">
                        <FloatInput label="차량정보" {...carname} />
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="flex-fill">
                        <FloatInput label="차명코드" {...carcode} />
                    </div>
                    <div className="flex-fill">
                        <FloatDatepicker label="보험만기일" hooks={bo_dateto} />
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
