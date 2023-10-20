import type { FC } from 'react';
import type { CoreSelectOption } from '@interfaces/core';
import { useRouter } from 'next/router';
import { useState, useEffect, Fragment } from 'react';

interface Props {
    options: CoreSelectOption[];
}

export const SearchFilterDateTypeLabel: FC<Props> = ({ options }) => {
    const displayName = 'wr-pages-list2';

    const router = useRouter();

    const [dateType, setDateType] = useState<string>(options[0].value);

    const handleClickDateType = (type: string) => {
        setDateType(type);
    };

    useEffect(() => {
        const { date_type } = router.query;

        if (date_type) {
            setDateType(date_type as string);
        }
    }, [router]);

    return (
        <div className={`${displayName}__labels`}>
            {options.map(({ label, value }, i) => (
                <Fragment key={`datatype${i}`}>
                    <span
                        role="button"
                        className={`${displayName}__label ${displayName}__label--${
                            dateType === value ? 'active' : ''
                        }`}
                        onClick={() => handleClickDateType(value)}
                    >
                        {label}
                    </span>
                    {options.length - 1 > i && (
                        <div className={`${displayName}__labeldivider`}></div>
                    )}
                </Fragment>
            ))}
            <input type="hidden" name="date_type" value={dateType} />
        </div>
    );
};
