import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { CoreSetState } from '@interfaces/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MyButton } from '@components/button';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import { useSelect } from '@hooks/use-select';
import carConstants from '@constants/options/car';
import { hideSetPeriodModal } from '@actions/modal/set-period.action';

interface Props {
    setPeriod: CoreSetState<string>;
}

export const SetPeriodModal: FC<Props> = ({ setPeriod }) => {
    const dispatch = useDispatch();

    const { isShowSetPeriodModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const [isShort, setIsShort] = useState(false);

    // 단기구분
    const [sDist] = useSelect(carConstants.shortDist);

    const handleClickDist = (isShort: boolean) => {
        setIsShort(isShort);
    };

    const handleClose = () => {
        dispatch(hideSetPeriodModal());
    };

    const handleSubmit = () => {
        const tf = confirm('설정한 보험기간을 적용하시겠습니까?');

        if (tf) {
            if (isShort) {
                setPeriod(sDist.value!.value);
            } else {
                setPeriod('1년');
            }

            handleClose();
        }
    };

    return (
        <Modal isOpen={isShowSetPeriodModal} toggle={handleClose}>
            <ModalHeader toggle={handleClose}>보험기간 설정</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-6">
                        <MyButton
                            className={
                                isShort ? 'btn-secondary' : 'btn-primary'
                            }
                            onClick={() => handleClickDist(false)}
                            style={{ width: '100%' }}
                        >
                            1년
                        </MyButton>
                    </div>
                    <div className="col-6">
                        <MyButton
                            className={
                                isShort ? 'btn-primary' : 'btn-secondary'
                            }
                            onClick={() => handleClickDist(true)}
                            style={{ width: '100%' }}
                        >
                            단기
                        </MyButton>
                    </div>
                </div>
                {isShort && (
                    <div className="row wr-mt">
                        <div className="col">
                            <WithLabel
                                id="periodDist"
                                label="단기구분"
                                type="active"
                            >
                                <MySelect
                                    inputId="periodDist"
                                    
                                    {...sDist}
                                />
                            </WithLabel>
                        </div>
                    </div>
                )}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    적용
                </Button>
            </ModalFooter>
        </Modal>
    );
};
