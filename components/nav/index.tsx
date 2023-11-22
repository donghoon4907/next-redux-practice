import type { FC } from 'react';
import type { AppState } from '@reducers/index';
import type { DrawerState } from '@reducers/drawer';
import type { GnbState } from '@reducers/gnb';
import { setCookie } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerMenu } from '@components/drawer/DrawerMenu';
import { CollapseButton } from '@components/Collapse';
import { hideDrawer, showDrawer } from '@actions/drawer/drawer.action';

interface Props {}

export const MyNav: FC<Props> = () => {
    const displayName = 'wr-nav';

    const dispatch = useDispatch();

    const { activeMenu } = useSelector<AppState, GnbState>(
        (state) => state.gnb,
    );

    const { isOpen } = useSelector<AppState, DrawerState>(
        (state) => state.drawer,
    );

    const handleCollapse = (next: boolean) => {
        const key = process.env.COOKIE_NAV_COLLAPSE_KEY || '';

        setCookie(key, next ? 'Y' : 'N', {
            maxAge: 60 * 60 * 24 * 365,
        });

        if (next) {
            dispatch(showDrawer());
        } else {
            dispatch(hideDrawer());
        }
    };

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
                <CollapseButton
                    type="vertical"
                    expand={isOpen}
                    setExpand={handleCollapse}
                />
                <DrawerMenu defaultOpen={isOpen} menu={activeMenu} />
            </div>
        </div>
    );
};
