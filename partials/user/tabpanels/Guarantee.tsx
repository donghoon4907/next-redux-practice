import type { FC, ChangeEvent } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { showGuaranteeSettingModal } from '@actions/modal/guarantee-setting.action';
import { AppState } from '@reducers/index';
import { HrState } from '@reducers/hr';
import { MyCheckbox } from '@components/checkbox';
import {
    deleteGuarantee,
    updateGuarantee,
} from '@actions/hr/set-guarantee.action';
import { Guarantee } from '@models/guarantee';
import { MyTableToolbar } from '@components/table/Toolbar';

interface Props extends MyTabpanelProps {
    editable: boolean;
}

export const GuaranteeTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    const dispatch = useDispatch();

    const { guarantees } = useSelector<AppState, HrState>((state) => state.hr);

    const handleShowSettingModal = () => {
        dispatch(showGuaranteeSettingModal());
    };

    const handleAllCheckGuarantee = (evt: ChangeEvent<HTMLInputElement>) => {
        guarantees.forEach((v) => {
            dispatch(updateGuarantee({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCheckGuarantee = (
        evt: ChangeEvent<HTMLInputElement>,
        v: Guarantee,
    ) => {
        dispatch(updateGuarantee({ ...v, checked: evt.target.checked }));
    };

    const handleDeleteGuarantee = () => {
        if (guarantees.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 설정을 선택해주세요.');
        }

        guarantees
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteGuarantee({ index: v.index }));
            });
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="flex-fill">
                    <MyTableToolbar
                        editable={editable}
                        title="보증설정 내역"
                        onCreate={handleShowSettingModal}
                        onDelete={handleDeleteGuarantee}
                    />
                    <div className="wr-table--normal wr-mb">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    {editable && (
                                        <th style={{ width: 30 }}>
                                            <MyCheckbox
                                                label=""
                                                onChange={
                                                    handleAllCheckGuarantee
                                                }
                                            />
                                        </th>
                                    )}

                                    <th>보증구분</th>
                                    <th>보증금(천원)</th>
                                    <th>내용(계약번호)</th>
                                    <th>보증시기</th>
                                    <th>보증만기</th>
                                    <th>갱신만기</th>
                                    <th>유효</th>
                                    <th>관리기관</th>
                                </tr>
                            </thead>
                            <tbody>
                                {guarantees.length === 0 && (
                                    <tr>
                                        <td colSpan={9}>
                                            등록된 설정이 없습니다.
                                        </td>
                                    </tr>
                                )}
                                {guarantees.map((v, i) => {
                                    let g_money = '';
                                    let remark = '';

                                    if (v.g_money) {
                                        g_money = v.g_money.toLocaleString();
                                    }

                                    if (v.kind === '적립금') {
                                        if (v.accumulate_goal) {
                                            remark += `목표 ${v.accumulate_goal?.toLocaleString()} / `;
                                        }

                                        if (v.accumulate_rate) {
                                            remark += `장기수수료 ${v.accumulate_rate}`;
                                        }
                                    } else {
                                        remark = v.remark || '';
                                    }

                                    return (
                                        <tr key={`guarantee${i + 1}`}>
                                            {editable && (
                                                <td>
                                                    <MyCheckbox
                                                        id={`gt_check${i}`}
                                                        label=""
                                                        checked={v.checked}
                                                        onChange={(evt) =>
                                                            handleCheckGuarantee(
                                                                evt,
                                                                v,
                                                            )
                                                        }
                                                    />
                                                </td>
                                            )}

                                            <td>
                                                <span>{v.kind}</span>
                                            </td>
                                            <td className="text-end">
                                                <span>{g_money}</span>
                                            </td>
                                            <td>
                                                <span>{remark}</span>
                                            </td>
                                            <td>
                                                <span>
                                                    {v.kind !== '적립금'
                                                        ? v.sdate
                                                        : '-'}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {v.kind !== '적립금'
                                                        ? v.edate
                                                        : '-'}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {v.kind !== '적립금'
                                                        ? v.redate
                                                        : '-'}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {v.available ? 'Y' : 'N'}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {v.kind !== '적립금'
                                                        ? v.agency_com
                                                        : '-'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
