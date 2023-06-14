import type { AppState } from '@reducers/index';
import type { TabState } from '@reducers/tab';
import { type FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TabModule } from '@utils/storage';
import { initTab } from '@actions/tab/tab.action';
import { Tab } from './Tab';

interface Props {}

export const Nav: FC<Props> = () => {
    const dispatch = useDispatch();

    const { tabs } = useSelector<AppState, TabState>((props) => props.tab);

    useEffect(() => {
        // get in session storage
        const tab = new TabModule();
        // push in redux
        dispatch(initTab(tab.getAll()));

        return () => {};
    }, [dispatch]);

    return (
        <nav className="nav">
            {tabs.map((tab) => (
                <Tab key={tab.id} {...tab} isSingle={tabs.length === 1} />
            ))}
        </nav>
    );
};
