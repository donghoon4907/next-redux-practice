import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { ContractState } from '@reducers/contract';
import type { CreatePayPayload } from '@actions/contract/long/set-pay.action';
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
import { hideCreateCarPayModal } from '@actions/modal/create-pay.action';
import { createPay } from '@actions/contract/long/set-pay.action';
import carConstants from '@constants/options/car';

interface Props {}

export const CreateCarPayModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowCreateCarPayModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { pays } = useSelector<AppState, ContractState>(
        (state) => state.contract,
    );

    // 영수일
    const [paydate] = useDatepicker(new Date());
    // 납입구분
    const [dist] = useSelect(carConstants.payDist);
    // 보험료
    const [pay] = useNumbericInput('', { addComma: true });

    const handleClose = () => {
        dispatch(hideCreateCarPayModal());
    };

    const handleSubmit = () => {
        if (!paydate.value) {
            return alert('영수일을 입력하세요.');
        }

        if (!dist.value) {
            return alert('구분을 선택하세요.');
        }

        if (isEmpty(pay.value)) {
            return alert('보험료를 입력하세요.');
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

    return (
        <Modal isOpen={isShowCreateCarPayModal} toggle={handleClose} size="lg">
            <ModalHeader toggle={handleClose}>납입실적 추가</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-6">
                        <WithLabel id="ppaydate" label="영수일" type="active">
                            <MyDatepicker
                                id="ppaydate"
                                size="sm"
                                placeholder="영수일"
                                hooks={paydate}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel id="pdist" label="구분" type="active">
                                <MySelect
                                    inputId="pdist"
                                    placeHolderFontSize={16}
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
