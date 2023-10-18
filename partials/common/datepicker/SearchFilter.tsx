import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { addMonths, endOfMonth, startOfMonth } from 'date-fns';
import { useDateRangepicker } from '@hooks/use-datepicker';
import { MyDateRangepicker } from '@components/datepicker/Range';
import { IconWrapper } from '@components/IconWrapper';
import { MdPlayArrow } from 'react-icons/md';

interface Props {}

export const SearchFilterDatepicker: FC<Props> = () => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const [date, setDate, { onPrevMonth, onNextMonth }] = useDateRangepicker(
        null,
        // [startOfMonth(new Date()),new Date()]
    );

    useEffect(() => {
        const { date } = router.query;

        if (date) {
            const nextContdate = new String(date)
                .split(',')
                .map((v) => new Date(v)) as [Date, Date];

            setDate(nextContdate);
        }
    }, [router]);

    return (
        <div className={`${displayName}__datewrap`}>
            <div style={{ width: 20 }}>
                <IconWrapper onClick={onPrevMonth}>
                    <MdPlayArrow
                        size={15}
                        style={{
                            transform: 'rotate(180deg)',
                        }}
                    />
                    <span className="visually-hidden">이전</span>
                </IconWrapper>
            </div>
            <div style={{ width: 195 }}>
                <MyDateRangepicker
                    id="date"
                    format="yyyy-MM-dd"
                    placeholder="기간을 입력 혹은 선택하세요"
                    size="xs"
                    placement="autoVerticalStart"
                    cleanable={true}
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
                    hooks={date}
                />
            </div>
            <div>
                <IconWrapper onClick={onNextMonth}>
                    <MdPlayArrow size={15} />
                    <span className="visually-hidden">다음</span>
                </IconWrapper>
            </div>
        </div>
    );
};
