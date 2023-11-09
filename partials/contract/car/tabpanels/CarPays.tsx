import type { FC, ChangeEvent } from 'react';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { CoreEditableComponent } from '@interfaces/core';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { deletePay, updatePay } from '@actions/contract/long/set-pay.action';
import { MyCheckbox } from '@components/checkbox';
import { MyTableToolbar } from '@components/table/Toolbar';
import { generateIndex } from '@utils/generate';
import { createPay } from '@actions/contract/common/set-pay.action';

import { CarPayTemplate } from '../template/Pay';

interface Props extends MyTabpanelProps, CoreEditableComponent {}

export const CarPaysTabpanel: FC<Props> = ({ id, tabId, hidden, editable }) => {
    const dispatch = useDispatch();

    const { pays } = useSelector<AppState, ContractState>(
        (state) => state.contract,
    );

    const handleAllCheck = (evt: ChangeEvent<HTMLInputElement>) => {
        pays.forEach((v) => {
            dispatch(updatePay({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCreate = () => {
        const index = generateIndex(pays);

        dispatch(
            createPay({
                index,
                checked: false,
                confirm: false,
                cals: false,
                paydate: dayjs().format('YYYY-MM-DD'),
                dist: index === 0 ? '신규' : '',
                pay: 0,
                pay1: 0,
                pay2: 0,
            }),
        );
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
            <MyTableToolbar
                editable={editable}
                onCreate={handleCreate}
                onDelete={handleDelete}
            />
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

                            <th>영수일</th>
                            <th>납입구분</th>
                            <th>영수보험료</th>
                            <th>책임</th>
                            <th>임의보험료</th>
                            <th>금종</th>
                            <th>실적확인</th>
                            <th>정산여부</th>
                            {!editable && (
                                <>
                                    <th>입력</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {pays.length === 0 && (
                            <tr>
                                <td colSpan={10}>실적 정보가 없습니다.</td>
                            </tr>
                        )}
                        {pays.map((v) => (
                            <CarPayTemplate
                                key={`pay-${uuidv4()}`}
                                editable={editable}
                                {...v}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </MyTabpanel>
    );
};
