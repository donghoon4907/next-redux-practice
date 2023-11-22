import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { ContractState } from '@reducers/contract';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useInput } from '@hooks/use-input';
import { FloatInput } from '@components/input/Float';
import { generateIndex } from '@utils/generate';
import {
    createInfoProduct,
    selectInfoProduct,
    updateInfoProduct,
} from '@actions/contract/set-info-product.action';
import { hideSetInfoProductModal } from '@actions/modal/set-info-product.action';

interface Props {}

export const SetInfoProductModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { infoProducts, selectedInfoProduct } = useSelector<
        AppState,
        ContractState
    >((state) => state.contract);

    const { isShowSetInfoProductModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const [key, setKey] = useInput('');

    const [val, setVal] = useInput('');

    const isCreate = selectedInfoProduct === null;

    const handleClose = () => {
        dispatch(selectInfoProduct(null));

        dispatch(hideSetInfoProductModal());
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
                    createInfoProduct({
                        index: generateIndex(infoProducts),
                        checked: false,
                        key: key.value,
                        value: val.value,
                    }),
                );
            } else {
                dispatch(
                    updateInfoProduct({
                        ...selectedInfoProduct,
                        key: key.value,
                        value: val.value,
                    }),
                );
            }

            handleClose();
        }
    };

    const handleOpened = () => {
        if (selectedInfoProduct) {
            setKey(selectedInfoProduct.key);

            setVal(selectedInfoProduct.value);
        } else {
            setKey('');

            setVal('');
        }
    };

    return (
        <Modal
            isOpen={isShowSetInfoProductModal}
            toggle={handleClose}
            onOpened={handleOpened}
        >
            <ModalHeader toggle={handleClose}>기타계약정보 설정</ModalHeader>
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
