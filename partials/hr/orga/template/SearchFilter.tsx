import type { FC, FormEvent } from 'react';
import type { AppState } from '@reducers/index';
import type { HrState } from '@reducers/hr';
import type { OrgaDate } from '@models/orga';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInput } from '@hooks/use-input';
import { isEmpty } from '@utils/validator/common';
import { useSearch } from '@hooks/use-search';
import { MyInput } from '@components/input';
import { MySelect } from '@components/select';
import { useSelect } from '@hooks/use-select';
import orgaConstants from '@constants/options/orga';
import { findSelectOption } from '@utils/getter';
import { ListDateRangepicker } from '@partials/common/datepicker/ListRange';

interface Props {}

export const OrgaSearchFilterTemplate: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const { orgas } = useSelector<AppState, HrState>((props) => props.hr);

    const search = useSearch();
    // 검색필터 - 조직
    const [orga, setOrga] = useSelect(orgas, null);
    // 검색필터 - 조직등급
    const [rate, setRate] = useSelect(orgaConstants.rate);
    // 검색필터 - 현상태
    const [status, setStatus] = useSelect(orgaConstants.status);
    // 검색필터 - 등록일 및 폐점일
    const [dateType, setDateType] = useState<OrgaDate>('indate');
    // 검색필터 - 검색어
    const [keyword, setKeyword] = useInput('');

    const handleClickDateType = (type: OrgaDate) => {
        setDateType(type);
    };

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        const { nums } = router.query;

        const formData = new FormData(evt.currentTarget);

        const searchParams = new URLSearchParams();

        searchParams.append('page', '1');

        if (nums) {
            searchParams.append('nums', nums as string);
        } else {
            searchParams.append('nums', '25');
        }

        for (const [key, value] of formData.entries()) {
            if (!isEmpty(value)) {
                searchParams.append(key, value as string);
            }
        }

        search(searchParams.toString());
    };

    useEffect(() => {
        const { orga, orga_rate, status, search, date_type } = router.query;

        if (orga) {
            setOrga(findSelectOption(orga, orgas));
        }

        if (orga_rate) {
            setRate(findSelectOption(orga_rate, orgaConstants.rate));
        }

        if (status) {
            setStatus(findSelectOption(status, orgaConstants.status));
        }

        if (date_type) {
            setDateType(date_type as OrgaDate);
        }

        if (search) {
            setKeyword(search as string);
        }
    }, [router]);

    return (
        <form className={`${displayName}__header`} onSubmit={handleSubmit}>
            <div className={`${displayName}__filters`}>
                <div className={`${displayName}__filter`}>
                    <div className={`${displayName}__field`}>
                        <label
                            className={`${displayName}__label`}
                            htmlFor="idx"
                        >
                            영업조직
                        </label>
                        <div style={{ width: 320 }}>
                            <MySelect
                                inputId="idx"
                                fontSize={13}
                                placeholder="선택"
                                {...orga}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${displayName}__divider`}></div>
                <div className={`${displayName}__filter`}>
                    <div className={`${displayName}__field`}>
                        <label
                            className={`${displayName}__label`}
                            htmlFor="orga_rank"
                        >
                            조직등급
                        </label>
                        <div style={{ width: 160 }}>
                            <MySelect
                                inputId="orga_rank"
                                fontSize={13}
                                placeholder="선택"
                                {...rate}
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
                        <div style={{ width: 160 }}>
                            <MySelect
                                inputId="status"
                                fontSize={13}
                                placeholder="선택"
                                {...status}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${displayName}__divider`}></div>
                <div className={`${displayName}__filter`}>
                    <div className={`${displayName}__field`}>
                        <div className={`${displayName}__labels`}>
                            <span
                                role="button"
                                className={`${displayName}__label ${displayName}__label--${
                                    dateType === 'indate' ? 'active' : ''
                                }`}
                                onClick={() => handleClickDateType('indate')}
                            >
                                등록일
                            </span>
                            <div
                                className={`${displayName}__labeldivider`}
                            ></div>
                            <span
                                role="button"
                                className={`${displayName}__label ${displayName}__label--${
                                    dateType === 'outdate' ? 'active' : ''
                                }`}
                                onClick={() => handleClickDateType('outdate')}
                            >
                                폐점일
                            </span>
                            <input
                                type="hidden"
                                name="date_type"
                                value={dateType}
                            />
                        </div>
                        <ListDateRangepicker />
                    </div>
                    <div className={`${displayName}__field`}>
                        <label
                            className={`${displayName}__label`}
                            htmlFor="search"
                        >
                            검색
                        </label>
                        <div style={{ width: 235 }}>
                            <MyInput
                                id="search"
                                name="search"
                                type="search"
                                placeholder="검색어를 입력하세요."
                                {...keyword}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${displayName}__search`}>
                <button type="submit">조회</button>
            </div>
        </form>
    );
};
