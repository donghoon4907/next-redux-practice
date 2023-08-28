import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { ContractState } from '@reducers/contract';
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
import { hideCreateGeneralPayModal } from '@actions/modal/create-pay.action';
import { createPay } from '@actions/long/set-pay.action';
import longConstants from '@constants/options/long';
import { findSelectOption } from '@utils/getter';

interface Props {
    /**
     * 계약일자
     */
    contdate: Date;
    /**
     * 실적보험료
     */
    payment: string;
}

export const CreateGeneralPayModal: FC<Props> = ({ contdate, payment }) => {
    const dispatch = useDispatch();

    const { isShowCreateGeneralPayModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { pays } = useSelector<AppState, ContractState>(
        (state) => state.contract,
    );

    // 영수일
    const [paydate, setPaydate] = useDatepicker(null);
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
                        if (!pay.value.includes('-')) {
                            setPay((prev) => `-${prev}`);
                        }
                    } else {
                        setPay((prev) => prev.replace(/\-/g, ''));
                    }
                }
            },
        },
    );
    // 보험료
    const [pay, setPay] = useNumbericInput('', { addComma: true });

    const isDisablePayment =
        dist.value?.value === '철회' || dist.value?.value === '취소';

    const handleClose = () => {
        dispatch(hideCreateGeneralPayModal());
    };

    const handleSubmit = () => {
        if (!paydate.value) {
            return alert('영수일을 입력하세요.');
        }

        if (!dist.value) {
            return alert('구분을 선택하세요.');
        }

        if (isEmpty(pay.value)) {
            return alert('수금실적을 입력하세요.');
        }

        const tf = confirm('입력한 내용대로 설정하시겠습니까?');
        if (tf) {
            const payload = createPayload();

            dispatch(createPay(payload));

            handleClose();
        }
    };

    const createPayload = () => {
        const payload: CreatePayPayload = {
            index: generateIndex(pays),
            checked: false,
            paydate: dayjs(paydate.value).format('YYYY-MM-DD'),
            // gdate: dayjs(paydate.value).format('YYYY-MM-01'),
            dist: dist.value!.value,
            pay: +pay.value.replace(/,/g, ''),
        };

        return payload;
    };

    const handleOpen = () => {
        if (contdate && !isEmpty(payment)) {
            if (pays.length === 0) {
                setPaydate(contdate);

                setDist(findSelectOption('신규', longConstants.pDist));
            } else {
                setPaydate(new Date());

                setDist(findSelectOption('계속', longConstants.pDist));
            }

            setPay(payment);
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
            isOpen={isShowCreateGeneralPayModal}
            toggle={handleClose}
            size="lg"
            onOpened={handleOpen}
        >
            <ModalHeader toggle={handleClose}>납입실적 추가</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-6">
                        <WithLabel id="ppaydate" label="영수일" type="active">
                            <MyDatepicker
                                id="ppaydate"
                                size="sm"
                                placeholder="영수일"
                                disabled={pays.length === 0}
                                hooks={paydate}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel id="pdist" label="구분" type="active">
                                <MySelect
                                    inputId="pdist"
                                    placeholder="선택"
                                    placeHolderFontSize={16}
                                    isDisabled={pays.length === 0}
                                    {...dist}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col-6">
                        <WithLabel id="ppayment" label="보험료" type="active">
                            <MyInput
                                type="text"
                                id="ppayment"
                                placeholder="0"
                                className="text-end"
                                disabled={isDisablePayment}
                                {...pay}
                            />
                        </WithLabel>
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
