import type { FC, ChangeEvent } from 'react';
import type { AppState } from '@reducers/index';
import type { ContractState } from '@reducers/contract';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { CoreEditableComponent } from '@interfaces/core';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyCheckbox } from '@components/checkbox';
import { MyTableToolbar } from '@components/table/Toolbar';
import { generateIndex, generateNextWhoi } from '@utils/generate';
import {
    createBaeseo,
    deleteBaeseo,
    updateBaeseo,
} from '@actions/contract/common/set-baeseo.action';

import { BaeseoTemplate } from '../template/Baeseo';

interface Props extends MyTabpanelProps, CoreEditableComponent {
    payment: number;
    tp: number;
}

export const LongBaeseossTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    payment,
    tp,
}) => {
    const dispatch = useDispatch();

    const { baeseos } = useSelector<AppState, ContractState>(
        (state) => state.contract,
    );

    const handleAllCheck = (evt: ChangeEvent<HTMLInputElement>) => {
        baeseos.forEach((v) => {
            dispatch(updateBaeseo({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCreate = () => {
        // 실적보험료 설정 여부
        if (payment === 0) {
            return alert('실적보험료를 입력해주세요.');
        }

        // 수정보험료 설정 여부
        if (tp === 0) {
            return alert('수정보험료를 입력해주세요.');
        }

        const index = generateIndex(baeseos);
        const whoi = generateNextWhoi(baeseos);

        dispatch(
            createBaeseo({
                index,
                checked: false,
                whoi,
                pay_point: payment,
                tp_point: tp,
                dist: '실효',
                date: dayjs().format('YYYY-MM-DD'),
                gdate: dayjs().format('YYYY-MM-01'),
            }),
        );
    };

    const handleDelete = () => {
        if (baeseos.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 설정을 선택해주세요.');
        }

        baeseos
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteBaeseo({ index: v.index }));
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

                            <th>실적일</th>
                            <th>구분</th>
                            <th style={{ width: 70 }}>회차</th>
                            <th>실적</th>
                            <th>수정보험료</th>
                            <th>정산월</th>
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
                        {baeseos.length === 0 && (
                            <tr>
                                <td colSpan={10}>실적 정보가 없습니다.</td>
                            </tr>
                        )}
                        {baeseos.map((v) => (
                            <BaeseoTemplate
                                key={`baeseo-${uuidv4()}`}
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
