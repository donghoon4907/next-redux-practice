import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { startOfMonth } from 'date-fns';
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
import { SearchFilterCompanySelect } from '@partials/common/select/SearchFilterCompany';

interface Props {}

export const LongSilhyoSearchFilter: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { longViewCompanies } = useSelector<AppState, HrState>(
        (props) => props.hr,
    );

    // 검색필터 - 종납회차
    const [lastwhoi, setLastwhoi] = useSelect(longConstants.whoi);

    useEffect(() => {
        const { lastwhoi } = router.query;

        if (lastwhoi) {
            setLastwhoi(findSelectOption(lastwhoi, longConstants.whoi));
        }
    }, [router]);

    return (
        <SearchFilterForm>
            <div className={`${displayName}__filters`}>
                <div className={`${displayName}__filterrow`}>
                    <div className={`${displayName}__filter`}>
                        <SearchFilterOrgaSelect activeUser />
                        <SearchFilterUserSelect />
                    </div>
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__divider`}></div>
                        <SearchFilterCompanySelect
                            options={longViewCompanies}
                        />
                        <div className={`${displayName}__field`}>
                            <label
                                className={`${displayName}__label`}
                                htmlFor="lastwhoi"
                            >
                                종납회차
                            </label>
                            <div style={{ width: 130 }}>
                                <MySelect
                                    id="lastwhoi"
                                    placeholder="선택"
                                    {...lastwhoi}
                                />
                            </div>
                        </div>

                        <div className={`${displayName}__divider`}></div>
                    </div>
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__field`}>
                            <span className={`${displayName}__label`}>
                                실효일자
                            </span>
                            <input
                                type="hidden"
                                name="date_type"
                                value="sdate"
                            />
                            <SearchFilterDatepicker
                                defaultValue={[
                                    startOfMonth(new Date()),
                                    new Date(),
                                ]}
                            />
                        </div>
                        <SearchFilterKeywordInput />
                    </div>
                </div>
            </div>
        </SearchFilterForm>
    );
};
