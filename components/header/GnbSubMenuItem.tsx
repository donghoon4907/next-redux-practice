import type { FC, MouseEvent } from 'react';
import type { CoreMenuOption, CoreProps } from '@interfaces/core';
import { useLinkTab } from '@hooks/use-tab';

interface Props extends CoreProps, Pick<CoreMenuOption, 'to'> {}

export const GnbSubMenuItem: FC<Props> = ({ to, children }) => {
    const tab = useLinkTab();

    // const { onToggle } = useDrawer();

    const handleClick = (evt: MouseEvent<HTMLAnchorElement>) => {
        evt.preventDefault();

        if (to === '/404') {
            return alert('준비 중입니다.');
        }

        tab.replace(to);
    };

    return (
        <li>
            <a className="wr-gnb__subtitle" href={to} onClick={handleClick}>
                {children}
            </a>
        </li>
    );
};
