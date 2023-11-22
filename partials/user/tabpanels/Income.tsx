import type { ChangeEvent, FC } from 'react';
import type { MyTabpanelProps } from '@components/tab/Tabpanel';
import type { UseSelectOutput } from '@hooks/use-select';
import type { UseInputOutput } from '@hooks/use-input';
import { MyTabpanel } from '@components/tab/Tabpanel';
import { MyRadio } from '@components/radio';
import { MyCheckbox } from '@components/checkbox';
import { UseCheckboxOutput } from '@hooks/use-checkbox';
import { FloatSelect } from '@components/select/Float';
import { FloatInput } from '@components/input/Float';
import { MyUnit } from '@components/Unit';

interface Props extends MyTabpanelProps {
    editable: boolean;
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
    carType,
    onChangeCarType,
    genType,
    onChangeGenType,
    genBase,
    genRate,
    longGrade,
}) => {
    return (
        <MyTabpanel id={id} tabId={tabId} hidden={hidden}>
            <div className="row">
                <div className="flex-fill">
                    <div className="row">
                        <div className="flex-fill">
                            <div className="d-flex justify-content-between">
                                <span className="wr-pages-detail__subtitle">
                                    자동차규정
                                </span>
                                <div className="wr-pages-detail__horizontal">
                                    <MyRadio
                                        label="테이블"
                                        value="테이블"
                                        name="carRule"
                                        disabled={!editable}
                                        checked={carType === '테이블'}
                                        onChange={onChangeCarType}
                                    />
                                    <MyRadio
                                        label="비례"
                                        value="비례"
                                        name="carRule"
                                        disabled={!editable}
                                        checked={carType === '비례'}
                                        onChange={onChangeCarType}
                                    />
                                </div>
                            </div>
                            <FloatSelect
                                label="자동차규정"
                                isDisabled={!editable}
                            />
                        </div>
                        <div className="flex-fill">
                            <div className="d-flex justify-content-between">
                                <span className="wr-pages-detail__subtitle">
                                    일반규정
                                </span>
                                <div className="wr-pages-detail__horizontal">
                                    <MyRadio
                                        label="지급율"
                                        value="지급율"
                                        name="genRule"
                                        disabled={!editable}
                                        checked={genType === '지급율'}
                                        onChange={onChangeGenType}
                                    />
                                    <MyRadio
                                        label="비례"
                                        value="비례"
                                        name="genRule"
                                        disabled={!editable}
                                        checked={genType === '비례'}
                                        onChange={onChangeGenType}
                                    />
                                </div>
                            </div>
                            <FloatInput
                                label="지급비율"
                                readOnly={!editable}
                                after={<MyUnit placement="last">%</MyUnit>}
                                {...genRate}
                            />
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="flex-fill">
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex justify-content-between">
                                        <span className="wr-pages-detail__subtitle">
                                            장기 기본지급
                                        </span>
                                        <div className="wr-pages-detail__horizontal">
                                            <MyCheckbox
                                                label="구간적용"
                                                disabled={!editable}
                                                {...longGrade}
                                            />
                                        </div>
                                    </div>
                                    <div className="wr-table--normal wr-mb position-relative">
                                        <table className="wr-table table">
                                            <thead>
                                                <tr>
                                                    {editable && (
                                                        <th
                                                            style={{
                                                                width: 30,
                                                            }}
                                                        >
                                                            <MyCheckbox label="" />
                                                        </th>
                                                    )}

                                                    <th>시작월</th>
                                                    <th>종료월</th>
                                                    <th>규정구분</th>
                                                    <th>규정명</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    {editable && (
                                                        <td>
                                                            <MyCheckbox label="" />
                                                        </td>
                                                    )}

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
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wr-divider__vertical"></div>
                <div className="flex-fill"></div>
            </div>
        </MyTabpanel>
    );
};
