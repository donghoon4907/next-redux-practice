import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';

import { MyNav } from './nav';
import { MyHeader } from './header';

interface Props extends CoreProps {}

export const MyLayout: FC<Props> = ({ children }) => {
    return (
        <div className="row">
            <div className="col-1">
                <MyNav />
            </div>
            <div className="col-11">
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
