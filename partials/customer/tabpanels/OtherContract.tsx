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

export const OtherContractTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    const labelType = editable ? 'active' : 'disable';

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="wr-pages-detail__title">
                <strong>타사에서 가입한 보험계약 내역</strong>
                <span className="wr-pages-detail__description">
                    총계약건수: 3(장기 1, 자동차 1, 일반 1)
                </span>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <div className="wr-pages-detail__subtitle">
                        <strong>장기보험 (1)</strong>
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
                                        <strong>보험사</strong>
                                    </th>
                                    <th style={{ width: '200px' }}>
                                        <strong>상품명</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>세부보종</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>보험료</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>계약일자</strong>
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
                                        <span>삼성화재</span>
                                    </td>
                                    <td>
                                        <span
                                            className="text-truncate"
                                            style={{ width: 200 }}
                                        >
                                            무배당 삼성화재 운전자보험 안심동행
                                        </span>
                                    </td>
                                    <td>
                                        <span>운전자</span>
                                    </td>
                                    <td>
                                        <span>15,000,000</span>
                                    </td>
                                    <td>
                                        <span>2021-12-28</span>
                                    </td>
                                    <td>
                                        <span>
                                            납입중 (2025-12까지), 인슈코아
                                            (장정숙)
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <MyTableExtension
                        // onClick={handleShowSettingModal}
                        />
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <div className="wr-pages-detail__subtitle">
                        <strong>자동차보험 (1)</strong>
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
                                        <strong>보험사</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>차량번호</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>총보험료</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>개시일자</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>만기일자</strong>
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
                                        <span>현대해상</span>
                                    </td>
                                    <td>
                                        <span>서울35너7819</span>
                                    </td>
                                    <td>
                                        <span>15,000,000</span>
                                    </td>
                                    <td>
                                        <span>2022-10-12</span>
                                    </td>
                                    <td>
                                        <span>2022-10-12</span>
                                    </td>
                                    <td>
                                        <span>안내</span>
                                    </td>
                                    <td>
                                        <span>정상</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <MyTableExtension
                        // onClick={handleShowSettingModal}
                        />
                    </div>
                </div>
            </div>
            <div className="row wr-mt">
                <div className="col">
                    <div className="wr-pages-detail__subtitle">
                        <strong>일반보험 (1)</strong>
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
                                        <strong>보험사</strong>
                                    </th>
                                    <th style={{ width: '200px' }}>
                                        <strong>상품</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>보험료</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>개시일자</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>만기일자</strong>
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
                                        <span>현대해상</span>
                                    </td>
                                    <td>
                                        <span>삼성비지니스패키지보험</span>
                                    </td>
                                    <td>
                                        <span>15,000,000</span>
                                    </td>
                                    <td>
                                        <span>2022-10-12</span>
                                    </td>
                                    <td>
                                        <span>2022-10-12</span>
                                    </td>
                                    <td>
                                        <span>안내</span>
                                    </td>
                                    <td>
                                        <span>보유상가 화재</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <MyTableExtension
                        // onClick={handleShowSettingModal}
                        />
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
