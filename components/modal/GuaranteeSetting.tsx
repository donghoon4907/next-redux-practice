import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import { useSelect } from '@hooks/use-select';
import { hideGuaranteeSettingModal } from '@actions/modal/guarantee-setting.action';
import { MyInput } from '@components/input';
import {
    C_STANDARD,
    GUARANTEE_DIVISION,
    GUARANTEE_STATUS,
} from '@constants/options/user';

interface Props {}

export const GuaranteeSettingModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowGuaranteeSettingModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const [division] = useSelect(GUARANTEE_DIVISION);

    const [status] = useSelect(GUARANTEE_STATUS);

    const [cStandard] = useSelect(C_STANDARD);

    const handleClose = () => {
        dispatch(hideGuaranteeSettingModal());
    };

    const handleSubmit = () => {
        const tf = confirm('입력한 내용대로 설정하시겠습니까?');
        if (tf) {
            handleClose();
        }
    };

    return (
        <Modal
            isOpen={isShowGuaranteeSettingModal}
            toggle={handleClose}
            size="lg"
        >
            <ModalHeader toggle={handleClose}>보증설정 내역 설정</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-6">
                        <WithLabel
                            id="gDivision"
                            label="보증구분"
                            type="active"
                        >
                            <MySelect
                                inputId="gDivision"
                                placeholder="선택"
                                placeHolderFontSize={16}
                                {...division}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel
                                id="deposit"
                                label="보증금"
                                type="active"
                            >
                                <MyInput
                                    id="deposit"
                                    placeholder="보증금"
                                    value="5,000,000"
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                {division.value?.label === '적립금' ? (
                    <>
                        <div className="row wr-mt">
                            <div className="col-6">
                                <WithLabel
                                    id="aGoal"
                                    label="적립목표"
                                    type="active"
                                >
                                    <MyInput
                                        id="aGoal"
                                        placeholder="적립목표"
                                        value=""
                                    />
                                </WithLabel>
                            </div>
                            <div className="col-6">
                                <div className="wr-ml">
                                    <WithLabel
                                        id="gStatus"
                                        label="상태"
                                        type="active"
                                    >
                                        <MySelect
                                            inputId="gStatus"
                                            placeholder="상태"
                                            placeHolderFontSize={16}
                                            {...status}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="col-6">
                                <WithLabel
                                    id="cStandard"
                                    label="산출기준"
                                    type="active"
                                >
                                    <MySelect
                                        inputId="cStandard"
                                        placeholder="산출기준"
                                        placeHolderFontSize={16}
                                        {...cStandard}
                                    />
                                </WithLabel>
                            </div>
                            <div className="col-6">
                                <div className="wr-ml">
                                    <WithLabel
                                        id="aRate"
                                        label="적립율"
                                        type="active"
                                    >
                                        <MyInput
                                            id="aRate"
                                            placeholder="적립율"
                                            value="5"
                                            className="text-end"
                                            unit="%"
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="row wr-mt">
                            <div className="col">
                                <WithLabel
                                    id="gContent"
                                    label="보증내용"
                                    type="active"
                                >
                                    <MyInput
                                        id="gContent"
                                        placeholder="계약번호 또는 상세"
                                    />
                                </WithLabel>
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="col-6">
                                <WithLabel
                                    id="gWhen"
                                    label="보증시기"
                                    type="active"
                                >
                                    <MyInput
                                        id="gWhen"
                                        placeholder="보증시기"
                                        value="2023-01-01"
                                    />
                                </WithLabel>
                            </div>
                            <div className="col-6">
                                <div className="wr-ml">
                                    <WithLabel
                                        id="gDue"
                                        label="보증만기"
                                        type="active"
                                    >
                                        <MyInput
                                            id="gDue"
                                            placeholder="보증만기"
                                            value="2024-12-31"
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="col-6">
                                <WithLabel
                                    id="uDue"
                                    label="갱신만기"
                                    type="active"
                                >
                                    <MyInput
                                        id="uDue"
                                        placeholder="갱신만기"
                                        value="보증시기 + 1년"
                                    />
                                </WithLabel>
                            </div>
                            <div className="col-6">
                                <div className="wr-ml">
                                    <WithLabel
                                        id="fi"
                                        label="금융기관"
                                        type="active"
                                    >
                                        <MySelect
                                            inputId="fi"
                                            placeholder="금융기관"
                                            placeHolderFontSize={16}
                                            value={null}
                                            onChange={() => {}}
                                            options={[]}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="col">
                                <WithLabel id="gEtc" label="기타" type="active">
                                    <MyInput id="gEtc" placeholder="기타" />
                                </WithLabel>
                            </div>
                        </div>
                    </>
                )}
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
