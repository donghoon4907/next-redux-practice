import type { FC, MouseEvent } from 'react';
import type { CoreMenuOption } from '@interfaces/core';
import { useDispatch, useSelector } from 'react-redux';
import { ASIDE_MENU } from '@constants/gnb';
import { updateGnb } from '@actions/gnb/gnb.action';
import { AppState } from '@reducers/index';
import { GnbState } from '@reducers/gnb';

interface Props extends Pick<CoreMenuOption, 'id' | 'to' | 'label'> {}

export const GnbMenuItem: FC<Props> = ({ id, to, label }) => {
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
        }
    };

    return (
        <li className="wr-gnb__menuitem" role="menuitem">
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
