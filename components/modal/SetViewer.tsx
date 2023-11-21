import type { FC, ChangeEvent } from 'react';
import type { User } from '@models/user';
import type { CoreSelectOption } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { BoardState } from '@reducers/board';
import type { OrgaState } from '@reducers/orga';
import type { UserState } from '@reducers/user';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import { hideSetViewerModal } from '@actions/modal/set-viewer.action';
import { IconWrapper } from '@components/IconWrapper';
import { MyCheckbox } from '@components/checkbox';
import { useApi } from '@hooks/use-api';
import { getUsersRequest } from '@actions/hr/user/get-users.action';
import { updateViewer } from '@actions/board/set-viewer.action';

function removeDuplicate(
    defaultArr: User[],
    targetArr: User[],
    conditionArr: User[],
) {
    const output = defaultArr;
    for (let i = 0; i < targetArr.length; i++) {
        let isTarget = false;
        for (let j = 0; j < conditionArr.length; j++) {
            if (targetArr[i].userid === conditionArr[j].userid) {
                isTarget = true;
                break;
            }
        }

        if (!isTarget) {
            output.push(targetArr[i]);
        }
    }

    return output;
}

interface Props {}

export const SetViewerModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const getUsers = useApi(getUsersRequest);

    const { isShowSetViewerModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { orgas } = useSelector<AppState, OrgaState>((state) => state.orga);

    const { users } = useSelector<AppState, UserState>((state) => state.hr);

    const { viewer } = useSelector<AppState, BoardState>(
        (state) => state.board,
    );

    // 선택한 부서 소속 사용자
    const [checkedFcs, setCheckedFcs] = useState<User[]>([]);
    // 선택된 사용자 목록
    const [selectedFcs, setSelectedFcs] = useState<User[]>([]);
    // 선택한 선택된 사용자 목록
    const [checkedSelectedFcs, setCheckedSelectedFcs] = useState<User[]>([]);

    const [depart, setDepart] = useState<CoreSelectOption | null>(null);

    const handleChangeFc = (evt: ChangeEvent<HTMLInputElement>) => {
        const { checked, value, dataset } = evt.target;

        if (checked) {
            setCheckedFcs([
                ...checkedFcs,
                { userid: value, name: dataset.label! },
            ]);
        } else {
            setCheckedFcs(checkedFcs.filter(({ userid }) => userid !== value));
        }
    };

    const handleChangeSelectedFc = (evt: ChangeEvent<HTMLInputElement>) => {
        const { checked, value, dataset } = evt.target;

        if (checked) {
            setCheckedSelectedFcs([
                ...checkedSelectedFcs,
                { userid: value, name: dataset.label! },
            ]);
        } else {
            setCheckedSelectedFcs(
                checkedSelectedFcs.filter(({ userid }) => userid !== value),
            );
        }
    };

    const handleClose = () => {
        dispatch(hideSetViewerModal());
    };

    const handleChangeDepart = (depart: CoreSelectOption | null) => {
        setDepart(depart);

        if (depart) {
            getUsers({ idx: depart.value });

            handleClearCheckedFcs();
        }
    };

    const handleAddCheckedFcs = () => {
        if (checkedFcs.length === 0) {
            return alert('목록에 추가할 사용자를 선택하세요.');
        }

        const next = removeDuplicate([...selectedFcs], checkedFcs, selectedFcs);

        setSelectedFcs(next);

        handleClearCheckedFcs();
    };

    const handleRemoveCheckedSelectedFc = () => {
        if (checkedSelectedFcs.length === 0) {
            return alert('목록에서 제거할 사용자를 선택하세요.');
        }

        const next = removeDuplicate([], selectedFcs, checkedSelectedFcs);

        setSelectedFcs(next);

        handleClearCheckedSelectedFcs();
    };

    const handleClearCheckedFcs = () => {
        setCheckedFcs([]);
    };

    const handleClearCheckedSelectedFcs = () => {
        setCheckedSelectedFcs([]);
    };

    const handleSubmit = () => {
        const tf = confirm('선택한 사용자를 조회대상으로 지정하시겠습니까?');

        if (tf) {
            dispatch(updateViewer(selectedFcs));

            handleClose();
        }
    };

    useEffect(() => {
        setDepart(orgas[0]);
    }, [orgas]);

    useEffect(() => {
        setSelectedFcs(viewer);
    }, [viewer]);

    return (
        <Modal isOpen={isShowSetViewerModal} toggle={handleClose} size="lg">
            <ModalHeader toggle={handleClose}>조회 대상 지정</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col">
                        <WithLabel id="depart" label="부서" type="active">
                            <MySelect
                                id="depart"
                                options={orgas}
                                value={depart}
                                onChange={handleChangeDepart}
                                placeholder={'선택'}
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="wr-select-user__wrap wr-mt">
                    <div className="wr-select-user__unselect">
                        <div className="wr-select-user__title">
                            부서 소속 사용자
                        </div>
                        <ul className="wr-select-user__list">
                            {users.map((v, i) => (
                                <li
                                    key={`fc${i}`}
                                    className="wr-select-user__listitem"
                                >
                                    <MyCheckbox
                                        id={`fc${v.value}`}
                                        label={v.label}
                                        onChange={handleChangeFc}
                                        checked={checkedFcs.some(
                                            ({ userid }) => userid === v.value,
                                        )}
                                        value={v.value}
                                        data-label={v.label}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="wr-select-user__divider">
                        <IconWrapper onClick={handleAddCheckedFcs}>
                            <FaArrowRight size={20} />
                        </IconWrapper>
                        <IconWrapper onClick={handleRemoveCheckedSelectedFc}>
                            <FaArrowLeft size={20} />
                        </IconWrapper>
                    </div>
                    <div className="wr-select-user__selected">
                        <div className="wr-select-user__title">
                            선택된 사용자
                        </div>
                        <ul className="wr-select-user__list">
                            {selectedFcs.map((v, i) => (
                                <li
                                    key={`selectedFc${i}`}
                                    className="wr-select-user__listitem"
                                >
                                    <MyCheckbox
                                        id={`selectedFc${v.userid}`}
                                        label={v.name}
                                        onChange={handleChangeSelectedFc}
                                        checked={checkedSelectedFcs.some(
                                            ({ userid }) => userid === v.userid,
                                        )}
                                        value={v.userid}
                                        data-label={v.name}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* <div className="wr-select-user__toolbar wr-mt">
                    <div></div>
                    <div>
                        <MyButton type="button" className="btn-danger">
                            선택된 사용자 제거
                        </MyButton>
                    </div>
                </div> */}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    적용
                </Button>
            </ModalFooter>
        </Modal>
    );
};
