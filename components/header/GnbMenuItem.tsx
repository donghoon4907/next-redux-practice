import type { FC, MouseEvent } from 'react';
import type { CoreMenuOption } from '@interfaces/core';
import { useDispatch, useSelector } from 'react-redux';
import { ASIDE_MENU } from '@constants/gnb';
import { updateGnb } from '@actions/gnb/gnb.action';
import { AppState } from '@reducers/index';
import { GnbState } from '@reducers/gnb';
import { getCookie, setCookie } from 'cookies-next';
import { showDrawer } from '@actions/drawer/drawer.action';

interface Props extends Pick<CoreMenuOption, 'id' | 'to' | 'label'> {
    activeDivider?: boolean;
}

export const GnbMenuItem: FC<Props> = ({ id, to, label, activeDivider }) => {
    const dispatch = useDispatch();

    const { activeId } = useSelector<AppState, GnbState>((state) => state.gnb);

    const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();

        const [_, gnb] = to.split('/');

        if (gnb !== null) {
            dispatch(
                updateGnb({
                    id: gnb,
                    menu: ASIDE_MENU[gnb],
                }),
            );

            const key = process.env.COOKIE_NAV_COLLAPSE_KEY || '';

            if (getCookie(key) === 'N') {
                setCookie(key, 'Y');

                dispatch(showDrawer());
            }
        }
    };

    return (
        <li
            className={`wr-gnb__menuitem ${activeDivider ? 'divider' : ''}`}
            role="menuitem"
        >
            <button
                type="button"
                className={`wr-gnb__title ${activeId === id ? 'active' : ''}`}
                onClick={handleClick}
            >
                {label}
            </button>
        </li>
    );
};
