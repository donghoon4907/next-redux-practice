import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { SearchDateType } from '@models/search';

interface Props {
    indateLabel: string;
    outdateLabel: string;
}

export const SearchFilterDateTypeLabel: FC<Props> = ({
    indateLabel,
    outdateLabel,
}) => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const [dateType, setDateType] = useState<SearchDateType>('indate');

    const handleClickDateType = (type: SearchDateType) => {
        setDateType(type);
    };

    useEffect(() => {
        const { date_type } = router.query;

        if (date_type) {
            setDateType(date_type as SearchDateType);
        }
    }, [router]);

    return (
        <div className={`${displayName}__labels`}>
            <span
                role="button"
                className={`${displayName}__label ${displayName}__label--${
                    dateType === 'indate' ? 'active' : ''
                }`}
                onClick={() => handleClickDateType('indate')}
            >
                {indateLabel}
            </span>
            <div className={`${displayName}__labeldivider`}></div>
            <span
                role="button"
                className={`${displayName}__label ${displayName}__label--${
                    dateType === 'outdate' ? 'active' : ''
                }`}
                onClick={() => handleClickDateType('outdate')}
            >
                {outdateLabel}
            </span>
            <input type="hidden" name="date_type" value={dateType} />
        </div>
    );
};
