import type { FC } from 'react';
import type { Excontract } from '@models/excontract';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import type { CustomerState } from '@reducers/customer';
import type { HrState } from '@reducers/hr';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import { useSelect } from '@hooks/use-select';
import { MyInput } from '@components/input';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { MyDatepicker } from '@components/datepicker';
import { hideCreateExcontractModal } from '@actions/modal/create-excontract.action';
import { isEmpty } from '@utils/validator/common';
import { createExcontract } from '@actions/customer/set-excontract.action';
import { generateIndex } from '@utils/generate';

interface Props {}

export const CreateExcontractCarModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowCreateExcontractCarModal } = useSelector<
        AppState,
        ModalState
    >((state) => state.modal);

    const { allCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { excontracts } = useSelector<AppState, CustomerState>(
        (state) => state.customer,
    );

    // 보험사
    const [comp] = useSelect(allCompanies);
    // 차량번호
    const [carnum] = useInput('');
    // 보험료
    const [pay] = useNumbericInput('', { addComma: true });
    // 개시일자
    const [contdate] = useDatepicker(null);
    // 만기일자
    const [bo_dateto] = useDatepicker(null);
    // 비고
    const [remark] = useInput('');

    const handleClose = () => {
        dispatch(hideCreateExcontractModal('car'));
    };

    const handleSubmit = () => {
        const tf = confirm('입력한 내용대로 설정하시겠습니까?');
        if (tf) {
            const payload = createPayload();

            dispatch(createExcontract(payload));

            handleClose();
        }
    };

    const createPayload = () => {
        const payload: Excontract = {
            spe: 'car',
            index: generateIndex(excontracts),
            wcode: +comp.value!.value,
            wname: comp.value!.label,
            checked: false,
        };

        if (!isEmpty(carnum.value)) {
            payload['carnum'] = carnum.value;
        }

        if (!isEmpty(pay.value)) {
            payload['pay'] = +pay.value.replace(/,/g, '');
        }

        if (!isEmpty(contdate.value)) {
            payload['contdate'] = dayjs(contdate.value).format('YYYY-MM-DD');
        }

        if (!isEmpty(bo_dateto.value)) {
            payload['bo_dateto'] = dayjs(bo_dateto.value).format('YYYY-MM-DD');
        }

        if (!isEmpty(remark.value)) {
            payload['remark'] = remark.value;
        }

        return payload;
    };

    return (
        <Modal
            isOpen={isShowCreateExcontractCarModal}
            toggle={handleClose}
            size="lg"
        >
            <ModalHeader toggle={handleClose}>타사 자동차보험 추가</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-6">
                        <WithLabel id="cComp" label="보험사" type="active">
                            <MySelect
                                inputId="cComp"
                                placeHolderFontSize={16}
                                {...comp}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel
                                id="cCarNum"
                                label="차량번호"
                                type="active"
                            >
                                <MyInput
                                    type="text"
                                    id="cCarNum"
                                    placeholder="서울00가0000"
                                    {...carnum}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col-6">
                        <WithLabel id="cPay" label="보험료" type="active">
                            <MyInput
                                type="text"
                                id="cPay"
                                placeholder="보험료"
                                {...pay}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel
                                id="cContdate"
                                label="개시일자"
                                type="active"
                            >
                                <MyDatepicker
                                    id="cContdate"
                                    size="sm"
                                    placeholder="개시일자"
                                    hooks={contdate}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col-6">
                        <WithLabel
                            id="cBoDateto"
                            label="만기일자"
                            type="active"
                        >
                            <MyDatepicker
                                id="cBoDateto"
                                size="sm"
                                placeholder="만기일자"
                                hooks={bo_dateto}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel id="cRemark" label="비고" type="active">
                                <MyInput
                                    type="text"
                                    id="cRemark"
                                    placeholder="비고"
                                    {...remark}
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
