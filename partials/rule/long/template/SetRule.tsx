import type { FC, ChangeEvent } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { RuleState } from '@reducers/rule';
import type { CoreEditableComponent } from '@interfaces/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MyCheckbox } from '@components/checkbox';
import { MyTableToolbar } from '@components/table/Toolbar';
import { generateAllOption, generateIndex } from '@utils/generate';
import { useApi } from '@hooks/use-api';
import { getCalspecsRequest } from '@actions/rule/get-calspecs';
import { useSelect } from '@hooks/use-select';
import {
    createRule,
    deleteRule,
    updateRule,
} from '@actions/rule/set-rule.action';
import { FloatSelect } from '@components/select/Float';
import { isEmpty } from '@utils/validator/common';

import { LongRuleTemplate } from './Rule';

interface Props extends CoreEditableComponent {}

export const SetRuleTemplate: FC<Props> = ({ editable }) => {
    const dispatch = useDispatch();

    const { longUseCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { sudists, rules } = useSelector<AppState, RuleState>(
        (state) => state.rule,
    );

    const getCalspecs = useApi(getCalspecsRequest);

    // 보험사
    const [wcode] = useSelect(generateAllOption(longUseCompanies), null, {
        callbackOnChange: (next) => {
            // 전체가 아닌 경우
            if (next && next.value) {
                getCalspecs(
                    { spe: 'long', wcode: next.value },
                    (nextCalspecs) => {
                        setCalspecs(nextCalspecs);
                    },
                );
            } else {
                setCalspecs([]);
            }
        },
    });
    // 수수료항목
    const [sudist] = useSelect(generateAllOption(sudists), null);
    // 정산종목
    const [calspecs, setCalspecs] = useState([]);
    const [calspec] = useSelect(generateAllOption(calspecs), null);

    const handleAllCheck = (evt: ChangeEvent<HTMLInputElement>) => {
        rules.forEach((v) => {
            dispatch(updateRule({ ...v, checked: evt.target.checked }));
        });
    };

    const handleCreate = () => {
        const index = generateIndex(rules);

        dispatch(
            createRule({
                index,
                checked: false,
                rule_type: 'table',
            }),
        );
    };

    const handleDelete = () => {
        if (rules.findIndex((v) => v.checked) === -1) {
            return alert('삭제할 설정을 선택해주세요.');
        }

        rules
            .filter((v) => v.checked)
            .forEach((v) => {
                dispatch(deleteRule({ index: v.index }));
            });
    };

    return (
        <div className="wr-pages-detail__block h-100 w-100">
            <div className="wr-pages-detail__content">
                <div className="wr-pages-detail__subtitle wr-border-b">
                    <strong>테이블 지급 규정</strong>
                </div>
                <div className="row wr-mt wr-mb">
                    <div className="col-3">
                        <FloatSelect label="보험사" {...wcode} />
                    </div>
                    <div className="col-3">
                        <FloatSelect label="수수료항목" {...sudist} />
                    </div>
                    <div className="col-3">
                        <FloatSelect label="정산종목" {...calspec} />
                    </div>
                </div>
                <MyTableToolbar
                    editable
                    onCreate={handleCreate}
                    onDelete={handleDelete}
                />
                <div className="wr-table--normal">
                    <table className="wr-table table">
                        <thead>
                            <tr>
                                <th style={{ width: '30px' }}>
                                    <MyCheckbox
                                        label=""
                                        onChange={handleAllCheck}
                                    />
                                </th>
                                <th>보험사</th>
                                <th>수수료항목</th>
                                <th>정산종목</th>
                                {/* <th>산출기준</th> */}
                                <th style={{ width: 80 }}>시작회차</th>
                                <th style={{ width: 80 }}>종료회차</th>
                                <th style={{ width: 80 }}>지급율</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rules.map((v) => {
                                let visibility = true;

                                if (wcode.value) {
                                    // 전체가 아닌 경우
                                    if (!isEmpty(wcode.value.value)) {
                                        // 일치하지 않는 경우
                                        if (wcode.value.value !== v.wcode) {
                                            visibility = false;
                                        }
                                    }
                                }

                                if (sudist.value) {
                                    if (!isEmpty(sudist.value.value)) {
                                        if (sudist.value.value !== v.sudists) {
                                            visibility = false;
                                        }
                                    }
                                }

                                if (calspec.value) {
                                    if (!isEmpty(calspec.value.value)) {
                                        if (
                                            calspec.value.value !== v.cal_spec
                                        ) {
                                            visibility = false;
                                        }
                                    }
                                }

                                return (
                                    <LongRuleTemplate
                                        key={`rule-${v.index}`}
                                        editable={editable}
                                        visibility={visibility}
                                        {...v}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
