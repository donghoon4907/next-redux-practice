import type { FC } from 'react';
import type { CoreMenuOption } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { DrawerState } from '@reducers/drawer';
import type { GnbState } from '@reducers/gnb';
import { useSelector } from 'react-redux';
import { DrawerMenu } from '@components/drawer/DrawerMenu';

interface Props {}

export const MyNav: FC<Props> = () => {
    const displayName = 'wr-nav';

    const { activeMenu } = useSelector<AppState, GnbState>(
        (state) => state.gnb,
    );

    const { isOpen } = useSelector<AppState, DrawerState>(
        (state) => state.drawer,
    );

    return (
        <div
            className={`${displayName} wr-frame__nav ${
                isOpen ? '' : 'collapsed'
            }`}
        >
            <div
                className="wr-nav__body wr-drawer"
                role="tablist"
                aria-multiselectable="true"
            >
                <DrawerMenu defaultOpen={isOpen} menu={activeMenu} />
            </div>
        </div>
    );
};
