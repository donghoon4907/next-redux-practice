import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { GnbState } from '@reducers/gnb';
import { useSelector } from 'react-redux';

import { MyNav } from './nav';

interface Props extends CoreProps {}

export const MyLayout: FC<Props> = ({ children }) => {
    const { activeGnb } = useSelector<AppState, GnbState>((state) => state.gnb);

    const hasGnb = Object.keys(activeGnb).length > 0;

    return (
        <div className="wr-layout">
            <nav
                className="wr-layout__left"
                style={{
                    minWidth: hasGnb ? 150 : 0,
                    flexBasis: hasGnb ? 150 : 0,
                }}
            >
                <MyNav menu={activeGnb} />
            </nav>

            <div className="wr-layout__right">{children}</div>
        </div>
    );
};
