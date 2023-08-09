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

export const HoldingContractTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    const labelType = editable ? 'active' : 'disable';

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="wr-pages-detail__lock">
                <span>준비 중입니다.</span>
            </div>
            <div className="wr-pages-detail__title">
                <strong>우리회사에서 가입한 보험계약 내역</strong>
                <span className="wr-pages-detail__description">
                    총계약건수: 3(장기 1, 자동차 1, 일반 1)
                </span>
            </div>

            <div className="wr-pages-detail__subtitle wr-mt">
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
                            <th style={{ width: '150px' }}>
                                <strong>계약번호</strong>
                            </th>
                            <th style={{ width: '200px' }}>
                                <strong>상품명</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>보종</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>보험료</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>계약일자</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>현상태</strong>
                            </th>
                            <th style={{ width: '150px' }}>
                                <strong>현상태발생일 / 종납회차</strong>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <MyCheckbox label="" />
                            </td>
                            <td>
                                <span>삼성생명</span>
                            </td>
                            <td>
                                <span>00041000013345102</span>
                            </td>
                            <td>
                                <span
                                    className="text-truncate"
                                    style={{ width: 200 }}
                                >
                                    삼성 기업재해보장보험(2301)(무배당)
                                </span>
                            </td>
                            <td>
                                <span>기업보장</span>
                            </td>
                            <td>
                                <span>15,000,000</span>
                            </td>
                            <td>
                                <span>2021-12-28</span>
                            </td>
                            <td>
                                <span>정상</span>
                            </td>
                            <td>
                                <span>2022-10-12 28</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <MyTableExtension
                // onClick={handleShowSettingModal}
                />
            </div>

            <div className="wr-pages-detail__subtitle wr-mt">
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
                            <th style={{ width: '150px' }}>
                                <strong>피보구분</strong>
                            </th>
                            <th style={{ width: '200px' }}>
                                <strong>계약번호</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>상품종목</strong>
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
                                <strong>현상태</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>현상태발생일</strong>
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
                                <span>계약자/피보험자</span>
                            </td>
                            <td>
                                <span>M20236008802000</span>
                            </td>
                            <td>
                                <span>개인용</span>
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
                                <span>정상</span>
                            </td>
                            <td>
                                <span>2022-10-12</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <MyTableExtension
                // onClick={handleShowSettingModal}
                />
            </div>

            <div className="wr-pages-detail__subtitle wr-mt">
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
                            <th style={{ width: '150px' }}>
                                <strong>계약번호</strong>
                            </th>
                            <th style={{ width: '200px' }}>
                                <strong>상품명</strong>
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
                                <strong>현상태</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>현상태발생일</strong>
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
                                <span>M20236008802000</span>
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
                                <span>정상</span>
                            </td>
                            <td>
                                <span>2022-10-12</span>
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
