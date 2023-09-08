import type { FC, ChangeEvent } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
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
    // giaNo: UseInputOutput;
    // giaComp: UseSelectOutput;
    // giaIndate: UseDatepickerOutput;
    // giaOutdate: UseDatepickerOutput;
    // giaQualification: UseSelectOutput;
    // liaNo: UseInputOutput;
    // liaComp: UseSelectOutput;
    // liaIndate: UseDatepickerOutput;
    // liaOutdate: UseDatepickerOutput;
    // liaQualification: UseSelectOutput;
}

export const AssociationRegistTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    // giaNo,
    // giaComp,
    // giaIndate,
    // giaOutdate,
    // giaQualification,
    // liaNo,
    // liaComp,
    // liaIndate,
    // liaOutdate,
    // liaQualification,
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
        filteredDamages.forEach((v) => {
            dispatch(updateCode({ ...v, checked: evt.target.checked }));
        });
    };

    const handleAllCheckLifes = (evt: ChangeEvent<HTMLInputElement>) => {
        filteredLifes.forEach((v) => {
            dispatch(updateCode({ ...v, checked: evt.target.checked }));
        });
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
                <div className="col">
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__title">
                            <strong>손해보험협회 등록사항</strong>
                        </div>
                        <div className="wr-pages-detail__content">
                            <div className="row">
                                <div className="col">
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
                                            // {...giaNo}
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
                                            disabled={!editable}
                                            // hooks={giaIndate}
                                        />
                                    </WithLabel>
                                    <WithLabel
                                        id="giaQualification"
                                        label="등록지점장"
                                        type={labelType}
                                    >
                                        <MyInput
                                            type="text"
                                            id="giaQualification"
                                            placeholder="등록지점장"
                                            readOnly={!editable}
                                            // {...giaNo}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithLabel
                                        id="giaComp"
                                        label="등록보험사"
                                        type={labelType}
                                    >
                                        <MySelect
                                            inputId="giaComp"
                                            placeHolderFontSize={16}
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={!editable}
                                            // {...giaComp}
                                        />
                                    </WithLabel>
                                    <WithLabel
                                        id="giaOutdate"
                                        label="생년월일"
                                        type={labelType}
                                    >
                                        <MyDatepicker
                                            id="giaOutdate"
                                            size="md"
                                            placeholder="생년월일"
                                            disabled={!editable}
                                            // hooks={giaOutdate}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__title">
                            <strong>생명보험협회 등록사항</strong>
                        </div>
                        <div className="wr-pages-detail__content">
                            <div className="row">
                                <div className="col">
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
                                            // {...liaNo}
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
                                            disabled={!editable}
                                            // hooks={liaIndate}
                                        />
                                    </WithLabel>
                                    <WithLabel
                                        id="liaQualification"
                                        label="등록지점장"
                                        type={labelType}
                                    >
                                        <MyInput
                                            type="text"
                                            id="liaQualification"
                                            placeholder="등록지점장"
                                            readOnly={!editable}
                                            // {...giaNo}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col">
                                    <WithLabel
                                        id="liaComp"
                                        label="등록보험사"
                                        type={labelType}
                                    >
                                        <MySelect
                                            inputId="liaComp"
                                            placeHolderFontSize={16}
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={!editable}
                                            // {...liaComp}
                                        />
                                    </WithLabel>
                                    <WithLabel
                                        id="liaOutdate"
                                        label="생년월일"
                                        type={labelType}
                                    >
                                        <MyDatepicker
                                            id="liaOutdate"
                                            size="md"
                                            placeholder="생년월일"
                                            disabled={!editable}
                                            // hooks={liaOutdate}
                                        />
                                    </WithLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="wr-pages-detail__subtitle">
                        <strong>손보 보험사 코드</strong>
                        {editable && (
                            <div>
                                <MyButton
                                    className="btn-danger btn-sm"
                                    onClick={handleDeleteDamages}
                                >
                                    선택삭제
                                </MyButton>
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
                                                label=""
                                                onChange={handleAllCheckDamages}
                                            />
                                        </th>
                                    )}

                                    <th style={{ width: 50 }}>
                                        <strong>보험사</strong>
                                    </th>
                                    <th style={{ width: 50 }}>
                                        <strong>등록일</strong>
                                    </th>
                                    <th>
                                        <strong>사용인코드</strong>
                                    </th>
                                    <th>
                                        <strong>(기타)코드</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDamages.length === 0 && (
                                    <tr>
                                        <td colSpan={editable ? 6 : 5}>
                                            <span>등록된 코드가 없습니다.</span>
                                        </td>
                                    </tr>
                                )}
                                {filteredDamages.map((v, index) => (
                                    <tr key={`damages${index}`}>
                                        {editable && (
                                            <td>
                                                <MyCheckbox
                                                    label=""
                                                    checked={v.checked}
                                                    onChange={(evt) =>
                                                        handleCheckCode(evt, v)
                                                    }
                                                />
                                            </td>
                                        )}

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
                        {editable && (
                            <MyTableExtension
                                onClick={handleShowSettingModal}
                            />
                        )}
                    </div>
                </div>
                <div className="col">
                    <div className="wr-pages-detail__subtitle">
                        <strong>생보 보험사 코드</strong>
                        {editable && (
                            <div>
                                <MyButton
                                    className="btn-danger btn-sm"
                                    onClick={handleDeleteLifes}
                                >
                                    선택삭제
                                </MyButton>
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
                                                label=""
                                                onChange={handleAllCheckLifes}
                                            />
                                        </th>
                                    )}

                                    <th style={{ width: 30 }}>
                                        <strong>보험사</strong>
                                    </th>
                                    <th style={{ width: 50 }}>
                                        <strong>등록일</strong>
                                    </th>
                                    <th>
                                        <strong>사용인코드</strong>
                                    </th>
                                    <th>
                                        <strong>(기타)코드</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLifes.length === 0 && (
                                    <tr>
                                        <td colSpan={5}>
                                            <span>등록된 코드가 없습니다.</span>
                                        </td>
                                    </tr>
                                )}

                                {filteredLifes.map((v, index) => (
                                    <tr key={`lifes${index}`}>
                                        {editable && (
                                            <td style={{ width: 30 }}>
                                                <MyCheckbox
                                                    label=""
                                                    checked={v.checked}
                                                    onChange={(evt) =>
                                                        handleCheckCode(evt, v)
                                                    }
                                                />
                                            </td>
                                        )}

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
                        {editable && (
                            <MyTableExtension
                                onClick={handleShowSettingModal}
                            />
                        )}
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
