import { addDays, addYears } from 'date-fns';

// 자동차 날짜 선택 조건
export function carShouldDisableDate(date: Date) {
    return date > addYears(new Date(), 1) || date < addDays(new Date(), -1);
}
