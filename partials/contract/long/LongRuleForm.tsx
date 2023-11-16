import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { RuleState } from '@reducers/rule';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MyFooter } from '@components/footer';
import { MyButton } from '@components/button';
import { CreateLongDTO } from '@dto/contractor/Long.dto';
import { FloatInput } from '@components/input/Float';
import { FloatSelect } from '@components/select/Float';
import commonConstants from '@constants/options/common';
import { useSelect } from '@hooks/use-select';
import { useApi } from '@hooks/use-api';
import { getCalspecsRequest } from '@actions/rule/get-calspecs';
import { getRuleOrgasRequest } from '@actions/rule/get-orgas';

interface Props {}

export const LongRuleForm: FC<Props> = () => {
    const displayName = 'wr-pages-long-detail';

    const { longUseCompanies } = useSelector<AppState, HrState>(
        (state) => state.hr,
    );

    const { makeableRates, sudists, calspecs, orgas, grades, hwans } =
        useSelector<AppState, RuleState>((state) => state.rule);

    const getCalspecs = useApi(getCalspecsRequest);

    const getOrgas = useApi(getRuleOrgasRequest);

    // 제도 적용 등급
    const [rate] = useSelect(makeableRates, null, {
        callbackOnChange: (next) => {
            if (next) {
                getOrgas({ rate: next.value });
            }
        },
    });
    // 제도 적용 조직
    const [orga] = useSelect(orgas, null);
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
    const [hwan] = useSelect(hwans, null);
    // 테이블 지급 규정 - 보험사
    const [wcode] = useSelect(longUseCompanies, null, {
        callbackOnChange: (next) => {
            if (next) {
                getCalspecs({ spe: 'long', wcode: next.value });
            }
        },
    });
    // 테이블 지급 규정 - 수수료항목
    const [sudist] = useSelect(sudists, null);
    // 테이블 지급 규정 - 정산종목
    const [calspec] = useSelect(calspecs, null);

    const handleCreate = () => {
        const payload = createPayload();

        const createDto = new CreateLongDTO(payload);

        if (createDto.requiredValidate()) {
            // createLong(createDto.getPayload(), () => {
            //     alert('등록되었습니다.');
            // });
        }
    };

    const createPayload = () => {
        // 필수값
        const payload: any = {};

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
                            <FloatInput label="장기 지급 제도명" />
                        </div>
                        <div className="col-2">
                            <FloatSelect label="제도 적용 등급" {...rate} />
                        </div>
                        <div className="col-2">
                            <FloatSelect label="제도 적용 조직" {...orga} />
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
                            <FloatSelect label="환수 제도" {...hwan} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${displayName} wr-pages-detail wr-mt`}>
                <div className="flex-fill">
                    <div className="wr-pages-detail__block h-100 w-100">
                        <div className="wr-pages-detail__content">
                            <div className="wr-pages-detail__subtitle wr-border-b">
                                <strong>테이블 지급 규정</strong>
                            </div>
                            <div className="row wr-mt">
                                <div className="col-3">
                                    <FloatSelect label="보험사" {...wcode} />
                                </div>
                                <div className="col-3">
                                    <FloatSelect
                                        label="수수료항목"
                                        {...sudist}
                                    />
                                </div>
                                <div className="col-3">
                                    <FloatSelect
                                        label="정산종목"
                                        {...calspec}
                                    />
                                </div>
                            </div>
                            <div className="wr-table--normal wr-mt">
                                <table className="wr-table table">
                                    <thead>
                                        <tr>
                                            <th>보험사</th>
                                            <th>수수료항목</th>
                                            <th>정산종목</th>
                                            <th>산출기준</th>
                                            <th>시작회차</th>
                                            <th>종료회차</th>
                                            <th>지급율</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={7}>
                                                규정이 없습니다.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-fill">
                    <div className="wr-pages-detail__block h-100 w-100">
                        <div className="wr-pages-detail__content">
                            <div className="wr-pages-detail__subtitle wr-border-b">
                                <strong>원수수료 기준 비례 지급 규정</strong>
                            </div>
                            <div className="row wr-mt">
                                <div className="col-3">
                                    <FloatSelect label="보험사" />
                                </div>
                                <div className="col-3">
                                    <FloatSelect label="수입수수료항목" />
                                </div>
                                <div className="col-3">
                                    <FloatSelect label="환수정산방식" />
                                </div>
                            </div>
                            <div className="wr-table--normal wr-mt">
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
                                    <tbody>
                                        <tr>
                                            <td colSpan={7}>
                                                규정이 없습니다.
                                            </td>
                                        </tr>
                                    </tbody>
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
