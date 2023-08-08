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

export const FamilyTabpanel: FC<Props> = ({ id, tabId, hidden, editable }) => {
    const labelType = editable ? 'active' : 'disable';

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="wr-pages-detail__title">
                <strong>가족 및 지인</strong>
            </div>
            <div className="wr-table--normal wr-mt">
                <table className="wr-table table">
                    <thead>
                        <tr>
                            <th style={{ width: '30px' }}>
                                <MyCheckbox label="" />
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>이름</strong>
                            </th>
                            <th style={{ width: '200px' }}>
                                <strong>구분</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>관계</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>생년월일</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>성별</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>보험만기일</strong>
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
                                <span>가족</span>
                            </td>
                            <td>
                                <span>자녀</span>
                            </td>
                            <td>
                                <span>2023-11-11</span>
                            </td>
                            <td>
                                <span>여</span>
                            </td>
                            <td>
                                <span>2023-11-11</span>
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
