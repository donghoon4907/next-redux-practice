import type { FC } from 'react';

import { HeaderNav } from './Nav';

interface Props {}

export const MyHistories: FC<Props> = () => {
    const displayName = 'wr-histories';

    return (
        <div className={`${displayName}__wrap`}>
            <div className={displayName}>
                <strong className="visually-hidden">탭 목록</strong>
                <HeaderNav />
                <div className="wr-tab__line"></div>
            </div>
        </div>
    );
};
