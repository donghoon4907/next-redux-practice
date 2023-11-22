import type { FC, MouseEvent } from 'react';
import type { CoreMenuOption, CoreProps } from '@interfaces/core';
import { useRoute } from '@hooks/use-route';

interface Props extends CoreProps, Pick<CoreMenuOption, 'to' | 'label'> {}

export const GnbSubMenuItem: FC<Props> = ({ to, label }) => {
    const route = useRoute();

    const handleClick = (evt: MouseEvent<HTMLAnchorElement>) => {
        evt.preventDefault();

        if (to === '#') {
            return alert('준비 중입니다.');
        }

        route.replace(to);
    };

    return (
        <li className="wr-gnb__menuitem" role="menuitem">
            <a className="wr-gnb__subtitle" href={to} onClick={handleClick}>
                {label}
            </a>
        </li>
    );
};
