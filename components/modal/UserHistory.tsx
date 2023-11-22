import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { CommonState } from '@reducers/common';
import type { OrgaState } from '@reducers/orga';
import type { UserState } from '@reducers/user';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { hideUserHistoryModal } from '@actions/modal/user-history.action';
import { useSelect } from '@hooks/use-select';
import { getUsersRequest } from '@actions/user/get-users.action';
import { useInput } from '@hooks/use-input';
import { insertUserHistory } from '@actions/common/set-user-history.action';
import { generateIndex } from '@utils/generate';
import { FloatSelect } from '@components/select/Float';
import { FloatInput } from '@components/input/Float';

interface Props {
    type: 'customer' | 'contract';
}

export const UserHistoryModal: FC<Props> = ({ type }) => {
    const dispatch = useDispatch();

    const { isShowUserHistoryModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { orgas } = useSelector<AppState, OrgaState>((state) => state.orga);

    const { users, loggedInUser } = useSelector<AppState, UserState>(
        (state) => state.user,
    );

    const { userHistories } = useSelector<AppState, CommonState>(
        (state) => state.common,
    );
    // 소속
    const [depart] = useSelect(orgas, null);
    // 소속 내 담당자
    const [user] = useSelect(users, null);
    // 비고
    const [remark] = useInput('');
    // 사용인 코드
    // const [code] = useInput('');

    const handleClose = () => {
        dispatch(hideUserHistoryModal());
    };

    const handleSubmit = () => {
        if (!depart.value) {
            return alert('소속을 선택하세요.');
        }

        if (!user.value) {
            return alert('담당자를 선택하세요.');
        }

        const tf = confirm('담당자를 변경하시겠습니까?');

        if (tf) {
            dispatch(
                insertUserHistory({
                    index: generateIndex(userHistories),
                    checked: false,
                    userid: user.value?.value,
                    department: depart.value!.label,
                    username: user.value?.label,
                    insert_userid: loggedInUser.userid,
                    remark: remark.value,
                }),
            );

            handleClose();
        }
    };

    useEffect(() => {
        if (depart.value) {
            dispatch(getUsersRequest({ idx: depart.value?.value }));
        }
    }, [depart.value]);

    return (
        <Modal isOpen={isShowUserHistoryModal} toggle={handleClose} size="lg">
            <ModalHeader toggle={handleClose}>담당자 변경</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="flex-fill">
                        <FloatSelect label="소속" {...depart} />
                    </div>
                    <div className="flex-fill">
                        <FloatSelect label="담당자" {...user} />
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="flex-fill">
                        {type === 'customer' && (
                            <FloatInput label="비고" {...remark} />
                        )}
                    </div>
                    <div className="flex-fill"></div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    변경
                </Button>
            </ModalFooter>
        </Modal>
    );
};
