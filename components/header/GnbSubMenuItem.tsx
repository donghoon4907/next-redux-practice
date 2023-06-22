import type { FC } from 'react';
import type { CoreMenuOption } from '@interfaces/core';
import Link from 'next/link';

interface Props extends Pick<CoreMenuOption, 'to' | 'label'> {}

export const GnbSubMenuItem: FC<Props> = ({ to, label }) => {
    return (
        <li>
            <Link href={to}>
                <a className="wr-gnb__subtitle" title={label}>
                    {label}
                </a>
            </Link>
        </li>
    );
};
