import type { NextPage } from 'next';
import { useEffect } from 'react';
import { MyLayout } from '@components/Layout';
import { MyCalendar } from '@components/calendar';
import { useLoading } from '@hooks/use-loading';
import { MyHelmet } from '@components/Helmet';

const Calendar: NextPage = () => {
    const displayName = 'wr-pages-calendar';

    const loading = useLoading();

    useEffect(() => {
        loading.off();
    }, []);

    return (
        <>
            <MyHelmet />
            <MyLayout>
                <div className={displayName}>
                    <div className={`${displayName}__body wr-mt wr-mb`}>
                        <MyCalendar />
                    </div>
                </div>
            </MyLayout>
        </>
    );
};

export default Calendar;
