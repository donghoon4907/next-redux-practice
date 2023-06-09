import type { FC } from 'react';
import type { CoreMenuOption } from '@interfaces/core';
import Link from 'next/link';

interface Props extends Pick<CoreMenuOption, 'to' | 'label'> {}

export const GnbMenuItem: FC<Props> = ({ to, label }) => {
    return (
        <span className="wr-gnb__menu-item">
            <Link href={to}>
                <span className="wr-gnb__title">{label}</span>
            </Link>
        </span>
    );
};
