import type { FC, MouseEvent } from 'react';
import type { CoreMenuOption, CoreProps } from '@interfaces/core';
import { useRoute } from '@hooks/use-route';

interface Props extends CoreProps, Pick<CoreMenuOption, 'to'> {}

export const GnbSubMenuItem: FC<Props> = ({ to, children }) => {
    const route = useRoute();

    // const { onToggle } = useDrawer();

    const handleClick = (evt: MouseEvent<HTMLAnchorElement>) => {
        evt.preventDefault();

        if (to === '/404') {
            return alert('준비 중입니다.');
        }

        route.replace(to);
    };

    return (
        <li>
            <a className="wr-gnb__subtitle" href={to} onClick={handleClick}>
                {children}
            </a>
        </li>
    );
};
