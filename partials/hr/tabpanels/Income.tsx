import type { FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { MyInput } from '@components/input';
import { MyRadio } from '@components/radio';
import { MyCheckbox } from '@components/checkbox';
import { MyButton } from '@components/button';
import { useSelect } from '@hooks/use-select';
import { CALC_STANDARD } from '@constants/options/user';

interface Props extends MyTabpanelProps {
    // data: any[];
    editable: boolean;
    // addCount: number;
    // onAddCount: () => void;
}

export const IncomeTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    // data,
    editable,
    // addCount,
    // onAddCount,
}) => {
    // const columns = useColumn(LONG_COL_PERFORMANCE)

    const [calcStandard] = useSelect(CALC_STANDARD);

    const labelType = editable ? 'active' : 'disable';

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col-4">
                    <div className="wr-pages-hr-detail__subtitle">
                        <strong>기본 설정</strong>
                    </div>
                    <WithLabel id="bank" label="은행명" type={labelType}>
                        <MySelect
                            inputId="bank"
                            placeholder={'선택'}
                            placeHolderFontSize={16}
                            height={variables.detailFilterHeight}
                            isDisabled={!editable}
                            options={[]}
                            value={null}
                            onChange={() => {}}
                        />
                    </WithLabel>
                    <WithLabel id="account" label="계좌번호" type={labelType}>
                        <MyInput
                            type="text"
                            id="account"
                            placeholder="계좌번호"
                            readOnly={!editable}
                        />
                    </WithLabel>
                    <WithLabel id="holder" label="예금주" type={labelType}>
                        <MyInput
                            type="text"
                            id="holder"
                            placeholder="예금주"
                            readOnly={!editable}
                        />
                    </WithLabel>
                </div>
                <div className="col-4">
                    <div className="wr-ml">
                        <div className="wr-pages-hr-detail__subtitle">
                            <strong>자동차 규정</strong>
                        </div>
                        <div className="wr-pages-hr-detail__horizontal wr-mb">
                            <MyRadio
                                id="carReg1"
                                name="carReg"
                                label="테이블"
                            />
                            <MyRadio id="carReg2" name="carReg" label="비례" />
                        </div>
                        <WithLabel
                            id="carReg"
                            label="자동차규정"
                            type={labelType}
                        >
                            <MySelect
                                inputId="carReg"
                                placeholder={'선택'}
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                                isDisabled={!editable}
                                options={[]}
                                value={null}
                                onChange={() => {}}
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="col-4">
                    <div className="wr-ml">
                        <div className="wr-pages-hr-detail__subtitle">
                            <strong>일반규정</strong>
                        </div>
                        <div className="wr-pages-hr-detail__horizontal wr-mb">
                            <MyRadio
                                id="normalReg1"
                                name="normalReg"
                                label="지급율"
                            />
                            <MyRadio
                                id="normalReg2"
                                name="normalReg"
                                label="비례"
                            />
                        </div>
                        <WithLabel
                            id="calcStandard"
                            label="산출기준"
                            type={labelType}
                        >
                            <MySelect
                                inputId="calcStandard"
                                placeholder={'선택'}
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                                isDisabled={!editable}
                                {...calcStandard}
                            />
                        </WithLabel>
                        <WithLabel id="payrate" label="지급율" type={labelType}>
                            <MyInput
                                type="text"
                                id="payrate"
                                placeholder="지급율"
                                readOnly={!editable}
                                unit="%"
                            />
                        </WithLabel>
                        <WithLabel
                            id="carReg"
                            label="일반규정"
                            type={labelType}
                        >
                            <MySelect
                                inputId="carReg"
                                placeholder={'선택'}
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                                isDisabled={!editable}
                                options={[]}
                                value={null}
                                onChange={() => {}}
                            />
                        </WithLabel>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-6">
                    <div className="wr-pages-hr-detail__subtitle">
                        <strong>장기 기본지급</strong>
                        <div>
                            <MyCheckbox id="sectionApply" label="구간적용" />
                        </div>
                    </div>
                    <div className="wr-table--normal wr-mb">
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    <th style={{ width: '100px' }}>
                                        <strong>시작월</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>종료월</strong>
                                    </th>
                                    <th style={{ width: '100px' }}>
                                        <strong>규정구분</strong>
                                    </th>
                                    <th>
                                        <strong>규정명</strong>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowSpan={2}>
                                        <span>2022-11</span>
                                    </td>
                                    <td rowSpan={2}>
                                        <span>2023-01</span>
                                    </td>
                                    <td>
                                        <span>구간</span>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>일반</span>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {editable && (
                        <div className="wr-pages-hr-detail__toolbar">
                            <div className="wr-pages-hr-detail__buttons">
                                <MyButton className="btn-danger">삭제</MyButton>
                                <MyButton className="btn-secondary">
                                    수정
                                </MyButton>
                            </div>
                            <div>
                                <MyButton className="btn-primary">
                                    추가
                                </MyButton>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <div className="wr-pages-hr-detail__subtitle">
                            <strong>오버라이딩</strong>
                        </div>
                        <div className="wr-table--normal wr-mb">
                            <table className="wr-table table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '100px' }}>
                                            <strong>규정구분</strong>
                                        </th>
                                        <th style={{ width: '100px' }}>
                                            <strong>본인실적</strong>
                                        </th>
                                        <th>
                                            <strong>산출기준</strong>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span>시작월</span>
                                        </td>
                                        <td>
                                            <span>제외</span>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>리크루팅</span>
                                        </td>
                                        <td>
                                            <span>포함</span>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {editable && (
                            <div className="wr-pages-hr-detail__toolbar">
                                <div className="wr-pages-hr-detail__buttons">
                                    <MyButton className="btn-danger">
                                        삭제
                                    </MyButton>
                                    <MyButton className="btn-secondary">
                                        수정
                                    </MyButton>
                                </div>
                                <div>
                                    <MyButton className="btn-primary">
                                        추가
                                    </MyButton>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
