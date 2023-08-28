import type { FC, ChangeEvent } from 'react';
import type { Pay } from '@models/pay';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { CoreEditableComponent } from '@interfaces/core';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyButton } from '@components/button';
import { deletePay, updatePay } from '@actions/long/set-pay.action';
import { MyCheckbox } from '@components/checkbox';
import { MyTableExtension } from '@components/table/Extension';
import { showCreateLongPayModal } from '@actions/modal/create-pay.action';
import { findSelectOption } from '@utils/getter';
import longConstants from '@constants/options/long';

interface Props extends MyTabpanelProps, CoreEditableComponent {}

export const LongPaysTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    const dispatch = useDispatch();

    const { pays } = useSelector<AppState, ContractState>(
        (state) => state.contract,
    );

    const handleShowCreateModal = () => {
        dispatch(showCreateLongPayModal());
    };

    const handleAllCheck = (evt: ChangeEvent<HTMLInputElement>) => {
        pays.forEach((v) => {
            dispatch(updatePay({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: Pay) => {
        dispatch(updatePay({ ...v, checked: evt.target.checked }));
    };

    const handleDelete = () => {
        if (pays.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 설정을 선택해주세요.');
        }

        pays.filter((v) => v.checked).forEach((v) => {
            dispatch(deletePay({ index: v.index }));
        });
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            {editable && (
                <div className="wr-pages-detail__subtitle">
                    <strong>목록 ({pays.length})</strong>
                    <div>
                        <MyButton
                            className="btn-danger btn-sm"
                            onClick={handleDelete}
                        >
                            선택삭제
                        </MyButton>
                    </div>
                </div>
            )}
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

                            <th style={{ width: '100px' }}>
                                <strong>영수일</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>회차</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>납입구분</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>대상년월</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>입금구분</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>수금실적</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>금종</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>납입주기</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>실적확인</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>정산여부</strong>
                            </th>
                            <th>
                                <strong>입력</strong>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pays.length === 0 && (
                            <tr>
                                <td colSpan={editable ? 12 : 11}>
                                    실적 정보가 없습니다.
                                </td>
                            </tr>
                        )}
                        {pays.map((v, i) => (
                            <tr key={`pay${i}`}>
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
                                    <span>{v.paydate ? v.paydate : '-'}</span>
                                </td>
                                <td>
                                    <span>{v.whoi ? v.whoi : '-'}</span>
                                </td>
                                <td>
                                    <span>{v.dist ? v.dist : '-'}</span>
                                </td>
                                <td>
                                    <span>
                                        {v.gdate
                                            ? v.gdate.substring(0, 7)
                                            : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>{v.distkind ? v.distkind : '-'}</span>
                                </td>
                                <td>
                                    <span>
                                        {v.pay ? v.pay.toLocaleString() : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>{v.method ? v.method : '-'}</span>
                                </td>
                                <td>
                                    <span>
                                        {v.cycle
                                            ? findSelectOption(
                                                  v.cycle,
                                                  longConstants.payCycle,
                                              ).label
                                            : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>{v.confirm ? v.confirm : 'N'}</span>
                                </td>
                                <td>
                                    <span>{v.cals ? 'Y' : 'N'}</span>
                                </td>
                                <td>
                                    <span>
                                        {v.insert_datetime
                                            ? `${v.insert_userid} ${v.insert_datetime}`
                                            : '-'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editable && (
                    <MyTableExtension onClick={() => handleShowCreateModal()} />
                )}
            </div>
        </MyTabpanel>
    );
};
