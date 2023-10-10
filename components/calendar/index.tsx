import type { FC } from 'react';
import { useState, useRef, useCallback } from 'react';
import { addMonths } from 'date-fns';
import { MdPlayArrow } from 'react-icons/md';
import { BsFillPrinterFill } from 'react-icons/bs';
import { useReactToPrint } from 'react-to-print';
import { createCalendar } from '@utils/calendar';
import { IconWrapper } from '@components/IconWrapper';

interface Props {}

export const MyCalendar: FC<Props> = () => {
    const displayName = 'wr-calendar';

    const containerRef = useRef<HTMLDivElement>(null);

    const [today, setToday] = useState(new Date());

    const calendar = createCalendar(today.getFullYear(), today.getMonth() + 1);

    const handlePrev = () => {
        setToday(addMonths(today, -1));
    };

    const handleNext = () => {
        setToday(addMonths(today, 1));
    };

    const reactToPrintContent = useCallback(() => {
        return containerRef.current;
    }, [containerRef]);

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: 'AwesomeFileName',
        // onBeforeGetContent: handleOnBeforeGetContent,
        // onBeforePrint: handleBeforePrint,
        // onAfterPrint: handleAfterPrint,
        removeAfterPrint: true,
    });

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div></div>
                <div className="d-flex justify-content-center align-items-center">
                    <div>
                        <IconWrapper onClick={handlePrev}>
                            <MdPlayArrow
                                size={30}
                                style={{ transform: 'rotate(180deg)' }}
                            />
                            <span className="visually-hidden">이전</span>
                        </IconWrapper>
                    </div>
                    <h3>
                        {today.getFullYear()}년 {today.getMonth() + 1}월
                    </h3>
                    <div>
                        <IconWrapper onClick={handleNext}>
                            <MdPlayArrow size={30} />
                            <span className="visually-hidden">다음</span>
                        </IconWrapper>
                    </div>
                </div>
                <div>
                    <IconWrapper onClick={handlePrint}>
                        <BsFillPrinterFill size={30} />
                    </IconWrapper>
                </div>
            </div>

            <div
                className={`${displayName} wr-table--normal wr-mt`}
                ref={containerRef}
            >
                <table className="wr-table table">
                    <thead>
                        <tr>
                            <th>
                                <strong className="text-danger">일</strong>
                            </th>
                            <th>
                                <strong>월</strong>
                            </th>
                            <th>
                                <strong>화</strong>
                            </th>
                            <th>
                                <strong>수</strong>
                            </th>
                            <th>
                                <strong>목</strong>
                            </th>
                            <th>
                                <strong>금</strong>
                            </th>
                            <th>
                                <strong className="text-primary">토</strong>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {calendar.map((week, index) => (
                            <tr key={`myCalendarWeek${index}`}>
                                {week.map((day, idx) => {
                                    return (
                                        <td
                                            key={`myCalendarDate${index}-${idx}`}
                                            style={{
                                                backgroundColor: day
                                                    ? 'white'
                                                    : '#dee2e6',
                                            }}
                                        >
                                            <div
                                                className={`${displayName}__container`}
                                            >
                                                <div
                                                    className={`${displayName}__date`}
                                                >
                                                    <strong
                                                        className={`${
                                                            (idx === 0 &&
                                                                'text-danger') ||
                                                            (idx === 6 &&
                                                                'text-primary')
                                                        }`}
                                                    >
                                                        {day}
                                                    </strong>
                                                </div>
                                                {day && (
                                                    <div
                                                        className={`${displayName}__event`}
                                                    >
                                                        <div
                                                            className={`${displayName}__content`}
                                                        >
                                                            <div
                                                                className="text-truncate"
                                                                style={{
                                                                    width: 80,
                                                                }}
                                                            >
                                                                (주)케이투삳가알닥다각
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`${displayName}__content`}
                                                        >
                                                            <div className="text-success">
                                                                031-273-8673
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`${displayName}__content`}
                                                        >
                                                            <div className="text-truncate">
                                                                <span>
                                                                    (삼성화재-70허4247)
                                                                </span>
                                                                <span className="text-primary">
                                                                    (조형미)
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
