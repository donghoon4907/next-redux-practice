import type { FC } from 'react';
import type { CoreMenuOption } from '@interfaces/core';
import Link from 'next/link';

interface Props extends Pick<CoreMenuOption, 'to' | 'label'> {}

export const GnbMenuItem: FC<Props> = ({ to, label }) => {
    return (
        <li className="wr-gnb__menuitem">
            <Link href={to}>
                <a className="wr-gnb__title" role="menuitem">
                    {label}
                </a>
            </Link>
        </li>
    );
};
