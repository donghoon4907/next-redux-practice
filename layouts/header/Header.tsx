import type { FC } from 'react';
import { Fragment } from 'react';
import Image from 'next/image';

import { Logo } from '@layouts/logo/Logo';
import { HeaderSearchBox } from './components/SearchBox';
import { HeaderUserBox } from './components/UserBox';

interface Props {}

export const Header: FC<Props> = () => (
    <Fragment>
        <header className="app-header bg-strong-bliss header-text-light header-shadow">
            <Logo />
            <div className="app-header__content">
                <div className="app-header-left">
                    <HeaderSearchBox />
                </div>
                <div className="app-header-right">
                    <HeaderUserBox />
                </div>
            </div>
        </header>
        {/* <TransitionGroup>
                    <CSSTransition
                        component="div"
                        className={cx("app-header", headerBackgroundColor, {'header-shadow': enableHeaderShadow})}
                        appear={true}
                        timeout={1500}
                        enter={false}
                        exit={false}>
                        <div>

                            

                            <div className={cx(
                                "app-header__content",
                                {'header-mobile-open': enableMobileMenuSmall},
                            )}>
                                <div className="app-header-left">
                                    <SearchBox/>
                                </div>
                                <div className="app-header-right">
                                    <UserBox/>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                </TransitionGroup> */}
    </Fragment>
);
