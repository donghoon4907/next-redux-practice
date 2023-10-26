import type { FC, ChangeEvent } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { useState, useMemo } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@reducers/index';
import { HrState } from '@reducers/hr';
import { UseInputOutput, useInput } from '@hooks/use-input';
import { UseSelectOutput, useSelect } from '@hooks/use-select';
import { UseDatepickerOutput } from '@hooks/use-datepicker';
import { MyCheckbox } from '@components/checkbox';
import { Code } from '@models/code';
import {
    createCode,
    deleteCode,
    updateCode,
} from '@actions/hr/set-code.action';
import { MyButton } from '@components/button';
import { FloatInput } from '@components/input/Float';
import { FloatDatepicker } from '@components/datepicker/Float';
import { FloatSelect } from '@components/select/Float';
import { IconWrapper } from '@components/IconWrapper';
import { MyInput } from '@components/input';
import { MySelect } from '@components/select';
import { useCheckbox } from '@hooks/use-checkbox';
import { isEmpty } from '@utils/validator/common';
import { generateIndex } from '@utils/generate';
import { findSelectOption } from '@utils/getter';
import { CodeDTO } from '@dto/hr/Code.dto';
import { UpdateCodeTemplate } from '@partials/common/template/UpdateCode';

interface Props extends MyTabpanelProps {
    editable: boolean;
    dNo: UseInputOutput;
    dWcode: UseSelectOutput;
    dIndate: UseDatepickerOutput;
    dOutdate: UseDatepickerOutput;
    dManager: UseSelectOutput;
    lNo: UseInputOutput;
    lWcode: UseSelectOutput;
    lIndate: UseDatepickerOutput;
    lOutdate: UseDatepickerOutput;
    lManager: UseSelectOutput;
}

export const OrgaQualManageTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    dNo,
    dWcode,
    dIndate,
    dOutdate,
    dManager,
    lNo,
    lWcode,
    lIndate,
    lOutdate,
    lManager,
}) => {
    const dispatch = useDispatch();

    const { allCompanies, codes } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const filteredCompany = useMemo(
        () => allCompanies.filter((v) => v.origin.dist === '손보'),
        [],
    );

    // 추가 모드 활성화 여부
    const [activeCreate, setActiveCreate] = useState(false);
    // 수정 모드 활성화 여부
    const [activeUpdate, setActiveUpdate] = useState(false);
    // 보험사
    const [company, setCompany] = useSelect(filteredCompany, null);
    // 코드
    const [fccode, setFccode] = useInput('', { noSpace: true });
    // 비밀번호
    const [password, setPassword] = useInput('', { noSpace: true });
    // 인증번호
    const [centval, setCentval] = useInput('', { noSpace: true });

    const filteredDamages = useMemo(
        () => codes.filter((v) => v.dist === '손보'),
        [codes],
    );

    const handleAllCheck = (evt: ChangeEvent<HTMLInputElement>) => {
        filteredDamages.forEach((v) => {
            dispatch(updateCode({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: Code) => {
        dispatch(updateCode({ ...v, checked: evt.target.checked }));
    };

    const handleDeleteDamages = () => {
        if (filteredDamages.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 코드를 선택해주세요.');
        }

        filteredDamages
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteCode({ index: v.index }));
            });
    };

    const handleActiveCreate = () => {
        if (activeCreate) {
            handleCancelCreate();
        } else {
            setActiveCreate(true);
        }
    };

    const handleActiveUpdate = () => {
        if (activeUpdate) {
            const tf = confirm('설정한 값으로 수정하시겠습니까?');

            if (tf) {
                setActiveUpdate(false);
            }
        } else {
            if (filteredDamages.length === 0) {
                alert('수정할 코드가 없습니다.');
            } else {
                setActiveUpdate(true);
            }
        }
    };
    const handleCancelCreate = () => {
        const tf = confirm('추가를 취소하시겠습니까?');

        if (tf) {
            setActiveCreate(false);

            handleClearAfterCreate();
        }
    };

    const handleClearAfterCreate = () => {
        setCompany(null);

        setFccode('');

        setPassword('');

        setCentval('');
    };

    const handleCreate = () => {
        const payload = createPayload();

        const createCodeDto = new CodeDTO(payload);

        if (createCodeDto.requiredValidate()) {
            dispatch(
                createCode({
                    ...createCodeDto.getPayload(),
                    index: generateIndex(codes),
                    dist: '손보',
                    checked: false,
                }),
            );

            setActiveCreate(false);

            handleClearAfterCreate();
        }
    };

    const createPayload = () => {
        const payload: any = {};

        if (company.value) {
            payload['wcode'] = +company.value.value;
            payload['company'] = company.value.label;
        }

        if (!isEmpty(fccode.value)) {
            payload['fccode'] = fccode.value;
        }

        if (!isEmpty(password.value)) {
            payload['password'] = password.value;
        }

        if (!isEmpty(centval.value)) {
            payload['cent_val'] = centval.value;
        }

        return payload;
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row wr-mb">
                <div className="flex-fill">
                    <div className="wr-pages-detail__tabtitle">
                        손해보험협회
                    </div>
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content">
                            <div className="row">
                                <div className="flex-fill">
                                    <FloatInput label="등록번호" {...dNo} />
                                </div>
                                <div className="flex-fill">
                                    <FloatDatepicker
                                        id="d_indate"
                                        label="등록일"
                                        {...dIndate}
                                    />
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="flex-fill">
                                    <FloatSelect
                                        label="등록보험사"
                                        {...dWcode}
                                    />
                                </div>
                                <div className="flex-fill">
                                    <FloatSelect label="지점장" {...dManager} />
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="flex-fill">
                                    <FloatDatepicker
                                        id="d_outdate"
                                        label="해촉일"
                                        {...dOutdate}
                                    />
                                </div>
                                <div className="flex-fill"></div>
                            </div>
                        </div>
                    </div>
                    <div className="wr-pages-detail__tabsubtitle wr-mt">
                        <span>손해보험사코드</span>
                        {editable && (
                            <div className="d-flex">
                                <IconWrapper onClick={handleActiveCreate}>
                                    <AiOutlinePlus size={20} />
                                </IconWrapper>
                                <IconWrapper onClick={handleDeleteDamages}>
                                    <AiOutlineMinus size={20} />
                                </IconWrapper>
                                <IconWrapper onClick={handleActiveUpdate}>
                                    <BsPencilSquare size={20} />
                                </IconWrapper>
                            </div>
                        )}
                    </div>
                    <div className="wr-table--normal wr-mb">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    {editable && (
                                        <th style={{ width: 30 }}>
                                            <MyCheckbox
                                                id="qt_d_allcheck"
                                                label=""
                                                onChange={handleAllCheck}
                                            />
                                        </th>
                                    )}

                                    <th style={{ width: 130 }}>
                                        <strong>보험사</strong>
                                    </th>
                                    <th>
                                        <strong>코드</strong>
                                    </th>
                                    <th>
                                        <strong>비밀번호</strong>
                                    </th>
                                    <th>
                                        <strong>인증번호</strong>
                                    </th>
                                    {(activeCreate || activeUpdate) && (
                                        <th style={{ width: 60 }}></th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {!activeCreate &&
                                    filteredDamages.length === 0 && (
                                        <tr>
                                            <td colSpan={editable ? 6 : 5}>
                                                <span>
                                                    등록된 코드가 없습니다.
                                                </span>
                                            </td>
                                        </tr>
                                    )}
                                {filteredDamages.map((v, i) => {
                                    return (
                                        <tr key={`damages${i}`}>
                                            {editable && (
                                                <td>
                                                    <MyCheckbox
                                                        id={`qt_d_check${i}`}
                                                        label=""
                                                        checked={v.checked}
                                                        onChange={(evt) =>
                                                            handleCheck(evt, v)
                                                        }
                                                    />
                                                </td>
                                            )}
                                            <UpdateCodeTemplate
                                                hidden={!activeUpdate}
                                                {...v}
                                            />
                                            {!activeUpdate && (
                                                <>
                                                    <td>
                                                        <span>{v.company}</span>
                                                    </td>
                                                    <td>
                                                        <span>{v.fccode}</span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            {v.password}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span>
                                                            {v.cent_val}
                                                        </span>
                                                    </td>
                                                    {activeCreate && <td></td>}
                                                </>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                            {activeCreate && (
                                <tfoot>
                                    <tr>
                                        <td></td>

                                        <td>
                                            <MySelect
                                                placeholder="선택"
                                                {...company}
                                            />
                                        </td>
                                        <td>
                                            <MyInput
                                                placeholder="코드"
                                                {...fccode}
                                            />
                                        </td>
                                        <td>
                                            <MyInput
                                                placeholder="비밀번호"
                                                {...password}
                                            />
                                        </td>
                                        <td>
                                            <MyInput
                                                placeholder="인증번호"
                                                {...centval}
                                            />
                                        </td>
                                        <td>
                                            <div className="d-flex">
                                                <MyButton
                                                    type="button"
                                                    className="btn-danger btn-sm"
                                                    onClick={handleCancelCreate}
                                                >
                                                    취소
                                                </MyButton>
                                                <MyButton
                                                    type="button"
                                                    className="btn-primary btn-sm wr-ml"
                                                    onClick={handleCreate}
                                                >
                                                    추가
                                                </MyButton>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                </div>
                <div className="wr-pages-orga-detail__vdivider"></div>
                <div className="flex-fill"></div>
            </div>
            <div className="row">
                <div className="col"></div>
            </div>
        </MyTabpanel>
    );
};
