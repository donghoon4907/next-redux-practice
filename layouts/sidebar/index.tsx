import { Logo } from '@layouts/logo/Logo';
import type { FC } from 'react';
import { Fragment, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Nav } from '@layouts/nav';

interface Props {}

export const Sidebar: FC<Props> = () => {
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    return (
        <div className="app-sidebar bg-royal sidebar-text-light sidebar-shadow">
            {/* <div className="sidebar-mobile-overlay" onClick={handleToggle} /> */}
            <PerfectScrollbar>
                <div className="app-sidebar__inner">
                    <Nav />
                </div>
            </PerfectScrollbar>
            <div>
                {/* <Logo /> */}

                {/* <div
                                className={cx("app-sidebar-bg", backgroundImageOpacity)}
                                style={{
                                    backgroundImage: enableBackgroundImage ? 'url(' + backgroundImage + ')' : null
                                }}>
                            </div> */}
            </div>
            {/* <TransitionGroup>
                    <CSSTransition
                        component="div"
                        className={cx("app-sidebar", backgroundColor, {'sidebar-shadow': enableSidebarShadow})}
                        appear={true} timeout={1500} enter={false} exit={false}>
                        
                    </CSSTransition>
                </TransitionGroup> */}
        </div>
    );
};
