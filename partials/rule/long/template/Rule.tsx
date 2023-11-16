import type { FC, ChangeEvent } from 'react';
import type { Rule } from '@models/rule';
import type { CoreEditableComponent } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { RuleState } from '@reducers/rule';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNumbericInput } from '@hooks/use-input';
import { useSelect } from '@hooks/use-select';
import { MySelect } from '@components/select';
import { findSelectOption } from '@utils/getter';
import { MyCheckbox } from '@components/checkbox';
import { updateRule } from '@actions/rule/set-rule.action';
import { useApi } from '@hooks/use-api';
import { getCalspecsRequest } from '@actions/rule/get-calspecs';
import { isNumberic } from '@utils/validation';
import { MyInput } from '@components/input';

interface Props extends Rule, CoreEditableComponent {
    visibility?: boolean;
}

export const LongRuleTemplate: FC<Props> = ({
    editable,
    visibility,
    ...rest
}) => {
    const dispatch = useDispatch();

    const { longUseCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { sudists } = useSelector<AppState, RuleState>((state) => state.rule);

    const getCalspecs = useApi(getCalspecsRequest);

    // 보험사
    const [wcode] = useSelect(
        longUseCompanies,
        findSelectOption(rest.wcode, longUseCompanies),
        {
            callbackOnChange: (next) => {
                if (next) {
                    dispatch(
                        updateRule({
                            index: rest.index,
                            wcode: next.value,
                        }),
                    );

                    getCalspecs(
                        { spe: 'long', wcode: next.value },
                        (nextCalSpecs) => {
                            setCalspecs(nextCalSpecs);
                        },
                    );
                }
            },
        },
    );
    // 수수료항목
    const [sudist] = useSelect(
        sudists,
        findSelectOption(rest.sudists, sudists),
        {
            callbackOnChange: (next) => {
                if (next) {
                    dispatch(
                        updateRule({
                            index: rest.index,
                            sudists: next.value,
                        }),
                    );
                }
            },
        },
    );
    const [calspecs, setCalspecs] = useState([]);
    // 정산종목
    const [cal_spec] = useSelect(
        calspecs,
        findSelectOption(rest.cal_spec, calspecs),
        {
            callbackOnChange: (next) => {
                if (next) {
                    dispatch(
                        updateRule({
                            index: rest.index,
                            cal_spec: next.value,
                        }),
                    );
                }
            },
        },
    );

    // 시작회차
    const [swhoi] = useNumbericInput(
        isNumberic(rest.swhoi) ? rest.swhoi!.toString() : '',
        {
            callbackOnBlur: (next) => {
                if (isNumberic(next)) {
                    dispatch(
                        updateRule({
                            index: rest.index,
                            swhoi: next,
                        }),
                    );
                }
            },
        },
    );

    // 종료회차
    const [ewhoi] = useNumbericInput(
        isNumberic(rest.ewhoi) ? rest.ewhoi!.toString() : '',
        {
            callbackOnBlur: (next) => {
                if (isNumberic(next)) {
                    dispatch(
                        updateRule({
                            index: rest.index,
                            ewhoi: next,
                        }),
                    );
                }
            },
        },
    );

    // 지급율
    const [rate] = useNumbericInput(
        isNumberic(rest.rate) ? rest.rate!.toString() : '',
        {
            callbackOnBlur: (next) => {
                if (isNumberic(next)) {
                    dispatch(
                        updateRule({
                            index: rest.index,
                            rate: next,
                        }),
                    );
                }
            },
        },
    );

    const handleCheck = (evt: ChangeEvent<HTMLInputElement>, v: Rule) => {
        dispatch(updateRule({ ...v, checked: evt.target.checked }));
    };

    return (
        <tr hidden={!visibility}>
            {editable && (
                <td>
                    <MyCheckbox
                        label=""
                        checked={rest.checked}
                        onChange={(evt) => handleCheck(evt, rest)}
                    />
                </td>
            )}
            <td>
                {editable ? (
                    <MySelect placeholder="선택" {...wcode} />
                ) : (
                    wcode.value?.label
                )}
            </td>
            <td>
                {editable ? (
                    <MySelect placeholder="선택" {...sudist} />
                ) : (
                    sudist.value?.label
                )}
            </td>
            <td>
                {editable ? (
                    <MySelect placeholder="선택" {...cal_spec} />
                ) : (
                    cal_spec.value?.label
                )}
            </td>
            <td>
                {editable ? (
                    <MyInput type="number" className="text-end" {...swhoi} />
                ) : (
                    swhoi.value
                )}
            </td>
            <td>
                {editable ? (
                    <MyInput type="number" className="text-end" {...ewhoi} />
                ) : (
                    ewhoi.value
                )}
            </td>
            <td>
                {editable ? (
                    <MyInput type="number" className="text-end" {...rate} />
                ) : (
                    rate.value
                )}
            </td>
        </tr>
    );
};
