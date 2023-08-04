import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { MyTable } from '@components/table';
import { useColumn } from '@hooks/use-column';
import { LONG_COL_PERFORMANCE } from '@constants/column';
import { MyTabpanel } from '@components/tab/Tabpanel';

interface Props extends MyTabpanelProps {
    editable: boolean;
}

export const EndorsementTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col">
                    <div className="wr-table--normal wr-mb">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    {/* {editable && (
                                        <th style={{ width: 30 }}>
                                            <MyCheckbox
                                                label=""
                                                onChange={
                                                    handleAllCheckCommission
                                                }
                                            />
                                        </th>
                                    )} */}

                                    <th style={{ width: '100px' }}>
                                        <strong>발생일</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>구분</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>회차</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>전실적보험료</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>후실적보험료</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>전수정보험료</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>후수정보험료</strong>
                                    </th>
                                    <th>
                                        <strong>비고</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {commissions.length === 0 && (
                                    <tr>
                                        <td colSpan={editable ? 4 : 3}>
                                            등록된 설정이 없습니다.
                                        </td>
                                    </tr>
                                )} */}
                                <tr>
                                    {/* <td>
                                            <MyCheckbox
                                                label=""
                                                checked={v.checked}
                                                onChange={(evt) =>
                                                    handleCheckCommission(
                                                        evt,
                                                        v,
                                                    )
                                                }
                                            />
                                        </td> */}
                                    <td>
                                        <span>2023-06-30</span>
                                    </td>
                                    <td>
                                        <span>실효</span>
                                    </td>
                                    <td>
                                        <span>5</span>
                                    </td>
                                    <td>
                                        <span>24,000</span>
                                    </td>
                                    <td>
                                        <span>12,000</span>
                                    </td>
                                    <td>
                                        <span>545,000</span>
                                    </td>
                                    <td>
                                        <span>30,000</span>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
