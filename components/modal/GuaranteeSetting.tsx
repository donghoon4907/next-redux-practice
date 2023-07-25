import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from 'rsuite';
import dayjs from 'dayjs';
import addMonths from 'date-fns/addMonths';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import { useSelect } from '@hooks/use-select';
import { hideGuaranteeSettingModal } from '@actions/modal/guarantee-setting.action';
import { MyInput } from '@components/input';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { HrState } from '@reducers/hr';
import {
    C_STANDARD,
    GUARANTEE_DIVISION,
    GUARANTEE_STATUS,
} from '@constants/options/user';

import {
    CreateGuaranteePayload,
    createGuarantee,
} from '@actions/hr/set-guarantee.action';
import { isEmpty } from '@utils/validator/common';

interface Props {}

export const GuaranteeSettingModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowGuaranteeSettingModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { agencies } = useSelector<AppState, HrState>((state) => state.hr);
    // 보증구분
    const [kind] = useSelect(GUARANTEE_DIVISION);
    // 보증금
    const [gMoney] = useNumbericInput('', { addComma: true });
    // 보증내용
    const [remark] = useInput('');
    // 보증시기
    const [sdate] = useDatepicker(new Date());
    // 보증만기
    const [edate] = useDatepicker(addMonths(new Date(), 24));
    // 갱신만기
    const [redate] = useDatepicker(addMonths(new Date(), 12));
    // 금융기관
    const [agencyCom] = useSelect(agencies);
    // 적립목표(only 적립금)
    const [accGoal] = useNumbericInput('', { addComma: true });
    // 상태(only 적립금)
    const [accStatus] = useSelect(GUARANTEE_STATUS);
    // 산출기준(only 적립금)
    const [accType] = useSelect(C_STANDARD);
    // 적립율(only 적립금)
    const [accRate] = useNumbericInput('');

    const handleClose = () => {
        dispatch(hideGuaranteeSettingModal());
    };

    const handleSubmit = () => {
        const tf = confirm('입력한 내용대로 설정하시겠습니까?');
        if (tf) {
            const payload = createPayload();

            dispatch(createGuarantee(payload));

            handleClose();
        }
    };

    const createPayload = () => {
        const payload: CreateGuaranteePayload = {
            kind: kind.value!.label,
            g_money: +gMoney.value.replace(/,/g, ''),
        };

        if (kind.value) {
            if (kind.value.value === '적립금') {
                if (!isEmpty(accGoal.value)) {
                    payload['accumulate_goal'] = +accGoal.value.replace(
                        /,/g,
                        '',
                    );
                }

                if (accStatus.value) {
                    payload['accumulate_status'] = accStatus.value?.value;
                }

                if (accType.value) {
                    payload['accumulate_type'] = parseInt(accType.value?.value);
                }

                if (!isEmpty(accRate.value)) {
                    payload['accumulate_rate'] = +accRate.value.replace(
                        /,/g,
                        '',
                    );
                }
            } else {
                if (!isEmpty(remark.value)) {
                    payload['remark'] = remark.value;
                }

                if (agencyCom.value) {
                    payload['agency_com'] = agencyCom.value.label;
                }

                payload['sdate'] = dayjs(sdate.value).format('YYYY-MM-DD');

                payload['edate'] = dayjs(edate.value).format('YYYY-MM-DD');

                payload['redate'] = dayjs(redate.value).format('YYYY-MM-DD');
            }
        }

        return payload;
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
                        <WithLabel id="gKind" label="보증구분" type="active">
                            <MySelect
                                inputId="gKind"
                                placeholder="선택"
                                placeHolderFontSize={16}
                                {...kind}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel id="gMoney" label="보증금" type="active">
                                <MyInput
                                    id="gMoney"
                                    placeholder="보증금"
                                    {...gMoney}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                {kind.value?.label === '적립금' ? (
                    <>
                        <div className="row wr-mt">
                            <div className="col-6">
                                <WithLabel
                                    id="accGoal"
                                    label="적립목표"
                                    type="active"
                                >
                                    <MyInput
                                        id="accGoal"
                                        placeholder="적립목표"
                                        {...accGoal}
                                    />
                                </WithLabel>
                            </div>
                            <div className="col-6">
                                <div className="wr-ml">
                                    <WithLabel
                                        id="accStatus"
                                        label="상태"
                                        type="active"
                                    >
                                        <MySelect
                                            inputId="accStatus"
                                            placeholder="상태"
                                            placeHolderFontSize={16}
                                            {...accStatus}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="col-6">
                                <WithLabel
                                    id="accType"
                                    label="산출기준"
                                    type="active"
                                >
                                    <MySelect
                                        inputId="accType"
                                        placeholder="산출기준"
                                        placeHolderFontSize={16}
                                        {...accType}
                                    />
                                </WithLabel>
                            </div>
                            <div className="col-6">
                                <div className="wr-ml">
                                    <WithLabel
                                        id="accRate"
                                        label="적립율"
                                        type="active"
                                    >
                                        <MyInput
                                            id="accRate"
                                            placeholder="적립율"
                                            className="text-end"
                                            unit="%"
                                            {...accRate}
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
                                    id="gRemark"
                                    label="보증내용"
                                    type="active"
                                >
                                    <MyInput
                                        id="gRemark"
                                        placeholder="계약번호 또는 상세"
                                        {...remark}
                                    />
                                </WithLabel>
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="col-6">
                                <WithLabel
                                    id="sdate"
                                    label="보증시기"
                                    type="active"
                                >
                                    <DatePicker
                                        id="sdate"
                                        oneTap
                                        format="yyyy-MM-dd"
                                        style={{ width: '100%' }}
                                        size="sm"
                                        placeholder="보증시기"
                                        {...sdate}
                                    />
                                </WithLabel>
                            </div>
                            <div className="col-6">
                                <div className="wr-ml">
                                    <WithLabel
                                        id="edate"
                                        label="보증만기"
                                        type="active"
                                    >
                                        <DatePicker
                                            id="edate"
                                            oneTap
                                            format="yyyy-MM-dd"
                                            style={{ width: '100%' }}
                                            size="sm"
                                            placeholder="보증만기"
                                            {...edate}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="col-6">
                                <WithLabel
                                    id="redate"
                                    label="갱신만기"
                                    type="active"
                                >
                                    <DatePicker
                                        id="redate"
                                        oneTap
                                        format="yyyy-MM-dd"
                                        style={{ width: '100%' }}
                                        size="sm"
                                        placeholder="갱신만기"
                                        {...redate}
                                    />
                                </WithLabel>
                            </div>
                            <div className="col-6">
                                <div className="wr-ml">
                                    <WithLabel
                                        id="agencyCom"
                                        label="금융기관"
                                        type="active"
                                    >
                                        <MySelect
                                            inputId="agencyCom"
                                            placeholder="금융기관"
                                            placeHolderFontSize={16}
                                            {...agencyCom}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row wr-mt">
                            <div className="col">
                                <WithLabel id="gEtc" label="기타" type="active">
                                    <MyInput id="gEtc" placeholder="기타" />
                                </WithLabel>
                            </div>
                        </div> */}
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
