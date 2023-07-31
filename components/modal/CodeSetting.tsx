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
import { hideCodeSettingModal } from '@actions/modal/code-setting.action';
import { CreateCodePayload, createCode } from '@actions/hr/set-code.action';

interface Props {}

export const CodeSettingModal: FC<Props> = () => {
    const dispatch = useDispatch();

    const { isShowCodeSettingModal } = useSelector<AppState, ModalState>(
        (state) => state.modal,
    );

    const { companies, codes } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );
    // 보험사
    const [comp] = useSelect(
        companies.filter(
            (v) => v.origin.dist === '손해' || v.origin.dist === '생명',
        ),
    );
    // 등록일
    const [indate] = useDatepicker(null);
    // 코드
    const [code] = useInput('', { noSpace: true });
    // 비밀번호
    const [password] = useInput('', { noSpace: true });
    // 인증번호
    const [centVal] = useInput('', { noSpace: true });

    const handleClose = () => {
        dispatch(hideCodeSettingModal());
    };

    const handleSubmit = () => {
        if (codes.findIndex((v) => v.wcode === +comp.value!.value) !== -1) {
            return alert('이미 해당 보험사의 코드가 설정되어 있습니다.');
        }

        const tf = confirm('입력한 내용대로 설정하시겠습니까?');
        if (tf) {
            const payload = createPayload();

            dispatch(createCode(payload));

            handleClose();
        }
    };

    const createPayload = () => {
        const payload: CreateCodePayload = {
            index: codes.length,
            wcode: +comp.value!.value,
            fccode: code.value,
            password: password.value,
            cent_val: centVal.value,
            indate: indate.value
                ? dayjs(indate.value).format('YYYY-MM-DD')
                : null,
            dist: comp.value!.origin.dist,
            company: comp.value!.label,
            checked: false,
        };

        return payload;
    };

    return (
        <Modal isOpen={isShowCodeSettingModal} toggle={handleClose} size="lg">
            <ModalHeader toggle={handleClose}>보험사 코드 설정</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-6">
                        <WithLabel id="iComp" label="보험사" type="active">
                            <MySelect
                                inputId="iComp"
                                placeholder="선택"
                                placeHolderFontSize={16}
                                {...comp}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel
                                id="iIndate"
                                label="등록일"
                                type="active"
                            >
                                <MyDatepicker
                                    id="iIndate"
                                    size="sm"
                                    placeholder="등록일"
                                    hooks={indate}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col-6">
                        <WithLabel id="iCode" label="코드" type="active">
                            <MyInput
                                type="text"
                                id="iCode"
                                placeholder="코드"
                                {...code}
                            />
                        </WithLabel>
                    </div>
                    <div className="col-6">
                        <div className="wr-ml">
                            <WithLabel
                                id="iPassword"
                                label="비밀번호"
                                type="active"
                            >
                                <MyInput
                                    type="password"
                                    id="iPassword"
                                    placeholder="비밀번호"
                                    {...password}
                                />
                            </WithLabel>
                        </div>
                    </div>
                </div>
                <div className="row wr-mt">
                    <div className="col-6">
                        <WithLabel id="iAuth" label="인증번호" type="active">
                            <MyInput
                                type="text"
                                id="iAuth"
                                placeholder="인증번호"
                                {...centVal}
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
                    적용
                </Button>
            </ModalFooter>
        </Modal>
    );
};
