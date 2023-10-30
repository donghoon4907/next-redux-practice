import type { FC } from 'react';
import type { HrState } from '@reducers/hr';
import type { AppState } from '@reducers/index';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addYears, startOfMonth } from 'date-fns';
import { useSelect } from '@hooks/use-select';
import carConstants from '@constants/options/car';
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
import { CollapseButton } from '@components/Collapse';
import { SearchFilterCompanySelect } from '@partials/common/select/SearchFilterCompany';
import { SearchFilterSourcerootSelect } from '@partials/common/select/SearchFilterSourceroot';

interface Props {}

export const CarSearchFilter: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { longViewCompanies } = useSelector<AppState, HrState>(
        (props) => props.hr,
    );

    // 확장 여부
    const [expand, setExpand] = useState(false);
    // 검색필터 - 보종
    const [spec, setSpec] = useSelect(carConstants.spec);
    // 검색필터 - 현상태
    const [status, setStatus] = useSelect(carConstants.status);
    // 검색필터 - 납입방법
    const [car_cycle, setCarCycle] = useSelect(carConstants.cycle);
    // 검색필터 - 금소법확인
    const [monitoring_cust, setMonitoringCust] = useSelect(commonConstants.yn2);
    // 검색필터 - 완전판매모니터링
    const [monitoring_sale, setMonitoringSale] = useSelect(commonConstants.yn2);
    // 검색필터 - 상품비교설명
    const [monitoring_compare, setMonitoringCompare] = useSelect(
        commonConstants.yn2,
    );
    // 검색필터 - 개인정보동의
    const [privacyinfo, setPrivacyinfo] = useSelect(commonConstants.yn2);

    useEffect(() => {
        const {
            spec,
            status,
            car_cycle,
            monitoring_cust,
            monitoring_sale,
            monitoring_compare,
            privacyinfo,
        } = router.query;

        if (spec) {
            setSpec(findSelectOption(spec, carConstants.spec));
        }

        if (status) {
            setStatus(findSelectOption(status, carConstants.status));
        }

        if (car_cycle) {
            setCarCycle(findSelectOption(car_cycle, carConstants.cycle));
        }

        if (monitoring_cust) {
            setMonitoringCust(
                findSelectOption(monitoring_cust, commonConstants.yn2),
            );
        }

        if (monitoring_sale) {
            setMonitoringSale(
                findSelectOption(monitoring_sale, commonConstants.yn2),
            );
        }

        if (monitoring_compare) {
            setMonitoringCompare(
                findSelectOption(monitoring_compare, commonConstants.yn2),
            );
        }

        if (privacyinfo) {
            setPrivacyinfo(findSelectOption(privacyinfo, commonConstants.yn2));
        }
    }, [router]);

    return (
        <SearchFilterForm>
            <CollapseButton
                type="horizontal"
                expand={expand}
                setExpand={setExpand}
            />
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
                                htmlFor="car_cycle"
                            >
                                납입방법
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    id="car_cycle"
                                    placeholder="선택"
                                    {...car_cycle}
                                />
                            </div>
                        </div>
                        <SearchFilterSourcerootSelect />
                        <div className={`${displayName}__divider`}></div>
                    </div>
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__field`}>
                            <SearchFilterDateTypeLabel
                                options={[
                                    {
                                        label: '보험시기',
                                        value: 'bo_datefrom',
                                    },
                                    {
                                        label: '보험만기',
                                        value: 'bo_dateto',
                                    },
                                ]}
                            />
                            <SearchFilterDatepicker
                                defaultValue={[
                                    startOfMonth(addYears(new Date(), -1)),
                                    new Date(),
                                ]}
                            />
                        </div>
                        <SearchFilterKeywordInput />
                    </div>
                </div>
                <div
                    className={`${displayName}__filterrow ${
                        expand ? '' : `${displayName}__filterrow--hide`
                    } wr-border-t`}
                >
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
            </div>
        </SearchFilterForm>
    );
};
