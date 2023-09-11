import addDays from 'date-fns/addDays';
import addYears from 'date-fns/addYears';

// 자동차 날짜 선택 조건
export function carShouldDisableDate(date: Date) {
    return date > addYears(new Date(), 1) || date < addDays(new Date(), -1);
}
