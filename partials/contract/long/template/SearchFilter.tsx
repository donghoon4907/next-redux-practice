import type { FC, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
    compareAsc,
    isSameMonth,
    lastDayOfMonth,
    setDate,
    startOfMonth,
    endOfMonth,
    addMonths,
} from 'date-fns';
import { useSelector } from 'react-redux';
import { HrState } from '@reducers/hr';
import { WithLabel } from '@components/WithLabel';
import { MyInput } from '@components/input';
import { AppState } from '@reducers/index';
import { LongState } from '@reducers/long';
import { useSelect } from '@hooks/use-select';
import { useNumbericInput } from '@hooks/use-input';
import { useDateRangepicker } from '@hooks/use-datepicker';
import longConstants from '@constants/options/long';
import { DISTS } from '@constants/selectOption';
import { useApi } from '@hooks/use-api';
import { getUsersRequest } from '@actions/hr/get-users';
import { MySelect } from '@components/select';
import { WithArrow } from '@components/WithArrow';
import { useSearch } from '@hooks/use-search';
import { isEmpty } from '@utils/validator/common';
import { LuSearch } from 'react-icons/lu';
import { MyDateRangepicker } from '@components/datepicker/Range';

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
    const [orga] = useSelect(orgas, null, {
        callbackOnChange: (next) => {
            if (next) {
                getUsers({ idx: next.value });
            }
        },
    });
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
    // const [keyword] = useInput('');

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
        <form className={`${displayName}__header`} onSubmit={handleSubmit}>
            <div className={`${displayName}__filter`}>
                <WithLabel id="orga" label="영업조직" type="active">
                    <MySelect inputId="orga" {...orga} />
                </WithLabel>
            </div>
            <div className={`${displayName}__filter`}>
                <WithLabel id="fc" label="영업가족" type="active">
                    <MySelect inputId="fc" {...user} />
                </WithLabel>
            </div>
            <div className={`${displayName}__filter`}>
                <WithLabel id="whoi" label="회차" type="active">
                    <MyInput
                        type="text"
                        id="whoi"
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
                        id="whoi2"
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
                    <MyDateRangepicker
                        id="paydate"
                        format="yyyy-MM-dd"
                        placeholder="기간을 입력 혹은 선택하세요"
                        size="sm"
                        placement="autoVerticalEnd"
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
                        hooks={contdate}
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
                    <WithLabel id="spec" label="보종" type="active">
                        <MySelect inputId="spec" {...productType} />
                    </WithLabel>
                </div>
            </div>
            <div className={`${displayName}__filter`}>
                <WithLabel id="title" label="상품명" type="active">
                    <MySelect inputId="title" {...ptitle} />
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
                <WithLabel id="search" label="검색" type="active">
                    <MyInput
                        type="search"
                        name="search"
                        placeholder="검색어를 입력하세요"
                        button={{
                            type: 'submit',
                            className: 'btn-primary',
                            children: (
                                <>
                                    <span className="visually-hidden">
                                        검색
                                    </span>
                                    <LuSearch size={15} />
                                </>
                            ),
                        }}
                    />
                </WithLabel>
            </div>
        </form>
    );
};
