import { addDays, getDaysInMonth, startOfMonth } from 'date-fns';

export function createCalendar(year: number, month: number) {
    const weeks = [];
    const daysInMonth = getDaysInMonth(new Date(year, month - 1)); // 월은 0부터 시작하므로 -1
    const firstDayOfMonth = startOfMonth(new Date(year, month - 1)); // 월의 첫날

    let currentDate = firstDayOfMonth;
    let currentWeek = new Array(7).fill(null); // 길이가 7인 배열을 생성하고 null로 채웁니다.

    for (let i = 0; i < daysInMonth; i++) {
        const dayOfWeek = currentDate.getDay();
        currentWeek[dayOfWeek] = currentDate.getDate();

        if (dayOfWeek === 6) {
            weeks.push(currentWeek);
            currentWeek = new Array(7).fill(null); // 다음 주를 위해 배열을 초기화합니다.
        }

        currentDate = addDays(currentDate, 1); // 다음 날짜로 이동
    }

    // 마지막 주가 완전하지 않은 경우(null 값이 남아있는 경우) 추가
    if (currentWeek.some((day) => day !== null)) {
        weeks.push(currentWeek);
    }

    return weeks;
}
