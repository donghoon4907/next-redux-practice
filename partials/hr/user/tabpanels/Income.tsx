import type { ChangeEvent, FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { UseSelectOutput } from '@hooks/use-select';
import type { UseInputOutput } from '@hooks/use-input';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { WithLabel } from '@components/WithLabel';
import { MySelect } from '@components/select';
import variables from '@styles/_variables.module.scss';
import { MyInput } from '@components/input';
import { MyRadio } from '@components/radio';
import { MyCheckbox } from '@components/checkbox';
import { MyTableExtension } from '@components/table/Extension';
import { UseCheckboxOutput } from '@hooks/use-checkbox';

interface Props extends MyTabpanelProps {
    editable: boolean;
    bank: UseSelectOutput;
    account: UseInputOutput;
    holder: UseInputOutput;
    carType: string;
    onChangeCarType: (evt: ChangeEvent<HTMLInputElement>) => void;
    genType: string;
    onChangeGenType: (evt: ChangeEvent<HTMLInputElement>) => void;
    genBase: UseSelectOutput;
    genRate: UseInputOutput;
    longGrade: UseCheckboxOutput;
}

export const IncomeTabpanel: FC<Props> = ({
    id,
    tabId,
    hidden,
    editable,
    bank,
    account,
    holder,
    carType,
    onChangeCarType,
    genType,
    onChangeGenType,
    genBase,
    genRate,
    longGrade,
}) => {
    const labelType = editable ? 'active' : 'disable';

    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="col-4">
                    <div className="wr-pages-detail__subtitle">
                        <strong>기본 설정</strong>
                    </div>
                    <WithLabel id="bank" label="은행명" type={labelType}>
                        <MySelect
                            inputId="bank"
                            placeholder="선택"
                            placeHolderFontSize={16}
                            height={variables.detailFilterHeight}
                            isDisabled={!editable}
                            {...bank}
                        />
                    </WithLabel>
                    <WithLabel id="account" label="계좌번호" type={labelType}>
                        <MyInput
                            type="text"
                            id="account"
                            placeholder="계좌번호"
                            disabled={!editable}
                            {...account}
                        />
                    </WithLabel>
                    <WithLabel id="holder" label="예금주" type={labelType}>
                        <MyInput
                            type="text"
                            id="holder"
                            placeholder="예금주"
                            disabled={!editable}
                            {...holder}
                        />
                    </WithLabel>
                </div>
                <div className="col-4">
                    <div className="wr-ml">
                        <div className="wr-pages-detail__subtitle">
                            <strong>자동차 규정</strong>
                        </div>
                        <div className="wr-pages-detail__horizontal wr-mb">
                            <MyRadio
                                id="carTypeTable"
                                label="테이블"
                                value="테이블"
                                disabled={!editable}
                                checked={carType === '테이블'}
                                onChange={onChangeCarType}
                            />
                            <MyRadio
                                id="carTypeProportion"
                                label="비례"
                                value="비례"
                                disabled={!editable}
                                checked={carType === '비례'}
                                onChange={onChangeCarType}
                            />
                        </div>
                        <WithLabel
                            id="carReg"
                            label="자동차규정"
                            type="disable"
                        >
                            <div className="wr-pages-detail__lock">
                                <p>준비 중입니다.</p>
                            </div>
                            <MySelect
                                inputId="carReg"
                                placeholder={'선택'}
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                                isDisabled={true}
                                options={[]}
                                value={null}
                                onChange={() => {}}
                            />
                        </WithLabel>
                    </div>
                </div>
                <div className="col-4">
                    <div className="wr-ml">
                        <div className="wr-pages-detail__subtitle">
                            <strong>일반규정</strong>
                        </div>
                        <div className="wr-pages-detail__horizontal wr-mb">
                            <MyRadio
                                id="genTypeRate"
                                label="지급율"
                                value="지급율"
                                disabled={!editable}
                                checked={genType === '지급율'}
                                onChange={onChangeGenType}
                            />
                            <MyRadio
                                id="genTypeProportion"
                                label="비례"
                                value="비례"
                                disabled={!editable}
                                checked={genType === '비례'}
                                onChange={onChangeGenType}
                            />
                        </div>
                        <WithLabel
                            id="genBase"
                            label="산출기준"
                            type={labelType}
                        >
                            <MySelect
                                inputId="genBase"
                                placeholder="선택"
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                                isDisabled={!editable}
                                {...genBase}
                            />
                        </WithLabel>
                        <WithLabel id="genRate" label="지급율" type={labelType}>
                            <MyInput
                                type="text"
                                id="genRate"
                                placeholder="지급율"
                                className="text-end"
                                disabled={!editable}
                                unit="%"
                                {...genRate}
                            />
                        </WithLabel>
                        <WithLabel
                            id="genReg"
                            label="일반규정"
                            type={'disable'}
                        >
                            <div className="wr-pages-detail__lock">
                                <p>준비 중입니다.</p>
                            </div>
                            <MySelect
                                inputId="genReg"
                                placeholder={'선택'}
                                placeHolderFontSize={16}
                                height={variables.detailFilterHeight}
                                isDisabled={true}
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
                    <div className="wr-pages-detail__subtitle">
                        <strong>장기 기본지급</strong>
                        <div>
                            <MyCheckbox
                                label="구간적용"
                                id="longGrade"
                                disabled={!editable}
                                {...longGrade}
                            />
                        </div>
                    </div>
                    <div className="wr-table--normal wr-mb position-relative">
                        <div className="wr-pages-detail__lock">
                            <p>준비 중입니다.</p>
                        </div>
                        <table className="wr-table table">
                            <thead>
                                <tr>
                                    <th style={{ width: 30 }}>
                                        <MyCheckbox
                                            label=""
                                            // onChange={handleAllCheckDamages}
                                        />
                                    </th>
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
                                    <td>
                                        <MyCheckbox label="" />
                                    </td>
                                    <td rowSpan={2}>
                                        <span>2022-11</span>
                                    </td>
                                    <td rowSpan={2}>
                                        <span>2023-01</span>
                                    </td>
                                    <td>
                                        <span>구간</span>
                                    </td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td>
                                        <MyCheckbox label="" />
                                    </td>
                                    <td>
                                        <span>일반</span>
                                    </td>
                                    <td>-</td>
                                </tr>
                            </tbody>
                        </table>
                        <MyTableExtension
                            onClick={() => alert('준비 중입니다.')}
                        />
                    </div>
                    {/* {editable && (
                        <div className="wr-pages-detail__toolbar">
                            <div className="wr-pages-detail__buttons">
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
                    )} */}
                </div>
                <div className="col-6">
                    <div className="wr-ml">
                        <div className="wr-pages-detail__subtitle">
                            <strong>오버라이딩</strong>
                        </div>
                        <div className="wr-table--normal wr-mb position-relative">
                            <div className="wr-pages-detail__lock">
                                <p>준비 중입니다.</p>
                            </div>
                            <table className="wr-table table">
                                <thead>
                                    <tr>
                                        <th style={{ width: 30 }}>
                                            <MyCheckbox
                                                label=""
                                                // onChange={handleAllCheckDamages}
                                            />
                                        </th>
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
                                            <MyCheckbox label="" />
                                        </td>
                                        <td>
                                            <span>시작월</span>
                                        </td>
                                        <td>
                                            <span>제외</span>
                                        </td>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <MyCheckbox label="" />
                                        </td>
                                        <td>
                                            <span>리크루팅</span>
                                        </td>
                                        <td>
                                            <span>포함</span>
                                        </td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>
                            <MyTableExtension
                                onClick={() => alert('준비 중입니다.')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MyTabpanel>
    );
};
