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

export const SecuredDebtTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    const labelType = editable ? 'active' : 'disable';

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="wr-pages-detail__title">
                <strong>고객보유차량 및 피담보물건</strong>
            </div>

            <div className="wr-pages-detail__subtitle wr-mt">
                <strong>보유차량</strong>
                <div>
                    <MyButton className="btn-danger">선택삭제</MyButton>
                </div>
            </div>
            <div className="wr-table--normal wr-mt">
                <table className="wr-table table">
                    <thead>
                        <tr>
                            <th style={{ width: '30px' }}>
                                <MyCheckbox label="" />
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>차량번호</strong>
                            </th>
                            <th style={{ width: '200px' }}>
                                <strong>차량정보</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>차명코드</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>보험만기일</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>만기안내여부</strong>
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
                                <span>서울35너7819</span>
                            </td>
                            <td>
                                <span>현대 제네시스 G90 5.0</span>
                            </td>
                            <td>
                                <span>61SJ0</span>
                            </td>
                            <td>
                                <span>2023-11-11</span>
                            </td>
                            <td>
                                <span>안내</span>
                            </td>
                            <td>
                                <span>삼성화재 다이렉트 가입중</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <MyTableExtension
                // onClick={handleShowSettingModal}
                />
            </div>

            <div className="wr-pages-detail__subtitle wr-mt">
                <strong>피담보물건</strong>
                <div>
                    <MyButton className="btn-danger">선택삭제</MyButton>
                </div>
            </div>
            <div className="wr-table--normal wr-mt">
                <table className="wr-table table">
                    <thead>
                        <tr>
                            <th style={{ width: '30px' }}>
                                <MyCheckbox label="" />
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>피담보물</strong>
                            </th>
                            <th style={{ width: '200px' }}>
                                <strong>소재지번</strong>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <MyCheckbox label="" />
                            </td>
                            <td>
                                <span>상가</span>
                            </td>
                            <td>
                                <span></span>
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
