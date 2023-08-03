import type { FC, ChangeEvent } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { showGuaranteeSettingModal } from '@actions/modal/guarantee-setting.action';
import { AppState } from '@reducers/index';
import { HrState } from '@reducers/hr';
import { MyTableExtension } from '@components/table/Extension';
import { MyCheckbox } from '@components/checkbox';
import { MyButton } from '@components/button';
import {
    deleteGuarantee,
    updateGuarantee,
} from '@actions/hr/set-guarantee.action';
import { Guarantee } from '@models/guarantee';

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

    const labelType = 'disable';

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
                <div className="col-3">
                    <WithLabel id="guarGoal" label="보증목표" type={labelType}>
                        <div className="wr-pages-detail__lock">
                            <p>준비 중입니다.</p>
                        </div>
                        <MyInput
                            type="text"
                            id="guarGoal"
                            className="text-end"
                            placeholder="10,010"
                            readOnly
                        />
                    </WithLabel>
                </div>
                <div className="col-3">
                    <div className="wr-ml">
                        <WithLabel
                            id="guarTotal"
                            label="보증누계(유효)"
                            type={labelType}
                        >
                            <div className="wr-pages-detail__lock">
                                <p>준비 중입니다.</p>
                            </div>
                            <MyInput
                                type="text"
                                id="guarTotal"
                                className="text-end"
                                placeholder="5,465"
                                readOnly
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="col-3">
                    <div className="wr-ml">
                        <WithLabel id="tmotl" label="과부족" type={labelType}>
                            <div className="wr-pages-detail__lock">
                                <p>준비 중입니다.</p>
                            </div>
                            <MyInput
                                type="text"
                                id="tmotl"
                                className="text-end"
                                placeholder="-4,655"
                                readOnly
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="col-3">
                    <div className="wr-ml">
                        <WithLabel
                            id="gAccount"
                            label="유효보증율"
                            type={labelType}
                        >
                            <div className="wr-pages-detail__lock">
                                <p>준비 중입니다.</p>
                            </div>
                            <MyInput
                                type="text"
                                id="gAccount"
                                className="text-end"
                                placeholder="54.7"
                                readOnly
                                unit="%"
                            />
                        </WithLabel>
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <div className="wr-pages-detail__subtitle">
                        <strong>보증설정 내역</strong>
                        {editable && (
                            <div>
                                <MyButton
                                    className="btn-danger"
                                    onClick={handleDeleteGuarantee}
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
                                                onChange={
                                                    handleAllCheckGuarantee
                                                }
                                            />
                                        </th>
                                    )}

                                    <th style={{ width: '100px' }}>
                                        <strong>보증구분</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>보증금(천원)</strong>
                                    </th>
                                    <th>
                                        <strong>내용(계약번호)</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>보증시기</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>보증만기</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>갱신만기</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>유효</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>관리기관</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {guarantees.length === 0 && (
                                    <tr>
                                        <td colSpan={editable ? 9 : 8}>
                                            등록된 설정이 없습니다.
                                        </td>
                                    </tr>
                                )}
                                {guarantees.map((v, index) => {
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
                                        <tr key={`guarantee${index + 1}`}>
                                            {editable && (
                                                <td>
                                                    <MyCheckbox
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
                        {editable && (
                            <MyTableExtension
                                onClick={handleShowSettingModal}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <div className="wr-pages-detail__subtitle">
                        <strong>적립금 관리 내역</strong>
                        <div>
                            <span className="wr-pages-detail__description">
                                목표액 : 5,000, 적립기준 : 소득전체 5%, 단위 :
                                천원
                            </span>
                        </div>
                    </div>
                    <div className="wr-table--normal wr-mb position-relative">
                        <div className="wr-pages-detail__lock">
                            <p>준비 중입니다.</p>
                        </div>
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    <th style={{ width: '100px' }}>
                                        <strong>적립월</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>보증목표액</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>기준액(소득)</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>적립/변동액</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>누계</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>목표잔여</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>예상만기월</strong>
                                    </th>
                                    <th>
                                        <strong>비고</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span>2023-01</span>
                                    </td>
                                    <td className="text-end">
                                        <span>5,000</span>
                                    </td>
                                    <td className="text-end">
                                        <span>4,400</span>
                                    </td>
                                    <td className="text-end">
                                        <span>220</span>
                                    </td>
                                    <td className="text-end">
                                        <span>265</span>
                                    </td>
                                    <td className="text-end">
                                        <span>
                                            <strong>4,535</strong>
                                        </span>
                                    </td>
                                    <td>
                                        <span>2026-04</span>
                                    </td>
                                    <td>
                                        <span className="text-danger">
                                            <strong>부분 상환</strong> &nbsp;
                                        </span>
                                        <span className="text-secondary">
                                            (2023-01-25, 홍길순)
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
