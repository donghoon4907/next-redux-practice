import type { FC, ChangeEvent } from 'react';
import type { Endorsement } from '@models/endorsement';
import type { AppState } from '@reducers/index';
import type { LongState } from '@reducers/long';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyButton } from '@components/button';
import { showCreateEndorsementModal } from '@actions/modal/create-endorsement.action';
import {
    deleteEndorsement,
    updateEndorsement,
} from '@actions/long/set-endorsement.action';
import { MyCheckbox } from '@components/checkbox';
import { MyTableExtension } from '@components/table/Extension';

interface Props extends MyTabpanelProps {
    editable: boolean;
}

export const EndorsementTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    const dispatch = useDispatch();

    const { endorsements } = useSelector<AppState, LongState>(
        (state) => state.long,
    );

    const handleShowCreateModal = () => {
        dispatch(showCreateEndorsementModal());
    };

    const handleAllCheck = (evt: ChangeEvent<HTMLInputElement>) => {
        endorsements.forEach((v) => {
            dispatch(updateEndorsement({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCheck = (
        evt: ChangeEvent<HTMLInputElement>,
        v: Endorsement,
    ) => {
        dispatch(updateEndorsement({ ...v, checked: evt.target.checked }));
    };

    const handleDelete = () => {
        if (endorsements.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 설정을 선택해주세요.');
        }

        endorsements
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteEndorsement({ index: v.index }));
            });
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="wr-pages-detail__lock">
                <p>준비 중입니다.</p>
            </div>
            {editable && (
                <div className="wr-pages-detail__subtitle">
                    <strong>목록 ({endorsements.length})</strong>
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
            <div className="wr-table--normal wr-mb">
                <table className="wr-table table">
                    <thead>
                        <tr>
                            {editable && (
                                <th rowSpan={2} style={{ width: '30px' }}>
                                    <MyCheckbox
                                        label=""
                                        onChange={handleAllCheck}
                                    />
                                </th>
                            )}

                            <th rowSpan={2} style={{ width: '50px' }}>
                                <strong>구분</strong>
                            </th>
                            <th rowSpan={2} style={{ width: '100px' }}>
                                <strong>회차</strong>
                            </th>
                            <th rowSpan={2} style={{ width: '100px' }}>
                                <strong>발생일</strong>
                            </th>
                            <th rowSpan={2} style={{ width: '100px' }}>
                                <strong>업적월</strong>
                            </th>
                            <th colSpan={2} style={{ width: '200px' }}>
                                <strong>실적보험료</strong>
                            </th>
                            <th colSpan={3} style={{ width: '300px' }}>
                                <strong>수정보험료</strong>
                            </th>
                            <th rowSpan={2} style={{ width: '50px' }}>
                                <strong>실적학인</strong>
                            </th>
                            <th rowSpan={2} style={{ width: '50px' }}>
                                <strong>정산여부</strong>
                            </th>
                            <th rowSpan={2}>
                                <strong>입력</strong>
                            </th>
                        </tr>
                        <tr>
                            <th style={{ width: '100px' }}>
                                <strong>전</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>후</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>전</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>후</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>차액</strong>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {endorsements.length === 0 && (
                            <tr>
                                <td colSpan={editable ? 14 : 13}>
                                    배서 정보가 없습니다.
                                </td>
                            </tr>
                        )}
                        {endorsements.map((v, i) => (
                            <tr key={`endorsement${i}`}>
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
                                    <span>{v.dist ? v.dist : '-'}</span>
                                </td>
                                <td>
                                    <span>{v.whoi ? v.whoi : '-'}</span>
                                </td>
                                <td>
                                    <span>{v.paydate ? v.paydate : '-'}</span>
                                </td>
                                <td>
                                    <span>{v.gdate ? v.gdate : '-'}</span>
                                </td>
                                <td>
                                    <span>
                                        {v.pay_before
                                            ? v.pay_before.toLocaleString()
                                            : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {v.pay_after
                                            ? v.pay_after.toLocaleString()
                                            : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {v.tp_before
                                            ? v.tp_before.toLocaleString()
                                            : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {v.tp_after
                                            ? v.tp_after.toLocaleString()
                                            : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>
                                        {v.balance
                                            ? v.balance.toLocaleString()
                                            : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span>{v.confirm ? v.confirm : '-'}</span>
                                </td>
                                <td>
                                    <span></span>
                                </td>
                                <td>
                                    <span>{v.insert ? v.insert : '-'}</span>
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
