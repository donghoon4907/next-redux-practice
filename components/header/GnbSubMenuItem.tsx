import type { FC } from 'react';
import type { CoreMenuOption, CoreProps } from '@interfaces/core';
import Link from 'next/link';

interface Props extends CoreProps, Pick<CoreMenuOption, 'to'> {}

export const GnbSubMenuItem: FC<Props> = ({ to, children }) => {
    return (
        <li>
            <Link href={to}>
                <a className="wr-gnb__subtitle">{children}</a>
            </Link>
        </li>
    );
};
