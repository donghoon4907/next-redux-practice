import type { AppState } from '@reducers/index';
import type { TabState } from '@reducers/tab';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { HeaderTab } from './Tab';

interface Props {}

export const HeaderNav: FC<Props> = () => {
    const { tabs } = useSelector<AppState, TabState>((props) => props.tab);

    return (
        <ul className="wr-tab__wrap" role="tablist">
            {tabs.map((tab, index) => (
                <HeaderTab
                    key={tab.id}
                    isSingle={tabs.length === 1}
                    isFirst={index === 0}
                    {...tab}
                />
            ))}
        </ul>
    );
};
