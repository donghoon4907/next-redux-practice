import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { RuleState } from '@reducers/rule';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MyFooter } from '@components/footer';
import { MyButton } from '@components/button';
import { FloatInput } from '@components/input/Float';
import { FloatSelect } from '@components/select/Float';
import commonConstants from '@constants/options/common';
import { useSelect } from '@hooks/use-select';
import { useApi } from '@hooks/use-api';
import { getRuleOrgasRequest } from '@actions/rule/get-orgas';
import { MyTableToolbar } from '@components/table/Toolbar';
import { CreateLongRuleDTO } from '@dto/rule/Long.dto';
import { useInput } from '@hooks/use-input';
import { createLongRuleRequest } from '@actions/rule/long/create.action';
import { isEmpty } from '@utils/validator/common';

import { SetRuleTemplate } from './template/SetRule';

interface Props {
    /**
     * 모드: 등록 / 수정
     */
    mode: 'create' | 'update';
    /**
     * PK
     */
    idx?: number;
    /**
     * 담당자 기본 ID
     */
    defaultUserid: string;
}

export const LongRuleForm: FC<Props> = ({ mode, idx = -1, defaultUserid }) => {
    const displayName = 'wr-pages-long-detail';

    const { makeableRates, orgas, grades, hwans, rules } = useSelector<
        AppState,
        RuleState
    >((state) => state.rule);

    const getOrgas = useApi(getRuleOrgasRequest);

    const createLongRule = useApi(createLongRuleRequest);

    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);
    // 장기 지급 제도명
    const [rule_name] = useInput('');
    // 제도 적용 등급
    const [rule_rate] = useSelect(makeableRates, null, {
        callbackOnChange: (next) => {
            if (next) {
                getOrgas({ rate: next.value });
            }
        },
    });
    // 제도 적용 조직
    const [orga_idx] = useSelect(orgas, null);
    // 사용 유무
    const [use] = useSelect(commonConstants.yn, null);
    // 구간 규정 유무
    const [grade] = useSelect(commonConstants.yn, null, {
        callbackOnChange: (next) => {
            if (next) {
                setGradeRate(null);
            }
        },
    });
    // 구간 등급
    const [grade_rate, setGradeRate] = useSelect(grades, null);
    // 환수 제도
    const [hwan_idx] = useSelect(hwans, null);

    const handleCreate = () => {
        const payload = createPayload();

        const createDto = new CreateLongRuleDTO(payload);

        if (createDto.requiredValidate()) {
            createLongRule(createDto.getPayload(), () => {
                alert('등록되었습니다.');
            });
        }
    };

    const createPayload = () => {
        // 필수값
        const payload: any = {
            insert_userid: defaultUserid,
            remove: {},
        };

        // 장기 지급 제도명
        if (!isEmpty(rule_name.value)) {
            payload['rule_name'] = rule_name.value;
        }
        // 제도 적용 등급
        if (rule_rate.value) {
            payload['rule_rate'] = rule_rate.value.value;
        }
        // 제도 적용 조직
        if (orga_idx.value) {
            payload['orga_idx'] = orga_idx.value.value;
        }
        // 사용유무
        if (use.value) {
            payload['use'] = use.value.value === 'Y' ? true : false;
        }
        // 구간 규정 여부
        if (grade.value) {
            payload['grade'] = grade.value.value === 'Y' ? true : false;
        }
        // 구간 등급
        if (grade_rate.value) {
            payload['grade_rate'] = grade_rate.value.value;
        }
        // 환수제도
        if (hwan_idx.value) {
            payload['hwan_idx'] = hwan_idx.value.value;
        }
        // 규정목록
        if (rules.length > 0) {
            payload['long_content'] = rules;
        }

        return payload;
    };

    return (
        <>
            <div className="d-flex justify-content-end wr-pages-detail__comment">
                &quot;공동규정&quot;과 &quot;지정규정&quot;이 같이 지정된 경우
                &quot;지정규정&quot;이 적용됩니다.
            </div>
            <div className="wr-pages-detail__block">
                <div className="wr-pages-detail__content p-15">
                    <div className="row">
                        <div className="col-2">
                            <FloatInput
                                label="장기 지급 제도명"
                                isRequired
                                {...rule_name}
                            />
                        </div>
                        <div className="col-2">
                            <FloatSelect
                                label="제도 적용 등급"
                                {...rule_rate}
                            />
                        </div>
                        <div className="col-2">
                            <FloatSelect label="제도 적용 조직" {...orga_idx} />
                        </div>
                        <div className="col-2">
                            <FloatSelect label="사용유무" {...use} />
                        </div>
                    </div>
                    <div className="row wr-mt">
                        <div className="col-2">
                            <div className="row">
                                <div className="flex-fill">
                                    <FloatSelect
                                        label="구간 규정 여부"
                                        {...grade}
                                    />
                                </div>
                                <div className="flex-fill">
                                    <FloatSelect
                                        label="구간등급"
                                        isDisabled={grade.value?.value === 'N'}
                                        {...grade_rate}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <FloatSelect label="환수 제도" {...hwan_idx} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${displayName} wr-pages-detail wr-mt`}>
                <div className="flex-fill">
                    <SetRuleTemplate editable={editable} />
                </div>
                <div className="flex-fill">
                    <div className="wr-pages-detail__block h-100 w-100">
                        <div className="wr-pages-detail__content">
                            <div className="wr-pages-detail__subtitle wr-border-b">
                                <strong>원수수료 기준 비례 지급 규정</strong>
                            </div>
                            <div className="row wr-mt wr-mb">
                                <div className="col-3">
                                    <FloatSelect label="보험사" isDisabled />
                                </div>
                                <div className="col-3">
                                    <FloatSelect
                                        label="수입수수료항목"
                                        isDisabled
                                    />
                                </div>
                                <div className="col-3">
                                    <FloatSelect
                                        label="환수정산방식"
                                        isDisabled
                                    />
                                </div>
                            </div>
                            <MyTableToolbar
                                editable
                                onCreate={() => {
                                    alert('준비 중입니다.');
                                }}
                                onDelete={() => {
                                    alert('준비 중입니다.');
                                }}
                            />
                            <div className="wr-table--normal">
                                <table className="wr-table table">
                                    <thead>
                                        <tr>
                                            <th>보험사</th>
                                            <th>지급수수료항목</th>
                                            <th>수입수수료종목</th>
                                            <th>시작회차</th>
                                            <th>종료회차</th>
                                            <th>비례율</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MyFooter>
                <div className="wr-footer__between">
                    <div></div>
                    <div className="wr-pages-detail__buttons">
                        <MyButton
                            type="button"
                            className="btn-primary btn-sm"
                            onClick={handleCreate}
                        >
                            저장
                        </MyButton>
                    </div>
                </div>
            </MyFooter>
        </>
    );
};
