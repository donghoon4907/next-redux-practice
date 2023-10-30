import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';

import { MyNav } from './nav';
import { MyHeader } from './header';
import { MyHistories } from './header/Histories';
import { DrawerState } from '@reducers/drawer';

interface Props extends CoreProps {}

export const MyLayout: FC<Props> = ({ children }) => {
    const displayName = 'wr-layout';

    const { isOpen } = useSelector<AppState, DrawerState>(
        (state) => state.drawer,
    );

    return (
        <div className={displayName}>
            <MyHeader />
            <main className={`${displayName}__main wr-frame__main`}>
                <MyNav />
                <div
                    className={`${displayName}__inner ${
                        isOpen ? 'narrowed' : ''
                    }`}
                >
                    <MyHistories />
                    <div className={`${displayName}__content wr-frame__body`}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};
