import type { AppState } from '@reducers/index';
import type { TabState } from '@reducers/tab';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { HeaderTab } from './Tab';

interface Props {}

export const HeaderNav: FC<Props> = () => {
    const { tabs } = useSelector<AppState, TabState>((props) => props.tab);

    return (
        <ul className="nav nav-tabs">
            {tabs.map((tab) => (
                <HeaderTab key={tab.id} isSingle={tabs.length === 1} {...tab} />
            ))}
        </ul>
    );
};
