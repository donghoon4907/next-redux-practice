import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { useDispatch, useSelector } from 'react-redux';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { MyButton } from '@components/button';
import { useSelect } from '@hooks/use-select';
import { CALC_STANDARD } from '@constants/options/user';
import { showGuaranteeSettingModal } from '@actions/modal/guarantee-setting.action';
import { AppState } from '@reducers/index';
import { HrState } from '@reducers/hr';
import { MyTableExtension } from '@components/table/Extension';

interface Props extends MyTabpanelProps {
    // data: any[];
    editable: boolean;
    // addCount: number;
    // onAddCount: () => void;
}

export const GuaranteeTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    // data,
    editable,
    // addCount,
    // onAddCount,
}) => {
    const dispatch = useDispatch();

    const { guarantees } = useSelector<AppState, HrState>((state) => state.hr);

    const labelType = 'disable';

    const handleShowSettingModal = () => {
        dispatch(showGuaranteeSettingModal());
    };

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col-3">
                    <WithLabel id="guarGoal" label="보증목표" type={labelType}>
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
                            id="account"
                            label="유효보증율"
                            type={labelType}
                        >
                            <MyInput
                                type="text"
                                id="account"
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
                    <div className="wr-pages-hr-detail__subtitle">
                        <strong>보증설정 내역</strong>
                        {/* <div>
                            <MyButton
                                className="btn-primary"
                                onClick={handleShowSettingModal}
                            >
                                추가
                            </MyButton>
                        </div> */}
                    </div>
                    <div className="wr-table--normal wr-mb">
                        <table className="wr-table table">
                            <thead>
                                <tr>
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
                                {guarantees.map((v, index) => {
                                    return (
                                        <tr key={`guarantee${index + 1}`}>
                                            <td>
                                                <span>{v.kind}</span>
                                            </td>
                                            <td className="text-end">
                                                <span>
                                                    {v.g_money?.toLocaleString()}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    {v.kind === '적립금'
                                                        ? `목표 ${v.accumulate_goal?.toLocaleString()} / 장기수수료 ${
                                                              v.accumulate_rate
                                                          }`
                                                        : v.remark}
                                                </span>
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
                                                <span>N</span>
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
                        <MyTableExtension onClick={handleShowSettingModal} />
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <div className="wr-pages-hr-detail__subtitle">
                        <strong>적립금 관리 내역</strong>
                        <div>
                            <span className="wr-pages-hr-detail__description">
                                목표액 : 5,000, 적립기준 : 소득전체 5%, 단위 :
                                천원
                            </span>
                        </div>
                    </div>
                    <div className="wr-table--normal wr-mb">
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
