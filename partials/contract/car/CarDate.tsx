import type { FC } from 'react';
import { addYears, differenceInCalendarDays } from 'date-fns';
import { MyDatepicker } from '@components/datepicker';
import { carShouldDisableDate } from '@utils/datepicker';
import { MyButton } from '@components/button';
import { useDatepicker } from '@hooks/use-datepicker';

interface Props {}
// 가입예정일
export const FormCarDate: FC<Props> = () => {
    // 시작일
    const [idate, setIdate] = useDatepicker(new Date(), {
        callbackOnChange: (nextDate) => {
            if (nextDate) {
                // 보험만기일 자동 변경
                setTodt(addYears(nextDate, 1));
            }
        },
    });
    // 만기일
    const [todt, setTodt] = useDatepicker(addYears(new Date(), 1));

    const handleClickToday = () => {
        const today = new Date();
        // 가입예정일이 입력되어 있는 경우
        if (idate.value) {
            // 오늘 날짜로 설정되지 않은 경우
            if (differenceInCalendarDays(idate.value, today) !== 0) {
                setIdate(today);

                setTodt(addYears(today, 1));
            }
        } else {
            setIdate(today);

            setTodt(addYears(today, 1));
        }
    };

    return (
        <>
            <div
                style={{
                    width: 130,
                }}
            >
                <MyDatepicker
                    id="idate"
                    size="sm"
                    placeholder="가입예정일"
                    hooks={idate}
                    shouldDisableDate={carShouldDisableDate}
                    cleanable={false}
                />
            </div>
            <MyButton
                type="button"
                className="btn-warning btn-sm"
                onClick={handleClickToday}
            >
                오늘
            </MyButton>
            <div>~</div>
            <div
                style={{
                    width: 130,
                }}
            >
                <MyDatepicker
                    id="todt"
                    size="md"
                    placeholder="보험만기일"
                    hooks={todt}
                    shouldDisableDate={carShouldDisableDate}
                />
            </div>
        </>
    );
};
