import type { FC, ChangeEvent } from 'react';
import type { Pay } from '@models/pay';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { CoreEditableComponent } from '@interfaces/core';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyButton } from '@components/button';
import { deletePay, updatePay } from '@actions/contract/long/set-pay.action';
import { MyCheckbox } from '@components/checkbox';
import { MyTableExtension } from '@components/table/Extension';
import { showCreateCarPayModal } from '@actions/modal/create-pay.action';

interface Props extends MyTabpanelProps, CoreEditableComponent {}

export const CarPaysTabpanel: FC<Props> = ({ id, tabId, hidden, editable }) => {
    const dispatch = useDispatch();

    const { pays } = useSelector<AppState, ContractState>(
        (state) => state.contract,
    );

    const handleShowCreateModal = () => {
        dispatch(showCreateCarPayModal());
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
            <div className="wr-pages-detail__subtitle">
                <strong>납입내역 ({pays.length})</strong>
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
                                        id="cpt_allcheck"
                                        label=""
                                        onChange={handleAllCheck}
                                    />
                                </th>
                            )}

                            <th style={{ width: '100px' }}>
                                <strong>영수일</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>구분</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>보험료계</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>책임</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>임의</strong>
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
                                <td colSpan={editable ? 9 : 8}>
                                    실적 정보가 없습니다.
                                </td>
                            </tr>
                        )}
                        {pays.map((v, i) => (
                            <tr key={`pay${i}`}>
                                {editable && (
                                    <td>
                                        <MyCheckbox
                                            id={`cpt_check${i}`}
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
                                    <span>{v.dist ? v.dist : '-'}</span>
                                </td>
                                <td>
                                    <span>
                                        {v.pay ? v.pay.toLocaleString() : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {v.pay1 ? v.pay1.toLocaleString() : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {v.pay2 ? v.pay2.toLocaleString() : '-'}
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
            <div className="wr-pages-detail__subtitle">
                <strong>정산내역 ({0})</strong>
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
            <div className="wr-table--normal position-relative">
                <div className="wr-pages-detail__lock">
                    <p>준비 중입니다.</p>
                </div>
                <table className="wr-table table">
                    <thead>
                        <tr>
                            {editable && (
                                <th style={{ width: '30px' }}>
                                    <MyCheckbox
                                        id="lpt_calc_allcheck"
                                        label=""
                                        onChange={handleAllCheck}
                                    />
                                </th>
                            )}

                            <th style={{ width: '100px' }}>
                                <strong>영수일</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>구분</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>보험료계</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>책임</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>임의</strong>
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
                                <td colSpan={editable ? 9 : 8}>
                                    실적 정보가 없습니다.
                                </td>
                            </tr>
                        )}
                        {pays.map((v, i) => (
                            <tr key={`pay${i}`}>
                                {editable && (
                                    <td>
                                        <MyCheckbox
                                            id={`cpt_calc_check${i}`}
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
                                    <span>{v.dist ? v.dist : '-'}</span>
                                </td>
                                <td>
                                    <span>
                                        {v.pay ? v.pay.toLocaleString() : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {v.pay1 ? v.pay1.toLocaleString() : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {v.pay2 ? v.pay2.toLocaleString() : '-'}
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
