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

export const LongBuhwalSearchFilter: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { longViewCompanies } = useSelector<AppState, HrState>(
        (props) => props.hr,
    );

    // 검색필터 - 회차
    const [whoi, setWhoi] = useState('1~999');

    useEffect(() => {
        const { whoi } = router.query;

        if (whoi) {
            setWhoi(whoi as string);
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
                                회차
                            </span>
                            <div style={{ width: 130 }}>
                                <PopupTriggerSelect
                                    id="whoi"
                                    title={whoi}
                                    setTitle={setWhoi}
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
                                부활일
                            </span>
                            <input
                                type="hidden"
                                name="date_type"
                                value="budate"
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
