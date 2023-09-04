import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { hideCreateEtcModal } from '@actions/modal/create-etc.action';
import { WithInput } from '@components/WithInput';
import { MyInput } from '@components/input';
import { useInput } from '@hooks/use-input';
import { updateLongEtcRequest } from '@actions/contract/long/set-long-etc.action';

interface Props {}

export const CreateEtcModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowCreateEtcModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const [field] = useInput('');

    const [content] = useInput('');

    const handleClose = () => {
        dispatch(hideCreateEtcModal());
    };

    const handleSubmit = () => {
        if (field.value === '') {
            return alert('항목 이름을 입력하세요.');
        }

        if (content.value === '') {
            return alert('항목 내용을 입력하세요.');
        }

        const tf = confirm('기타항목을 추가하시겠습니까?');

        if (tf) {
            dispatch(
                updateLongEtcRequest({
                    field: field.value,
                    content: content.value,
                }),
            );

            handleClose();
        }
    };

    return (
        <Modal isOpen={isShowCreateEtcModal} toggle={handleClose}>
            <ModalHeader toggle={handleClose}>기타항목추가</ModalHeader>
            <ModalBody>
                <div className="row wr-pages-long-detail">
                    <div className="col">
                        <WithInput
                            type="active"
                            placeholder="항목 이름"
                            {...field}
                        >
                            <MyInput
                                type="text"
                                placeholder="항목 내용"
                                {...content}
                            />
                        </WithInput>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    추가
                </Button>
            </ModalFooter>
        </Modal>
    );
};
