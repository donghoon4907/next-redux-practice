import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HrState } from '@reducers/hr';
import { AppState } from '@reducers/index';
import { useSelect } from '@hooks/use-select';
import longConstants from '@constants/options/long';
import { MySelect } from '@components/select';
import { SearchFilterForm } from '@partials/common/form/SearchFilter';
import { SearchFilterOrgaSelect } from '@partials/common/select/SearchFilterOrga';
import { SearchFilterUserSelect } from '@partials/common/select/SearchFilterUser';
import { SearchFilterDatepicker } from '@partials/common/datepicker/SearchFilter';
import { SearchFilterKeywordInput } from '@partials/common/input/SearchFilterKeyword';
import { findSelectOption } from '@utils/getter';
import { SearchFilterUserCheckbox } from '@partials/common/checkbox/SearchFilterCheckUser';
import { SearchFilterCollapseButton } from '@components/SearchFilterCollapse';
import { SearchFilterCompanySelect } from '@partials/common/select/SearchFilterCompany';

interface Props {}

export const LongSilSearchFilter: FC<Props> = () => {
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
    const [status, setStatus] = useSelect(longConstants.silStatus);
    // 검색필터 - 납입주기
    const [pay_cycle, setPayCycle] = useSelect(longConstants.payCycle2);
    // 검색필터 - 납입방법
    const [cycle, setCycle] = useSelect(longConstants.payCycle2);
    // 검색필터 - 입금구분
    const [sildist, setSildist] = useSelect(longConstants.silDist);
    // 검색필터 - 회차
    const [whoi, setWhoi] = useSelect(longConstants.whoi);

    useEffect(() => {
        const { spec, status, pay_cycle, cycle, sildist, whoi } = router.query;

        if (spec) {
            setSpec(findSelectOption(spec, longConstants.productType2));
        }

        if (status) {
            setStatus(findSelectOption(status, longConstants.silStatus));
        }

        if (pay_cycle) {
            setPayCycle(findSelectOption(pay_cycle, longConstants.payCycle2));
        }

        if (cycle) {
            setCycle(findSelectOption(cycle, longConstants.payCycle2));
        }

        if (sildist) {
            setSildist(findSelectOption(sildist, longConstants.silDist));
        }

        if (whoi) {
            setWhoi(findSelectOption(whoi, longConstants.whoi));
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
                            <div style={{ width: 100 }}>
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
                        <div className={`${displayName}__divider`}></div>
                    </div>
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__field`}>
                            <span className={`${displayName}__label`}>
                                영수일
                            </span>
                            <input
                                type="hidden"
                                name="date_type"
                                value="sildate"
                            />
                            <SearchFilterDatepicker />
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
                                htmlFor="cycle"
                            >
                                납입방법
                            </label>
                            <div style={{ width: 100 }}>
                                <MySelect
                                    id="cycle"
                                    placeholder="선택"
                                    {...cycle}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="sildist"
                            >
                                입금구분
                            </label>
                            <div style={{ width: 110 }}>
                                <MySelect
                                    id="sildist"
                                    placeholder="선택"
                                    {...sildist}
                                />
                            </div>
                        </div>
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="whoi"
                            >
                                회차
                            </label>
                            <div style={{ width: 130 }}>
                                <MySelect
                                    id="whoi"
                                    placeholder="선택"
                                    {...whoi}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SearchFilterForm>
    );
};
