import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { hideUserHistoryModal } from '@actions/modal/user-history.action';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import { HrState } from '@reducers/hr';
import { useSelect } from '@hooks/use-select';
import { getUsersRequest } from '@actions/hr/get-users';
import { MyInput } from '@components/input';
import { useInput } from '@hooks/use-input';
import { insertUserHistory } from '@actions/common/set-user-history.action';

interface Props {}

export const UserHistoryModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowUserHistoryModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { orgas, users, loggedInUser } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );
    // 부서
    const [depart] = useSelect(orgas);
    // 부서 내 영업가족
    const [user] = useSelect(users, null);
    // 비고
    const [remark] = useInput('');

    const handleClose = () => {
        dispatch(hideUserHistoryModal());
    };

    const handleSubmit = () => {
        if (!user.value) {
            return alert('영업가족을 선택하세요.');
        }

        const tf = confirm('담당자를 변경하시겠습니까?');

        if (tf) {
            dispatch(
                insertUserHistory({
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
    }, [dispatch, depart.value]);

    return (
        <Modal isOpen={isShowUserHistoryModal} toggle={handleClose} size="lg">
            <ModalHeader toggle={handleClose}>담당자 변경</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-6">
                        <WithLabel id="mDepartment" label="부서" type="active">
                            <MySelect
                                inputId="mDepartment"
                                placeholder="선택"
                                placeHolderFontSize={16}
                                {...depart}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel
                                id="mUser"
                                label="영업가족"
                                type="active"
                            >
                                <MySelect
                                    inputId="mUser"
                                    placeholder="선택"
                                    placeHolderFontSize={16}
                                    {...user}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col">
                        <WithLabel id="mRemark" label="비고" type="active">
                            <MyInput
                                id="mRemark"
                                placeholder="비고"
                                {...remark}
                            />
                        </WithLabel>
                    </div>
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
