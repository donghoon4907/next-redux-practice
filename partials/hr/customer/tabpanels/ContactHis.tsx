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

export const ContactHisTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
}) => {
    const labelType = editable ? 'active' : 'disable';

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col">
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__title">
                            <strong>상세</strong>
                            <span className="wr-pages-detail__description">
                                작성일시: 2023-12-12 13:22
                            </span>
                        </div>
                        <div className="wr-pages-detail__content">
                            <div className="row">
                                <div className="col-4">
                                    <WithLabel
                                        id="counselingDivision"
                                        label="상담구분"
                                        type={labelType}
                                    >
                                        <MySelect
                                            inputId="counselingDivision"
                                            placeholder="선택"
                                            height={
                                                variables.detailFilterHeight
                                            }
                                            isDisabled={!editable}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col-4">
                                    <div className="wr-ml">
                                        <WithLabel
                                            id="channel"
                                            label="채널"
                                            type={labelType}
                                        >
                                            <MySelect
                                                inputId="counselingDivision"
                                                placeholder="선택"
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                isDisabled={!editable}
                                            />
                                        </WithLabel>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="wr-ml">
                                        <WithLabel
                                            id="category"
                                            label="계약종목"
                                            type={labelType}
                                        >
                                            <MySelect
                                                inputId="counselingDivision"
                                                placeholder="선택"
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                isDisabled={!editable}
                                            />
                                        </WithLabel>
                                    </div>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col-4">
                                    <WithLabel
                                        id="oDate"
                                        label="사유발생일"
                                        type={labelType}
                                    >
                                        <MyDatepicker
                                            id="oDate"
                                            size="md"
                                            placeholder="사유발생일"
                                            disabled={!editable}
                                        />
                                    </WithLabel>
                                </div>
                                <div className="col-4">
                                    <div className="wr-ml">
                                        <WithLabel
                                            id="rDate"
                                            label="응대예정일"
                                            type={labelType}
                                        >
                                            <MyDatepicker
                                                id="rDate"
                                                size="md"
                                                placeholder="응대예정일"
                                                disabled={!editable}
                                            />
                                        </WithLabel>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="wr-ml">
                                        <WithLabel
                                            id="cidx"
                                            label="계약번호"
                                            type={labelType}
                                        >
                                            <MySelect
                                                inputId="cidx"
                                                placeholder="선택"
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                isDisabled={!editable}
                                            />
                                        </WithLabel>
                                    </div>
                                </div>
                            </div>
                            <div className="row wr-mt">
                                <div className="col-8">
                                    <textarea
                                        style={{
                                            width: '100%',
                                            height: 128,
                                            margin: 0,
                                        }}
                                    />
                                </div>
                                <div className="col-4">
                                    <div className="wr-ml">
                                        <WithLabel
                                            id="status"
                                            label="진행상태"
                                            type={labelType}
                                        >
                                            <MySelect
                                                inputId="status"
                                                placeholder="선택"
                                                height={
                                                    variables.detailFilterHeight
                                                }
                                                isDisabled={!editable}
                                            />
                                        </WithLabel>
                                        <WithLabel
                                            id="writer"
                                            label="작성자"
                                            type={labelType}
                                            isRequired={editable}
                                        >
                                            <MyInput
                                                type="text"
                                                id="writer"
                                                placeholder="작성자"
                                                disabled={!editable}
                                            />
                                        </WithLabel>
                                        <div className="wr-pages-detail__toolbar wr-mt">
                                            <MyButton className="btn-outline-secondary">
                                                원래대로
                                            </MyButton>
                                            <MyButton className="btn-primary">
                                                저장
                                            </MyButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wr-pages-detail__subtitle wr-mt">
                <div></div>
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
                                <strong>상담구분</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>채널</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>계약종목</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>계약번호</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>사유발생일</strong>
                            </th>
                            <th style={{ width: '200px' }}>
                                <strong>내용</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>작성자</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>작성일시</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>응대예정일시</strong>
                            </th>
                            <th style={{ width: '100px' }}>
                                <strong>상태</strong>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <MyCheckbox label="" />
                            </td>
                            <td>
                                <span>계약</span>
                            </td>
                            <td>
                                <span>통화</span>
                            </td>
                            <td>
                                <span>자동차</span>
                            </td>
                            <td>
                                <span>M2023589</span>
                            </td>
                            <td>
                                <span>2022-10-12</span>
                            </td>
                            <td>
                                <div
                                    className="text-truncate"
                                    style={{ width: 200 }}
                                >
                                    안녕하세요! 이 텍스트는 테스트를 위해
                                    만들어졌습니다. 이번 테스트는 여러 가지
                                    주제에 대한 내용들을 다룰 예정이며, 다양한
                                    지식과 정보들이 포함되어 있습니다. 자세한
                                    내용을 살펴보시면서 테스트를 진행해 보시기
                                    바랍니다.
                                </div>
                            </td>
                            <td>
                                <span>김서윤</span>
                                <br />
                                <span>(W2323)</span>
                            </td>
                            <td>
                                <span>2022-10-12 14:00</span>
                            </td>
                            <td>
                                <span>2022-10-12 14:00</span>
                            </td>
                            <td>
                                <span>진행중</span>
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
