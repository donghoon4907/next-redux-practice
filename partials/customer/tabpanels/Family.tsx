import type { FC, ChangeEvent } from 'react';
import type { Family } from '@models/family';
import type { AppState } from '@reducers/index';
import type { CustomerState } from '@reducers/customer';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyCheckbox } from '@components/checkbox';
import { MyTableExtension } from '@components/table/Extension';
import {
    deleteFamily,
    updateFamily,
} from '@actions/customer/set-family.action';
import { showCreateFamilyModal } from '@actions/modal/create-family.action';
import { MyButton } from '@components/button';

interface Props extends MyTabpanelProps {
    editable: boolean;
}

export const FamilyTabpanel: FC<Props> = ({ id, tabId, hidden, editable }) => {
    const dispatch = useDispatch();

    const { family } = useSelector<AppState, CustomerState>(
        (state) => state.customer,
    );

    const handleAllCheck = (evt: ChangeEvent<HTMLInputElement>) => {
        family.forEach((v) => {
            dispatch(updateFamily({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: Family) => {
        dispatch(updateFamily({ ...v, checked: evt.target.checked }));
    };

    const handleShowSettingModal = () => {
        dispatch(showCreateFamilyModal());
    };

    const handleDelete = () => {
        if (family.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 데이터를 선택해주세요.');
        }

        family
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteFamily({ index: v.index }));
            });
    };

    const convertGender = (gender: string) => {
        let output;
        if (gender === 'M') {
            output = '남';
        } else if (gender === 'F') {
            output = '여';
        }

        return output;
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="wr-pages-detail__subtitle">
                <strong>가족 및 지인</strong>
                {editable && (
                    <div>
                        <MyButton
                            className="btn-danger btn-sm"
                            onClick={handleDelete}
                        >
                            선택삭제
                        </MyButton>
                    </div>
                )}
            </div>
            <div className="wr-table--normal">
                <table className="wr-table table">
                    <thead>
                        <tr>
                            {editable && (
                                <th style={{ width: '30px' }}>
                                    <MyCheckbox
                                        label=""
                                        onChange={handleAllCheck}
                                    />
                                </th>
                            )}

                            <th style={{ width: '100px' }}>이름</th>
                            <th style={{ width: '200px' }}>구분</th>
                            <th style={{ width: '100px' }}>관계</th>
                            <th style={{ width: '100px' }}>생년월일</th>
                            <th style={{ width: '100px' }}>성별</th>
                            <th>비고</th>
                        </tr>
                    </thead>
                    <tbody>
                        {family.length === 0 && (
                            <tr>
                                <td colSpan={editable ? 7 : 6}>
                                    데이터가 없습니다.
                                </td>
                            </tr>
                        )}
                        {family.map((v, i) => (
                            <tr key={`family${i}`}>
                                {editable && (
                                    <td>
                                        <MyCheckbox
                                            label=""
                                            checked={v.checked}
                                            onChange={(evt) =>
                                                handleCheck(evt, v)
                                            }
                                        />
                                    </td>
                                )}

                                <td>
                                    <span>{v.name ? v.name : '-'}</span>
                                </td>
                                <td>
                                    <span>{v.type}</span>
                                </td>
                                <td>
                                    <span>{v.relation ? v.relation : '-'}</span>
                                </td>
                                <td>
                                    <span>{v.birthday ? v.birthday : '-'}</span>
                                </td>
                                <td>
                                    <span>
                                        {v.sex ? convertGender(v.sex) : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>{v.remark ? v.remark : '-'}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editable && (
                    <MyTableExtension onClick={handleShowSettingModal} />
                )}
            </div>
        </MyTabpanel>
    );
};
