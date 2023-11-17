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
import { MyUnit } from '@components/Unit';
import { MyCheckbox } from '@components/checkbox';
import { MySelect } from '@components/select';
import { MyInput } from '@components/input';

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
/** 장기 환수 폼 */
export const LongHwanForm: FC<Props> = ({ mode, idx = -1, defaultUserid }) => {
    const displayName = 'wr-pages-long-detail';

    const { makeableRates, orgas, grades, hwans, rules } = useSelector<
        AppState,
        RuleState
    >((state) => state.rule);

    const getOrgas = useApi(getRuleOrgasRequest);

    const createLongRule = useApi(createLongRuleRequest);

    // 수정 모드 여부
    const [editable, setEditable] = useState(mode === 'create' ? true : false);
    // 제도명
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
                </div>
            </div>
            <div className={`${displayName} wr-pages-detail wr-mt`}>
                <div className="flex-fill">
                    <div className="wr-pages-detail__block">
                        <div className="wr-pages-detail__content">
                            <div className="wr-pages-detail__subtitle wr-pb wr-border-b">
                                <strong>손해보험 환수 규정</strong>
                                <div className="wr-pages-detail__buttons">
                                    <FloatInput
                                        label="철회 환수율"
                                        after={
                                            <MyUnit placement="last">%</MyUnit>
                                        }
                                    />
                                    <FloatInput
                                        label="취소 환수율"
                                        after={
                                            <MyUnit placement="last">%</MyUnit>
                                        }
                                    />
                                    <FloatInput
                                        label="부활 환급율"
                                        after={
                                            <MyUnit placement="last">%</MyUnit>
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row wr-mt wr-mb">
                                <div className="wr-pages-detail__subtitle">
                                    미유지 (실효/해지), 감액환수율
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
                                <div className="wr-table__wrap">
                                    <table className="wr-table table">
                                        <thead>
                                            <tr>
                                                <th
                                                    rowSpan={2}
                                                    style={{
                                                        width: '30px',
                                                    }}
                                                >
                                                    <MyCheckbox label="" />
                                                </th>
                                                <th
                                                    rowSpan={2}
                                                    style={{ width: 200 }}
                                                >
                                                    보험사
                                                </th>
                                                <th
                                                    rowSpan={2}
                                                    style={{ width: 200 }}
                                                >
                                                    정산종목
                                                </th>
                                                <th colSpan={24}>
                                                    회차별 환수율
                                                </th>
                                            </tr>
                                            <tr>
                                                {Array.from({
                                                    length: 24,
                                                }).map((_, i) => (
                                                    <td
                                                        key={`whoi${i}`}
                                                        style={{
                                                            width: 80,
                                                        }}
                                                    >
                                                        {i + 1}
                                                    </td>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <MyCheckbox label="" />
                                                </td>
                                                <td>
                                                    <MySelect placeholder="선택" />
                                                </td>
                                                <td>
                                                    <MySelect placeholder="선택" />
                                                </td>
                                                {Array.from({
                                                    length: 24,
                                                }).map((_, i) => (
                                                    <td key={`input-whoi${i}`}>
                                                        <MyInput
                                                            type="text"
                                                            className="text-end"
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
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
