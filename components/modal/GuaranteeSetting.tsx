import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import addMonths from 'date-fns/addMonths';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelect } from '@hooks/use-select';
import { hideGuaranteeSettingModal } from '@actions/modal/guarantee-setting.action';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { HrState } from '@reducers/hr';
import { isEmpty } from '@utils/validator/common';
import userConstants from '@constants/options/user';
import {
    CreateGuaranteePayload,
    createGuarantee,
} from '@actions/hr/common/set-guarantee.action';
import { generateIndex } from '@utils/generate';
import { FloatSelect } from '@components/select/Float';
import { FloatInput } from '@components/input/Float';
import { MyUnit } from '@components/Unit';
import { FloatDatepicker } from '@components/datepicker/Float';

interface Props {}

export const GuaranteeSettingModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowGuaranteeSettingModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { agencies, guarantees } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );
    // 보증구분
    const [kind] = useSelect(userConstants.gDivision);
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
    const [accStatus] = useSelect(userConstants.gStatus);
    // 산출기준(only 적립금)
    const [accType] = useSelect(userConstants.calcStandard2);
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
            index: generateIndex(guarantees),
            kind: kind.value!.label,
            checked: false,
            available: false,
        };

        if (!isEmpty(gMoney.value)) {
            payload['g_money'] = +gMoney.value.replace(/,/g, '');
        }

        if (kind.value) {
            if (kind.value.label === '적립금') {
                if (!isEmpty(accGoal.value)) {
                    payload['accumulate_goal'] = +accGoal.value.replace(
                        /,/g,
                        '',
                    );
                }

                if (accStatus.value) {
                    payload['accumulate_status'] = accStatus.value.label;
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
            <ModalHeader toggle={handleClose}>보증설정</ModalHeader>
            <ModalBody className="wr-pages-detail__applydatepicker">
                <div className="row">
                    <div className="flex-fill">
                        <FloatSelect label="보증구분" {...kind} />
                    </div>
                    <div className="flex-fill">
                        <FloatInput label="예금주" {...gMoney} />
                    </div>
                </div>
                {kind.value?.label === '적립금' ? (
                    <>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="적립목표"
                                    isNumber
                                    {...accGoal}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatSelect label="상태" {...accStatus} />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatSelect label="산출기준" {...accType} />
                            </div>
                            <div className="flex-fill">
                                <FloatInput
                                    label="적립율"
                                    isNumber
                                    {...accRate}
                                    after={<MyUnit placement="last">%</MyUnit>}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatInput
                                    label="보증내용"
                                    isNumber
                                    {...remark}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatDatepicker
                                    label="보증시기"
                                    hooks={sdate}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatDatepicker
                                    label="보증만기"
                                    hooks={edate}
                                />
                            </div>
                        </div>
                        <div className="row wr-mt">
                            <div className="flex-fill">
                                <FloatDatepicker
                                    label="갱신만기"
                                    hooks={redate}
                                />
                            </div>
                            <div className="flex-fill">
                                <FloatSelect label="금융기관" {...agencyCom} />
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
