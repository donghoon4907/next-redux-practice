import type { FC } from 'react';
import type { CoreMenuOption } from '@interfaces/core';
import Link from 'next/link';

interface Props extends Pick<CoreMenuOption, 'to' | 'label'> {}

export const GnbSubMenuItem: FC<Props> = ({ to, label }) => {
    return (
        <span className="wr-gnb__submenu-item">
            <Link href={to}>
                <a className="wr-gnb__subtitle">{label}</a>
            </Link>
        </span>
    );
};
