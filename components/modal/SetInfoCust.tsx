import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { ContractState } from '@reducers/contract';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useInput } from '@hooks/use-input';
import { FloatInput } from '@components/input/Float';
import {
    createInfoCust,
    selectInfoCust,
    updateInfoCust,
} from '@actions/contract/common/set-info-cust.action';
import { generateIndex } from '@utils/generate';
import { hideSetInfoCustModal } from '@actions/modal/set-info-cust.action';

interface Props {}

export const SetInfoCustModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowSetInfoCustModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { infoCusts, selectedInfoCust } = useSelector<
        AppState,
        ContractState
    >((state) => state.contract);

    const [key, setKey] = useInput('');

    const [val, setVal] = useInput('');

    const isCreate = selectedInfoCust === null;

    const handleClose = () => {
        dispatch(selectInfoCust(null));

        dispatch(hideSetInfoCustModal());
    };

    const handleSubmit = () => {
        if (key.value === '') {
            return alert('라벨을 입력하세요.');
        }

        if (val.value === '') {
            return alert('데이터를 입력하세요.');
        }

        const tf = confirm(`${isCreate ? '추가' : '수정'} 하시겠습니까?`);

        if (tf) {
            if (isCreate) {
                dispatch(
                    createInfoCust({
                        index: generateIndex(infoCusts),
                        checked: false,
                        key: key.value,
                        value: val.value,
                    }),
                );
            } else {
                dispatch(
                    updateInfoCust({
                        ...selectedInfoCust,
                        key: key.value,
                        value: val.value,
                    }),
                );
            }

            handleClose();
        }
    };

    const handleOpened = () => {
        if (selectedInfoCust) {
            setKey(selectedInfoCust.key);

            setVal(selectedInfoCust.value);
        } else {
            setKey('');

            setVal('');
        }
    };

    return (
        <Modal
            isOpen={isShowSetInfoCustModal}
            toggle={handleClose}
            onOpened={handleOpened}
        >
            <ModalHeader toggle={handleClose}>관리정보 설정</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="flex-fill">
                        <FloatInput label="라벨" {...key} />
                    </div>
                    <div className="flex-fill">
                        <FloatInput label="데이터" {...val} />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    {isCreate ? '추가' : '수정'}
                </Button>
            </ModalFooter>
        </Modal>
    );
};
