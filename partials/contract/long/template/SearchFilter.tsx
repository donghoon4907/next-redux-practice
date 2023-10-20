import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HrState } from '@reducers/hr';
import { AppState } from '@reducers/index';
import { useSelect } from '@hooks/use-select';
import longConstants from '@constants/options/long';
import commonConstants from '@constants/options/common';
import { MySelect } from '@components/select';
import { SearchFilterForm } from '@partials/common/form/SearchFilter';
import { SearchFilterOrgaSelect } from '@partials/common/select/SearchFilterOrga';
import { SearchFilterUserSelect } from '@partials/common/select/SearchFilterUser';
import { SearchFilterDatepicker } from '@partials/common/datepicker/SearchFilter';
import { SearchFilterKeywordInput } from '@partials/common/input/SearchFilterKeyword';
import { findSelectOption } from '@utils/getter';
import { SearchFilterDateTypeLabel } from '@partials/common/label/SearchFilterDateType';
import { SearchFilterUserCheckbox } from '@partials/common/checkbox/SearchFilterCheckUser';
import { SearchFilterCollapseButton } from '@components/SearchFilterCollapse';
import { SearchFilterCompanySelect } from '@partials/common/select/SearchFilterCompany';

interface Props {}

export const LongSearchFilter: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { longViewCompanies } = useSelector<AppState, HrState>(
        (props) => props.hr,
    );

    // 확장 여부
    const [expand, setExpand] = useState(false);
    // 검색필터 - 보종
    const [spec, setSpec] = useSelect(longConstants.productType2);
    // 검색필터 - 현상태
    const [status, setStatus] = useSelect(longConstants.boStatus);
    // 검색필터 - 납입주기
    const [pay_cycle, setPayCycle] = useSelect(longConstants.payCycle2);
    // 검색필터 - 고객경로
    const [sourceroot, setSourceroot] = useSelect(longConstants.sourceroot);
    // 검색필터 - 금소법확인
    const [monitoring_cust, setMonitoringCust] = useSelect(commonConstants.yn);
    // 검색필터 - 완전판매모니터링
    const [monitoring_sale, setMonitoringSale] = useSelect(commonConstants.yn);
    // 검색필터 - 상품비교설명
    const [monitoring_compare, setMonitoringCompare] = useSelect(
        commonConstants.yn,
    );
    // 검색필터 - 개인정보동의
    const [privacyinfo, setPrivacyinfo] = useSelect(commonConstants.yn);

    useEffect(() => {
        const {
            spec,
            status,
            pay_cycle,
            sourceroot,
            monitoring_cust,
            monitoring_sale,
            monitoring_compare,
            privacyinfo,
        } = router.query;

        if (spec) {
            setSpec(findSelectOption(spec, longConstants.productType2));
        }

        if (status) {
            setStatus(findSelectOption(status, longConstants.boStatus));
        }

        if (pay_cycle) {
            setPayCycle(findSelectOption(pay_cycle, longConstants.payCycle2));
        }

        if (sourceroot) {
            setSourceroot(
                findSelectOption(sourceroot, longConstants.sourceroot),
            );
        }

        if (monitoring_cust) {
            setMonitoringCust(
                findSelectOption(monitoring_cust, commonConstants.yn),
            );
        }

        if (monitoring_sale) {
            setMonitoringSale(
                findSelectOption(monitoring_sale, commonConstants.yn),
            );
        }

        if (monitoring_compare) {
            setMonitoringCompare(
                findSelectOption(monitoring_compare, commonConstants.yn),
            );
        }

        if (privacyinfo) {
            setPrivacyinfo(findSelectOption(privacyinfo, commonConstants.yn));
        }
    }, [router]);

    return (
        <SearchFilterForm>
            <SearchFilterCollapseButton expand={expand} setExpand={setExpand} />
            <div className={`${displayName}__filters`}>
                <div className={`${displayName}__filterrow`}>
                    <div className={`${displayName}__filter`}>
                        <SearchFilterOrgaSelect activeUser />
                        <SearchFilterUserSelect />
                        <SearchFilterUserCheckbox />
                    </div>
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__divider`}></div>
                        <SearchFilterCompanySelect
                            options={longViewCompanies}
                        />
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="spec"
                            >
                                보종
                            </label>
                            <div style={{ width: 110 }}>
                                <MySelect
                                    id="spec"
                                    placeholder="선택"
                                    {...spec}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="status"
                            >
                                현상태
                            </label>
                            <div style={{ width: 110 }}>
                                <MySelect
                                    id="status"
                                    placeholder="선택"
                                    {...status}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="pay_cycle"
                            >
                                납입주기
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    id="pay_cycle"
                                    placeholder="선택"
                                    {...pay_cycle}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="sourceroot"
                            >
                                고객경로
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    id="sourceroot"
                                    placeholder="선택"
                                    {...sourceroot}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__divider`}></div>
                    </div>
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__field`}>
                            <SearchFilterDateTypeLabel
                                indateLabel="계약일자"
                                outdateLabel="상태반영일"
                            />
                            <SearchFilterDatepicker />
                        </div>
                        <SearchFilterKeywordInput />
                    </div>
                </div>
                {expand && (
                    <div className={`${displayName}__filterrow wr-border-t`}>
                        <div className={`${displayName}__filter`}>
                            <div className={`${displayName}__field`}>
                                <label
                                    className={`${displayName}__label`}
                                    htmlFor="monitoring_cust"
                                >
                                    금소법확인
                                </label>
                                <div style={{ width: 86 }}>
                                    <MySelect
                                        id="monitoring_cust"
                                        placeholder="선택"
                                        {...monitoring_cust}
                                    />
                                </div>
                            </div>
                            <div className={`${displayName}__field`}>
                                <label
                                    className={`${displayName}__label`}
                                    htmlFor="monitoring_sale"
                                >
                                    완전판매모니터링
                                </label>
                                <div style={{ width: 86 }}>
                                    <MySelect
                                        id="monitoring_sale"
                                        placeholder="선택"
                                        {...monitoring_sale}
                                    />
                                </div>
                            </div>
                            <div className={`${displayName}__field`}>
                                <label
                                    className={`${displayName}__label`}
                                    htmlFor="monitoring_compare"
                                >
                                    상품비교설명
                                </label>
                                <div style={{ width: 86 }}>
                                    <MySelect
                                        id="monitoring_compare"
                                        placeholder="선택"
                                        {...monitoring_compare}
                                    />
                                </div>
                            </div>
                            <div className={`${displayName}__field`}>
                                <label
                                    className={`${displayName}__label`}
                                    htmlFor="privacyinfo"
                                >
                                    개인정보동의
                                </label>
                                <div style={{ width: 86 }}>
                                    <MySelect
                                        id="privacyinfo"
                                        placeholder="선택"
                                        {...privacyinfo}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SearchFilterForm>
    );
};
