import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { LongState } from '@reducers/long';
import type { CreatePayPayload } from '@actions/long/set-pay.action';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { useNumbericInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { isEmpty } from '@utils/validator/common';
import { generateIndex } from '@utils/generate';
import { useSelect } from '@hooks/use-select';
import { MySelect } from '@components/select';
import { MyDatepicker } from '@components/datepicker';
import { hideCreatePayModal } from '@actions/modal/create-pay.action';
import { createPay } from '@actions/long/set-pay.action';
import longConstants from '@constants/options/long';
import { findSelectOption } from '@utils/getter';
import { setMonth } from 'date-fns';

interface Props {
    /**
     * 계약일자
     */
    contdate: Date | null;
    /**
     * 실적보험료
     */
    payment: string;
}

export const CreatePayModal: FC<Props> = ({ contdate, payment }) => {
    const dispatch = useDispatch();

    const { isShowCreatePayModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { pays } = useSelector<AppState, LongState>((state) => state.long);

    // 영수일
    const [paydate, setPaydate] = useDatepicker(null);
    // 회차
    const [whoi, setWhoi] = useNumbericInput('');
    // 납입구분
    const [dist, setDist] = useSelect(
        longConstants.pDist.filter((v) => {
            if (pays.length !== 0 && v.value === '신규') {
                return null;
            }

            return v;
        }),
        null,
        {
            callbackOnChange: (next) => {
                if (next) {
                    if (next.value === '철회' || next.value === '취소') {
                        setWhoi('1');

                        if (!pay.value.includes('-')) {
                            setPay((prev) => `-${prev}`);
                        }
                    } else {
                        setPay((prev) => prev.replace(/\-/g, ''));

                        if (next.value === '추징' || next.value === '환급') {
                            setWhoi('');
                        }
                    }
                }
            },
        },
    );
    // 수금실적
    const [pay, setPay] = useNumbericInput('', { addComma: true });
    // 금종
    const [paykind] = useSelect(longConstants.payKind);
    // 납입주기
    const [cycle, setCycle] = useSelect(longConstants.payCycle);

    const isDisableWhoi =
        pays.length === 0 ||
        dist.value?.value === '철회' ||
        dist.value?.value === '취소' ||
        dist.value?.value === '추징' ||
        dist.value?.value === '환급';

    const isDisablePayment =
        dist.value?.value === '철회' || dist.value?.value === '취소';

    const handleClose = () => {
        dispatch(hideCreatePayModal());
    };

    const handleSubmit = () => {
        if (!paydate.value) {
            return alert('영수일을 입력하세요.');
        }

        if (isEmpty(whoi.value)) {
            return alert('회차를 입력하세요.');
        }

        if (!dist.value) {
            return alert('납입구분을 선택하세요.');
        }

        if (isEmpty(pay.value)) {
            return alert('수금실적을 입력하세요.');
        }

        if (!cycle.value) {
            return alert('납입주기를 선택하세요.');
        }

        const tf = confirm('입력한 내용대로 설정하시겠습니까?');
        if (tf) {
            const payload = createPayload();

            dispatch(createPay(payload));

            handleClose();
        }
    };

    const createPayload = () => {
        const nextMonth = contdate!.getMonth() + +whoi.value;

        const diffMonth = nextMonth - (paydate.value!.getMonth() + 1);

        let distkind;
        if (diffMonth < -1) {
            distkind = '부활';
        } else if (diffMonth === -1) {
            distkind = '유예';
        } else if (diffMonth === 0) {
            distkind = '응당';
        } else {
            distkind = '선납';
        }

        let isPay = true;
        if (
            dist.value?.value === '철회' ||
            dist.value?.value === '취소' ||
            dist.value?.value === '추징' ||
            dist.value?.value === '환급'
        ) {
            isPay = false;
        }

        const payload: CreatePayPayload = {
            index: generateIndex(pays),
            checked: false,
            paydate: dayjs(paydate.value).format('YYYY-MM-DD'),
            whoi: +whoi.value,
            dist: dist.value!.value,
            pay: +pay.value.replace(/,/g, ''),
            paykind: paykind.value?.value,
            cycle: cycle.value!.value,
            hmonth: isPay
                ? dayjs(setMonth(contdate!, nextMonth - 1)).format('YYYY-MM')
                : undefined,
            distkind: isPay ? distkind : undefined,
        };

        return payload;
    };

    const handleOpen = () => {
        if (contdate && !isEmpty(payment)) {
            if (pays.length === 0) {
                setPaydate(contdate);

                setWhoi('1');

                setDist(findSelectOption('신규', longConstants.pDist));
            } else {
                setPaydate(new Date());

                setWhoi((+pays[pays.length - 1].whoi + 1).toString());

                setDist(findSelectOption('계속', longConstants.pDist));
            }

            setPay(payment);

            setCycle(findSelectOption('월납', longConstants.payCycle));
        } else {
            if (!contdate) {
                alert('먼저 계약일자를 입력하세요.');
            } else if (isEmpty(payment)) {
                alert('먼저 실적보험료를 입력하세요.');
            }

            handleClose();
        }
    };

    return (
        <Modal
            isOpen={isShowCreatePayModal}
            toggle={handleClose}
            size="lg"
            onOpened={handleOpen}
        >
            <ModalHeader toggle={handleClose}>납입실적 추가</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-6">
                        <WithLabel id="paydate" label="영수일" type="active">
                            <MyDatepicker
                                id="paydate"
                                size="sm"
                                placeholder="영수일"
                                disabled={pays.length === 0}
                                hooks={paydate}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel id="pwhoi" label="회차" type="active">
                                <MyInput
                                    type="number"
                                    id="pwhoi"
                                    className="text-end"
                                    placeholder="0"
                                    disabled={isDisableWhoi}
                                    {...whoi}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col-6">
                        <WithLabel id="pdist" label="납입구분" type="active">
                            <MySelect
                                inputId="pdist"
                                placeholder="선택"
                                placeHolderFontSize={16}
                                isDisabled={pays.length === 0}
                                {...dist}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel id="pay" label="수금실적" type="active">
                                <MyInput
                                    type="text"
                                    id="pay"
                                    placeholder="0"
                                    className="text-end"
                                    disabled={isDisablePayment}
                                    {...pay}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col-6">
                        <WithLabel id="paykind" label="금종" type="active">
                            <MySelect
                                inputId="paykind"
                                placeholder="선택"
                                placeHolderFontSize={16}
                                {...paykind}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel
                                id="cycle"
                                label="납입주기"
                                type="active"
                            >
                                <MySelect
                                    placeholder="선택"
                                    placeHolderFontSize={16}
                                    {...cycle}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                    등록
                </Button>
            </ModalFooter>
        </Modal>
    );
};