import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import { CreateEndorsementPayload } from '@actions/long/set-endorsement.action';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { isEmpty } from '@utils/validator/common';
import { generateIndex } from '@utils/generate';
import { useSelect } from '@hooks/use-select';
import { MySelect } from '@components/select';
import { MyDatepicker } from '@components/datepicker';
import { LongState } from '@reducers/long';
import longConstants from '@constants/options/long';
import { hideCreateEndorsementModal } from '@actions/modal/create-endorsement.action';

interface Props {}

export const CreateEndorsementModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowCreateEndorsementModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { endorsements } = useSelector<AppState, LongState>(
        (state) => state.long,
    );

    // 구분
    const [dist] = useSelect(longConstants.eDist);
    // 회차
    const [whoi] = useNumbericInput('');
    // 발생일
    const [paydate] = useDatepicker(null);
    // 수금실적
    const [pay] = useNumbericInput('', { addComma: true });
    // 금종
    const [paykind] = useInput('');
    // 납입주기
    const [cycle] = useSelect(longConstants.payCycle);

    const handleClose = () => {
        dispatch(hideCreateEndorsementModal());
    };

    const handleSubmit = () => {
        // if (!paydate.value) {
        //     return alert('영수일을 입력하세요.');
        // }

        // if (isEmpty(whoi.value)) {
        //     return alert('회차를 입력하세요.');
        // }

        // if (!dist.value) {
        //     return alert('납입구분을 선택하세요.');
        // }

        // if (isEmpty(pay.value)) {
        //     return alert('수금실적을 입력하세요.');
        // }

        // if (!cycle.value) {
        //     return alert('납입주기를 선택하세요.');
        // }

        const tf = confirm('입력한 내용대로 설정하시겠습니까?');
        if (tf) {
            const payload = createPayload();

            // dispatch(createPay(payload));

            handleClose();
        }
    };

    const createPayload = () => {
        // const payload: CreateEndorsementPayload = {
        //     index: generateIndex(endorsements),
        //     checked: false,
        //     paydate: dayjs(paydate.value).format('YYYY-MM-DD'),
        //     whoi: +whoi.value,
        //     dist: dist.value!.value,
        //     pay: +pay.value.replace(/,/g, ''),
        //     paykind: paykind.value,
        //     cycle: cycle.value!.value,
        // };
        // return payload;
    };

    return (
        <Modal
            isOpen={isShowCreateEndorsementModal}
            toggle={handleClose}
            size="lg"
        >
            <ModalHeader toggle={handleClose}>배서 추가</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-6">
                        <WithLabel id="edist" label="구분" type="active">
                            <MySelect
                                inputId="edist"
                                placeholder="선택"
                                placeHolderFontSize={16}
                                {...dist}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel id="ewhoi" label="회차" type="active">
                                <MyInput
                                    type="number"
                                    id="ewhoi"
                                    className="text-end"
                                    placeholder="0"
                                    {...whoi}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col-6">
                        <WithLabel id="epaydate" label="발생일" type="active">
                            <MyDatepicker
                                id="epaydate"
                                size="sm"
                                placeholder="발생일"
                                hooks={paydate}
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
                                    {...pay}
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
