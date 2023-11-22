import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { startOfMonth } from 'date-fns';
import { HrState } from '@reducers/hr';
import { AppState } from '@reducers/index';
import { SearchFilterForm } from '@partials/common/form/SearchFilter';
import { SearchFilterOrgaSelect } from '@partials/common/select/SearchFilterOrga';
import { SearchFilterUserSelect } from '@partials/common/select/SearchFilterUser';
import { SearchFilterDatepicker } from '@partials/common/datepicker/SearchFilter';
import { SearchFilterKeywordInput } from '@partials/common/input/SearchFilterKeyword';
import { SearchFilterCompanySelect } from '@partials/common/select/SearchFilterCompany';
import { PopupTriggerSelect } from '@components/select/PopupTrigger';

import { LongWhoiSettingTemplate } from './WhoiSetting';

interface Props {}

export const LongSilhyoSearchFilter: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { longViewCompanies } = useSelector<AppState, HrState>(
        (props) => props.hr,
    );

    // 검색필터 - 종납회차
    const [lastwhoi, setLastwhoi] = useState('1~999');

    useEffect(() => {
        const { lastwhoi } = router.query;

        if (lastwhoi) {
            setLastwhoi(lastwhoi as string);
        }
    }, [router]);

    return (
        <SearchFilterForm>
            <div className={`${displayName}__filters`}>
                <div className={`${displayName}__filterrow`}>
                    <div className={`${displayName}__filter`}>
                        <SearchFilterOrgaSelect />
                        <SearchFilterUserSelect />
                    </div>
                    <div className={`${displayName}__filter`}>
                        <div className={`${displayName}__divider`}></div>
                        <SearchFilterCompanySelect
                            options={longViewCompanies}
                        />
                        <div className={`${displayName}__field`}>
                            <span className={`${displayName}__label`}>
                                종납회차
                            </span>
                            <div style={{ width: 130 }}>
                                <PopupTriggerSelect
                                    id="lastwhoi"
                                    title={lastwhoi}
                                    setTitle={setLastwhoi}
                                >
                                    <LongWhoiSettingTemplate />
                                </PopupTriggerSelect>
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
