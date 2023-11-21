import type { FC } from 'react';
import type { Custcar } from '@models/custcar';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { CustomerState } from '@reducers/customer';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useInput } from '@hooks/use-input';
import { isEmpty } from '@utils/validator/common';
import { hideCreateCustcarModal } from '@actions/modal/create-custcar.action';
import { createCustcar } from '@actions/customer/set-custcar.action';
import { generateIndex } from '@utils/generate';
import { FloatInput } from '@components/input/Float';

interface Props {}

export const CreateCustcarCustModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowCreateCustcarCustModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { custcars } = useSelector<AppState, CustomerState>(
        (state) => state.customer,
    );

    // 피담보물
    const [p_title] = useInput('');
    // 소재지번
    const [p_address] = useInput('');
    // 비고
    const [remark] = useInput('');

    const handleClose = () => {
        dispatch(hideCreateCustcarModal('cust'));
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
            p_type: 'gen',
            index: generateIndex(custcars),
            checked: false,
        };

        if (!isEmpty(p_title.value)) {
            payload['p_title'] = p_title.value;
        }

        if (!isEmpty(p_address.value)) {
            payload['p_address'] = p_address.value;
        }

        if (!isEmpty(remark.value)) {
            payload['remark'] = remark.value;
        }

        return payload;
    };

    return (
        <Modal
            isOpen={isShowCreateCustcarCustModal}
            toggle={handleClose}
            size="lg"
        >
            <ModalHeader toggle={handleClose}>피담보물건 추가</ModalHeader>
            <ModalBody className="wr-pages-detail__applydatepicker">
                <div className="row">
                    <div className="flex-fill">
                        <FloatInput label="피담보물" {...p_title} />
                    </div>
                    <div className="flex-fill">
                        <FloatInput label="소재지번" {...p_address} />
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
