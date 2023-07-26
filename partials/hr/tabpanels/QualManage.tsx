import type { FC, ChangeEvent } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { useState } from 'react';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { MyInput } from '@components/input';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@reducers/index';
import { HrState } from '@reducers/hr';
import { UseInputOutput } from '@hooks/use-input';
import { UseSelectOutput } from '@hooks/use-select';
import { UseDatepickerOutput } from '@hooks/use-datepicker';
import { MyDatepicker } from '@components/datepicker';
import { MyTableExtension } from '@components/table/Extension';
import { showCodeSettingModal } from '@actions/modal/code-setting.action';
import { MyCheckbox } from '@components/checkbox';
import { Code } from '@models/code';
import { deleteCode, updateCode } from '@actions/hr/set-code.action';
import { MyButton } from '@components/button';

interface Props extends MyTabpanelProps {
    editable: boolean;
    giaNo: UseInputOutput;
    giaComp: UseSelectOutput;
    giaIndate: UseDatepickerOutput;
    giaOutdate: UseDatepickerOutput;
    giaQualification: UseSelectOutput;
    liaNo: UseInputOutput;
    liaComp: UseSelectOutput;
    liaIndate: UseDatepickerOutput;
    liaOutdate: UseDatepickerOutput;
    liaQualification: UseSelectOutput;
}

export const QualManageTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    giaNo,
    giaComp,
    giaIndate,
    giaOutdate,
    giaQualification,
    liaNo,
    liaComp,
    liaIndate,
    liaOutdate,
    liaQualification,
}) => {
    const dispatch = useDispatch();

    const { codes } = useSelector<AppState, HrState>((state) => state.hr);

    const labelType = editable ? 'active' : 'disable';

    const filteredDamages = codes.filter((v) => v.dist === '손해');

    const filteredLifes = codes.filter((v) => v.dist === '생명');

    const handleShowSettingModal = () => {
        dispatch(showCodeSettingModal());
    };

    const handleAllCheckDamages = (evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target.checked) {
            filteredDamages.forEach((v) => {
                dispatch(updateCode({ ...v, checked: true }));
            });
        } else {
            filteredDamages.forEach((v) => {
                dispatch(updateCode({ ...v, checked: false }));
            });
        }
    };

    const handleAllCheckLifes = (evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target.checked) {
            filteredLifes.forEach((v) => {
                dispatch(updateCode({ ...v, checked: true }));
            });
        } else {
            filteredLifes.forEach((v) => {
                dispatch(updateCode({ ...v, checked: false }));
            });
        }
    };

    const handleCheckCode = (evt: ChangeEvent<HTMLInputElement>, v: Code) => {
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

    const handleDeleteLifes = () => {
        if (filteredLifes.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 코드를 선택해주세요.');
        }

        filteredLifes
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteCode({ index: v.index }));
            });
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row wr-mb">
                <div className="col-6">
                    <div className="wr-pages-hr-detail__block">
                        <div className="wr-pages-hr-detail__title">
                            <strong>손해보험협회</strong>
                        </div>
                        <div className="wr-pages-hr-detail__content">
                            <div className="row">
                                <div className="col-6">
                                    <WithLabel
                                        id="giaNo"
                                        label="등록번호"
                                        type={labelType}
                                    >
                                        <MyInput
                                            type="text"
                                            id="giaNo"
                                            placeholder="등록번호"
                                            readOnly={!editable}
                                            {...giaNo}
                                        />
                                    </WithLabel>
                                    <WithLabel
                                        id="giaIndate"
                                        label="등록일"
                                        type={labelType}
                                    >
                                        <MyDatepicker
                                            id="giaIndate"
                                            size="md"
                                            placeholder="등록일"
                                            hooks={giaIndate}
                                        />
                                    </WithLabel>
                                    <WithLabel
                                        id="giaQualification"
                                        label="자격구분"
                                        type={labelType}
                                    >
                                        <MySelect
                                            inputId="giaQualification"
                                            placeholder="선택"
                                            placeHolderFontSize={16}
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={!editable}
                                            {...giaQualification}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col-6">
                                    <div className="wr-ml">
                                        <WithLabel
                                            id="giaComp"
                                            label="등록보험사"
                                            type={labelType}
                                        >
                                            <MySelect
                                                inputId="giaComp"
                                                placeholder="선택"
                                                placeHolderFontSize={16}
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                isDisabled={!editable}
                                                {...giaComp}
                                            />
                                        </WithLabel>
                                        <WithLabel
                                            id="giaOutdate"
                                            label="말소일"
                                            type={labelType}
                                        >
                                            <MyDatepicker
                                                id="giaOutdate"
                                                size="md"
                                                placeholder="말소일"
                                                hooks={giaOutdate}
                                            />
                                        </WithLabel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <div className="wr-pages-hr-detail__block">
                            <div className="wr-pages-hr-detail__title">
                                <strong>생명보험협회</strong>
                            </div>
                            <div className="wr-pages-hr-detail__content">
                                <div className="row">
                                    <div className="col-6">
                                        <WithLabel
                                            id="liaNo"
                                            label="등록번호"
                                            type={labelType}
                                        >
                                            <MyInput
                                                type="text"
                                                id="liaNo"
                                                placeholder="등록번호"
                                                readOnly={!editable}
                                                {...liaNo}
                                            />
                                        </WithLabel>
                                        <WithLabel
                                            id="liaIndate"
                                            label="등록일"
                                            type={labelType}
                                        >
                                            <MyDatepicker
                                                id="liaIndate"
                                                size="md"
                                                placeholder="등록일"
                                                hooks={liaIndate}
                                            />
                                        </WithLabel>
                                        <WithLabel
                                            id="liaQualification"
                                            label="자격구분"
                                            type={labelType}
                                        >
                                            <MySelect
                                                inputId="liaQualification"
                                                placeholder="선택"
                                                placeHolderFontSize={16}
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                isDisabled={!editable}
                                                {...liaQualification}
                                            />
                                        </WithLabel>
                                    </div>
                                    <div className="col-6">
                                        <div className="wr-ml">
                                            <WithLabel
                                                id="liaComp"
                                                label="등록보험사"
                                                type={labelType}
                                            >
                                                <MySelect
                                                    inputId="liaComp"
                                                    placeholder="선택"
                                                    placeHolderFontSize={16}
                                                    height={
                                                        variables.detailFilterHeight
                                                    }
                                                    isDisabled={!editable}
                                                    {...liaComp}
                                                />
                                            </WithLabel>
                                            <WithLabel
                                                id="liaOutdate"
                                                label="말소일"
                                                type={labelType}
                                            >
                                                <MyDatepicker
                                                    id="liaOutdate"
                                                    size="md"
                                                    placeholder="말소일"
                                                    hooks={liaOutdate}
                                                />
                                            </WithLabel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="wr-pages-hr-detail__subtitle">
                        <strong>손보 보험사 코드</strong>
                        <div>
                            <MyButton
                                className="btn-danger"
                                onClick={handleDeleteDamages}
                            >
                                선택삭제
                            </MyButton>
                        </div>
                    </div>
                    <div className="wr-table--normal wr-mb">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    <th style={{ width: 30 }}>
                                        <MyCheckbox
                                            label=""
                                            onChange={handleAllCheckDamages}
                                        />
                                    </th>
                                    <th style={{ width: 50 }}>
                                        <strong>보험사</strong>
                                    </th>
                                    <th style={{ width: 50 }}>
                                        <strong>등록일</strong>
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
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDamages.length === 0 && (
                                    <tr>
                                        <td colSpan={6}>
                                            <span>코드를 등록하세요</span>
                                        </td>
                                    </tr>
                                )}
                                {filteredDamages.map((v, index) => (
                                    <tr key={`damages${index}`}>
                                        <td>
                                            <MyCheckbox
                                                label=""
                                                checked={v.checked}
                                                onChange={(evt) =>
                                                    handleCheckCode(evt, v)
                                                }
                                            />
                                        </td>
                                        <td>
                                            <span>{v.company}</span>
                                        </td>
                                        <td>
                                            <span>{v.indate}</span>
                                        </td>
                                        <td>
                                            <span>{v.fccode}</span>
                                        </td>
                                        <td>
                                            <span>{v.password}</span>
                                        </td>
                                        <td>
                                            <span>{v.cent_val}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <MyTableExtension onClick={handleShowSettingModal} />
                    </div>
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <div className="wr-pages-hr-detail__subtitle">
                            <strong>생보 보험사 코드</strong>
                            <div>
                                <MyButton
                                    className="btn-danger"
                                    onClick={handleDeleteLifes}
                                >
                                    선택삭제
                                </MyButton>
                            </div>
                        </div>
                        <div className="wr-table--normal wr-mb">
                            <table className="wr-table table">
                                <thead>
                                    <tr>
                                        <th style={{ width: 30 }}>
                                            <MyCheckbox
                                                label=""
                                                onChange={handleAllCheckLifes}
                                            />
                                        </th>
                                        <th style={{ width: 30 }}>
                                            <strong>보험사</strong>
                                        </th>
                                        <th style={{ width: 50 }}>
                                            <strong>등록일</strong>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLifes.length === 0 && (
                                        <tr>
                                            <td colSpan={6}>
                                                <span>코드를 등록하세요</span>
                                            </td>
                                        </tr>
                                    )}

                                    {filteredLifes.map((v, index) => (
                                        <tr key={`lifes${index}`}>
                                            <td style={{ width: 30 }}>
                                                <MyCheckbox
                                                    label=""
                                                    checked={v.checked}
                                                    onChange={(evt) =>
                                                        handleCheckCode(evt, v)
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <span>{v.company}</span>
                                            </td>
                                            <td>
                                                <span>{v.indate}</span>
                                            </td>
                                            <td>
                                                <span>{v.fccode}</span>
                                            </td>
                                            <td>
                                                <span>{v.password}</span>
                                            </td>
                                            <td>
                                                <span>{v.cent_val}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <MyTableExtension
                                onClick={handleShowSettingModal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
