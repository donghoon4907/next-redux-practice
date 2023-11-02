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
import { generateIndex, generateNextWhoi } from '@utils/generate';
import { createPay } from '@actions/contract/common/set-pay.action';

import { PayTemplate } from '../template/Pay';

interface Props extends MyTabpanelProps, CoreEditableComponent {
    contdate: Date;
    payment: number;
}

export const LongPaysTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    contdate,
    payment,
}) => {
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
        // 계약일자 설정 여부
        if (!contdate) {
            return alert('계약일자를 입력해주세요.');
        }
        // 실적보험료 설정 여부
        if (payment === 0) {
            return alert('실적보험료를 입력해주세요.');
        }

        // 계약종료 여부
        let isFin = false;
        for (let i = 0; i < pays.length; i++) {
            const { dist } = pays[i];

            if (dist === '철회' || dist === '취소') {
                isFin = true;

                break;
            }
        }

        if (isFin) {
            return alert('철회 및 취소처리가 되어 더이상 추가할 수 없습니다.');
        }

        const index = generateIndex(pays);
        let paydate;
        let whoi;
        let dist;
        // 신규인 경우
        if (index === 0) {
            // 영수일을 계약일자로
            paydate = contdate;
            whoi = 1;
            dist = '신규';
        } else {
            // 영수일을 오늘날짜로
            paydate = new Date();
            // 마지막으로 설정된 회차 + 1
            whoi = generateNextWhoi(pays);
            dist = '계속';
        }

        dispatch(
            createPay({
                index,
                checked: false,
                paydate: dayjs(paydate).format('YYYY-MM-DD'),
                whoi,
                pay: payment,
                dist,
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
                            <th>회차</th>
                            <th>입금구분</th>
                            <th>대상년월</th>
                            <th>납입구분</th>
                            <th>영수보험료</th>
                            <th>금종</th>
                            {/* <th style={{ width: '110px' }}>납입주기</th> */}
                            <th>실적확인</th>
                            <th>정산여부</th>
                            {!editable && (
                                <>
                                    <th>
                                        <strong>입력</strong>
                                    </th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {pays.length === 0 && (
                            <tr>
                                <td colSpan={editable ? 13 : 12}>
                                    실적 정보가 없습니다.
                                </td>
                            </tr>
                        )}
                        {pays.map((v) => (
                            <PayTemplate
                                key={`pay-${uuidv4()}`}
                                editable={editable}
                                contdate={contdate}
                                {...v}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </MyTabpanel>
    );
};
