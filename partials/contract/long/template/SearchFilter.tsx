import type { FC } from 'react';
import type { CoreSelectOption } from '@interfaces/core';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
    compareAsc,
    isSameMonth,
    lastDayOfMonth,
    setDate,
    startOfMonth,
    endOfMonth,
    addMonths,
} from 'date-fns';
import { DateRangePicker } from 'rsuite';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { HrState } from '@reducers/hr';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { AppState } from '@reducers/index';
import { LongState } from '@reducers/long';
import { useSelect } from '@hooks/use-select';
import { useInput, useNumbericInput } from '@hooks/use-input';
import { useDateRangepicker } from '@hooks/use-datepicker';
import longConstants from '@constants/options/long';
import { DISTS } from '@constants/selectOption';
import { useApi } from '@hooks/use-api';
import { getUsersRequest } from '@actions/hr/get-users';
import { MySelect } from '@components/select';
import { WithArrow } from '@components/WithArrow';
import { SearchInput } from '@components/input/Search';
import { useSearch } from '@hooks/use-search';
import { isEmpty } from '@utils/validator/common';

interface Props {}

export const LongSearchFilterTemplate: FC<Props> = () => {
    const displayName = 'wr-pages-list';

    const router = useRouter();

    const { orgas, users, longViewCompanies } = useSelector<AppState, HrState>(
        (props) => props.hr,
    );

    const { longs } = useSelector<AppState, LongState>((props) => props.long);

    const getUsers = useApi(getUsersRequest);

    const search = useSearch();

    // 검색필터 - 조직
    const [orga, setOrga] = useState<CoreSelectOption | null>(null);
    // 검색필터 - 영업가족
    const [user] = useSelect(users, null);
    // 검색필터 - 회차
    const [beforeRound] = useNumbericInput('1', { addComma: true });
    const [afterRound] = useNumbericInput('1', { addComma: true });
    // 검색필터 - 계약일자
    const [contdate, setContdate] = useDateRangepicker([
        startOfMonth(new Date()),
        new Date(),
    ]);

    // 검색필터 - 보험사
    const [company] = useSelect(longViewCompanies, null);
    // 검색필터 - 보종
    const [productType] = useSelect(longConstants.productType, null);
    // 검색필터 - 상품명
    const [ptitle] = useSelect(longs.ptitles, null);
    // 검색필터 - 납입주기
    const [cycle] = useSelect(longConstants.payCycle, null);
    // 검색필터 - 입금구분
    const [dist] = useSelect(DISTS, null);
    // 검색필터 - 검색어
    const [keyword] = useInput('');

    const handleSearch = () => {
        const { nums } = router.query;

        const searchParams = new URLSearchParams();

        searchParams.append('page', '1');

        if (nums) {
            searchParams.append('nums', nums as string);
        } else {
            searchParams.append('nums', '25');
        }

        if (contdate.value === null) {
            return alert('계약일자를 입력하세요.');
        } else {
            searchParams.append(
                'paydate',
                contdate.value.map((v) => format(v, 'yyyy-MM-dd')).join(','),
            );
        }

        if (!isEmpty(keyword.value)) {
            searchParams.append('search', keyword.value);
        }

        search(searchParams.toString());
    };

    const handleChangeOrga = (org: CoreSelectOption | null) => {
        setOrga(org);

        if (org !== null) {
            getUsers({ idx: org.value });
        }
    };

    const handlePrevContdate = () => {
        if (contdate.value) {
            const startDate = setDate(addMonths(contdate.value[0], -1), 1);

            let lastDate = lastDayOfMonth(startDate);
            if (isSameMonth(new Date(), startDate)) {
                lastDate = new Date();
            }

            setContdate([startDate, lastDate]);
        } else {
            alert('먼저 계약일자를 설정하세요.');
        }
    };

    const handleNextContdate = () => {
        if (contdate.value) {
            const today = new Date();

            const startDate = setDate(addMonths(contdate.value[0], 1), 1);
            if (compareAsc(today, startDate) === -1) {
                return alert('오늘 이후의 날짜로 설정할 수 없습니다.');
            }

            let lastDate = lastDayOfMonth(startDate);
            if (isSameMonth(today, startDate)) {
                lastDate = today;
            }

            setContdate([startDate, lastDate]);
        } else {
            alert('먼저 계약일자를 설정하세요.');
        }
    };

    useEffect(() => {
        const { paydate } = router.query;

        if (paydate) {
            const nextContdate = new String(paydate)
                .split(',')
                .map((v) => new Date(v)) as [Date, Date];

            setContdate(nextContdate);
        }
    }, [router]);

    return (
        <>
            <div className={`${displayName}__filter`}>
                <WithLabel id="orga" label="조직" type="active">
                    <MySelect
                        inputId="orga"
                        options={orgas}
                        value={orga}
                        onChange={handleChangeOrga}
                    />
                </WithLabel>
            </div>
            <div className={`${displayName}__filter`}>
                <WithLabel id="fc" label="영업가족" type="active">
                    <MySelect inputId="fc" {...user} />
                </WithLabel>
            </div>
            <div className={`${displayName}__filter`}>
                <WithLabel id="round" label="회차" type="active">
                    <MyInput
                        type="text"
                        id="round"
                        className="text-end"
                        placeholder="입력"
                        {...beforeRound}
                    />
                    <div
                        className="wr-with__extension wr-form__unit wr-border-l--hide"
                        style={{ height: 30 }}
                    >
                        ~
                    </div>
                    <MyInput
                        type="text"
                        id="round_after"
                        className="text-end wr-border-l--hide"
                        placeholder="입력"
                        {...afterRound}
                    />
                </WithLabel>
            </div>
            <div className={`${displayName}__filter`}>
                <WithArrow
                    label="계약일자"
                    type="active"
                    onPrev={handlePrevContdate}
                    onNext={handleNextContdate}
                >
                    <DateRangePicker
                        id="contdate"
                        format="yyyy-MM-dd"
                        placeholder="기간을 입력 혹은 선택하세요"
                        size="sm"
                        placement="autoVerticalEnd"
                        style={{
                            width: '100%',
                        }}
                        ranges={[
                            {
                                label: '전월',
                                value: [
                                    startOfMonth(addMonths(new Date(), -1)),
                                    endOfMonth(addMonths(new Date(), -1)),
                                ],
                            },
                            {
                                label: '당월',
                                value: [startOfMonth(new Date()), new Date()],
                            },
                        ]}
                        shouldDisableDate={(date) => date > new Date()}
                        {...contdate}
                    />
                </WithArrow>
            </div>
            <div className={`${displayName}__filter`}>
                <div>
                    <WithLabel id="company" label="보험사" type="active">
                        <MySelect inputId="company" {...company} />
                    </WithLabel>
                </div>
                <div>
                    <WithLabel id="product_type" label="보종" type="active">
                        <MySelect inputId="product_type" {...productType} />
                    </WithLabel>
                </div>
            </div>
            <div className={`${displayName}__filter`}>
                <WithLabel id="ptitle" label="상품명" type="active">
                    <MySelect inputId="ptitle" {...ptitle} />
                </WithLabel>
            </div>
            <div className={`${displayName}__filter`}>
                <div>
                    <WithLabel id="cycle" label="납입주기" type="active">
                        <MySelect inputId="cycle" {...cycle} />
                    </WithLabel>
                </div>
                <div>
                    <WithLabel id="dist" label="입금구분" type="active">
                        <MySelect inputId="dist" {...dist} />
                    </WithLabel>
                </div>
            </div>
            <div className={`${displayName}__filter`}>
                <WithLabel id="searchKeyword" label="검색" type="active">
                    <SearchInput
                        id="searchKeyword"
                        placeholder="검색어를 입력하세요"
                        onSearch={handleSearch}
                        {...keyword}
                    />
                </WithLabel>
            </div>
        </>
    );
};
