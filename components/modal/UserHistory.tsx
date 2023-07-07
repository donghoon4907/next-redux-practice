import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { LongState } from '@reducers/long';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MyTable } from '@components/table';
import { hideUserHistoryModal } from '@actions/modal/user-history.action';
import { useColumn } from '@hooks/use-column';
import { LONG_USER_HISTORY } from '@constants/column';

interface Props {}

export const UserHistoryModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowUserHistoryModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { long } = useSelector<AppState, LongState>((state) => state.long);

    const columns = useColumn(LONG_USER_HISTORY);

    const handleClose = () => {
        dispatch(hideUserHistoryModal());
    };

    return (
        <Modal isOpen={isShowUserHistoryModal} toggle={handleClose}>
            <ModalHeader toggle={handleClose}>담당변경이력</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col">
                        <MyTable columns={columns} data={long.user_his} />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    닫기
                </Button>
            </ModalFooter>
        </Modal>
    );
};
