import type { FC, MouseEvent } from 'react';
import type { CoreMenuOption } from '@interfaces/core';
import { ASIDE_MENU } from '@constants/gnb';
import { useDispatch } from 'react-redux';
import { updateGnb } from '@actions/gnb/gnb.action';
import { BsBookmark } from 'react-icons/bs';

interface Props extends Pick<CoreMenuOption, 'to' | 'label'> {}

export const GnbMenuItem: FC<Props> = ({ to, label }) => {
    const dispatch = useDispatch();

    const handleClick = (evt: MouseEvent<HTMLLIElement>) => {
        evt.preventDefault();

        const [_, gnb] = to.split('/');

        if (gnb !== null) {
            dispatch(updateGnb(ASIDE_MENU[gnb]));
        }
    };

    return (
        <li className="wr-gnb__menuitem" onClick={handleClick}>
            <BsBookmark size={15} />
            <a
                className="wr-gnb__title"
                role="menuitem"
                title={label}
                href={to}
            >
                {label}
            </a>
        </li>
    );
};
