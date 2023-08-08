import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MyCheckbox } from '@components/checkbox';
import { MyInput } from '@components/input';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { MyDatepicker } from '@components/datepicker';
import { MyButton } from '@components/button';
import { MyTableExtension } from '@components/table/Extension';

interface Props extends MyTabpanelProps {
    editable: boolean;
}

export const AnniversaryTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    const labelType = editable ? 'active' : 'disable';

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="wr-pages-detail__title">
                <strong>기념일</strong>
            </div>
            <div className="wr-table--normal wr-mt">
                <table className="wr-table table">
                    <thead>
                        <tr>
                            <th style={{ width: '30px' }}>
                                <MyCheckbox label="" />
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>대상자</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>대상자구분</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>기념일내용</strong>
                            </th>
                            <th style={{ width: '200px' }}>
                                <strong>기념일상세</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>기념일</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>양/음</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>관리여부</strong>
                            </th>
                            <th>
                                <strong>비고</strong>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <MyCheckbox label="" />
                            </td>
                            <td>
                                <span>홍길순</span>
                            </td>
                            <td>
                                <span>자녀</span>
                            </td>
                            <td>
                                <span>생일</span>
                            </td>
                            <td>
                                <span></span>
                            </td>
                            <td>
                                <span>2023-11-11</span>
                            </td>
                            <td>
                                <span>양력</span>
                            </td>
                            <td>
                                <span>자동 알림톡</span>
                            </td>
                            <td>
                                <span>옥스포드 유학중</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <MyTableExtension
                // onClick={handleShowSettingModal}
                />
            </div>
        </MyTabpanel>
    );
};
