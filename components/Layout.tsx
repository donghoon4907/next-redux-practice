import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';
import type { AppState } from '@reducers/index';
import type { GnbState } from '@reducers/gnb';
import { useSelector } from 'react-redux';

import { MyNav } from './nav';
import { MyHeader } from './header';

interface Props extends CoreProps {}

export const MyLayout: FC<Props> = ({ children }) => {
    const { activeGnb } = useSelector<AppState, GnbState>((state) => state.gnb);

    const hasGnb = Object.keys(activeGnb).length > 0;
    return (
        <div className="row">
            <div className="col-1 wr-border-r">
                <MyNav menu={activeGnb} />
            </div>
            <div className={`col-11`}>
                <MyHeader />
                <section>
                    <main className="wr-main wr-frame__body">
                        <div className="wr-main__inner">{children}</div>
                        {/* <footer className="wr-footer">{footer}</footer> */}
                    </main>
                </section>
            </div>
        </div>
    );
};
