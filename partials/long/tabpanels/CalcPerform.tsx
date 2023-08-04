import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { MyTable } from '@components/table';
import { useColumn } from '@hooks/use-column';
import { LONG_COL_PERFORMANCE } from '@constants/column';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { MyButton } from '@components/button';

interface Props extends MyTabpanelProps {
    editable: boolean;
}

export const CalcPerformTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    const labelType = editable ? 'active' : 'disable';

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col-3">
                    <WithLabel id="grade" label="등급" type="disable">
                        <MySelect
                            inputId="grade"
                            placeholder="지점"
                            placeHolderFontSize={16}
                            height={variables.detailFilterHeight}
                            isDisabled={true}
                        />
                    </WithLabel>
                </div>
            </div>
            <div className="row wr-mt">
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
                                        <strong>업적월</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>납입회차</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>정산회차</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>실적보험료</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>수정보험료</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>산출기준</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>지급율(계)</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>수수료계</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>정산담당</strong>
                                    </th>
                                    <th>
                                        <strong>상세</strong>
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
                                        <span>2023-06-30</span>
                                    </td>
                                    <td>
                                        <span>-</span>
                                    </td>
                                    <td>
                                        <span>-</span>
                                    </td>
                                    <td>
                                        <span>24,000</span>
                                    </td>
                                    <td>
                                        <span>12,000</span>
                                    </td>
                                    <td>
                                        <span></span>
                                    </td>
                                    <td>
                                        <span></span>
                                    </td>
                                    <td>
                                        <span></span>
                                    </td>
                                    <td>
                                        <span></span>
                                    </td>
                                    <td>
                                        <MyButton className="btn-primary">
                                            보기
                                        </MyButton>
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
