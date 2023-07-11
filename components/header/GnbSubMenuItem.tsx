import type { FC, MouseEvent } from 'react';
import type {
    CoreMenuOption,
    CoreProps,
    CoreLinkTabOption,
} from '@interfaces/core';
import { useTab } from '@hooks/use-tab';

interface Props extends CoreProps, Pick<CoreMenuOption, 'to'> {
    tabOption?: Omit<CoreLinkTabOption, 'to'>;
}

export const GnbSubMenuItem: FC<Props> = ({ to, tabOption, children }) => {
    const tab = useTab();

    // const { onToggle } = useDrawer();

    const handleClick = (evt: MouseEvent<HTMLAnchorElement>) => {
        evt.preventDefault();

        if (tabOption) {
            const { id, label } = tabOption;

            tab.fire(id, label, to);
        }
    };

    return (
        <li>
            <a className="wr-gnb__subtitle" href={to} onClick={handleClick}>
                {children}
            </a>
        </li>
    );
};
