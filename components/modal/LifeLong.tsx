import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { ModalState } from '@reducers/modal';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import { useSelect } from '@hooks/use-select';
import { MyInput } from '@components/input';
import { useInput } from '@hooks/use-input';
import { useDatepicker } from '@hooks/use-datepicker';
import { HrState } from '@reducers/hr';
import { MyDatepicker } from '@components/datepicker';
import { hideLifeLongModal } from '@actions/modal/life-long.action';
import {
    CreateCodePayload,
    createCode,
} from '@actions/hr/common/set-code.action';

interface Props {}

export const LifeLongModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowLifeLongModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );
    // 시작월
    const [sMonth] = useDatepicker(null);
    // 종료월
    const [eMonth] = useDatepicker(null);

    const handleClose = () => {
        dispatch(hideLifeLongModal());
    };

    const handleSubmit = () => {
        const tf = confirm('입력한 내용대로 설정하시겠습니까?');
        if (tf) {
            const payload = createPayload();

            // dispatch(createCode(payload));

            handleClose();
        }
    };

    const createPayload = () => {
        // const payload: CreateCodePayload = {
        //     index: codes.length,
        //     wcode: +comp.value!.value,
        //     fccode: code.value,
        //     password: password.value,
        //     cent_val: centVal.value,
        //     indate: indate.value
        //         ? dayjs(indate.value).format('YYYY-MM-DD')
        //         : null,
        //     dist: comp.value!.origin.dist,
        //     company: comp.value!.label,
        //     checked: false,
        // };
        // return payload;
    };

    return (
        <Modal isOpen={isShowLifeLongModal} toggle={handleClose} size="lg">
            <ModalHeader toggle={handleClose}>생보 / 장기 규정</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col">
                        <WithLabel id="llSdate" label="시작월" type="active">
                            <MyDatepicker
                                id="llSdate"
                                size="sm"
                                format="YYYY-MM"
                                placeholder="시작월"
                                hooks={sMonth}
                            />
                        </WithLabel>
                    </div>
                    <div className="col">
                        <WithLabel id="llEdate" label="종료월" type="active">
                            <MyDatepicker
                                id="llEdate"
                                size="sm"
                                format="YYYY-MM"
                                placeholder="종료월"
                                hooks={eMonth}
                            />
                        </WithLabel>
                    </div>
                </div>

                <div className="row wr-mt">
                    <div className="col">
                        <WithLabel id="llRuleNm" label="규정명" type="active">
                            <MySelect
                                id="llRuleNm"
                                // height={variables.detailFilterHeight}
                                // isDisabled={!editable}
                                options={[]}
                                value={null}
                                onChange={() => {}}
                            />
                        </WithLabel>
                    </div>
                    <div className="col"></div>
                </div>
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
