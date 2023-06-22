import type { FC } from 'react';
// import { LuMenu } from 'react-icons/lu';
import { GNBS, SUBMENUS } from '@constants/gnb';
// import { useDrawer } from '@hooks/use-drawer';

import { GnbMenuItem } from './GnbMenuItem';
import { GnbSubMenuItem } from './GnbSubMenuItem';
import { HeaderNav } from './Nav';

interface Props {}

export const MyHeader: FC<Props> = () => {
    // const { onToggle } = useDrawer();

    return (
        <header className="wr-header">
            <div className="wr-gnb">
                <div className="wr-gnb__inner">
                    <div className="wr-gnb__both">
                        <nav className="wr-gnb__left">
                            {/* <span onClick={onToggle}>
                                <IconWrapper>
                                    <LuMenu size={30} color="white" />
                                </IconWrapper>
                            </span> */}
                            <h2 className="a11y-hidden">서비스메뉴</h2>
                            <ul className="wr-gnb__menu" role="menubar">
                                {GNBS.map(({ id, ...gnb }) => (
                                    <GnbMenuItem key={id} {...gnb} />
                                ))}
                            </ul>
                        </nav>
                        <div className="wr-gnb__right">
                            <h2 className="a11y-hidden">사용자서비스</h2>
                            <ul className="wr-gnb__services">
                                {SUBMENUS.map(({ id, ...gnb }) => (
                                    <GnbSubMenuItem key={id} {...gnb} />
                                ))}
                            </ul>
                            {/* <div className="wr-gnb__metadata">
                                <span>접속시간 2023-12-23 14:23</span>
                                <span>접속IP: 202.68.223.123</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="wr-lnb">
                <div className="wr-lnb__inner">
                    <strong className="a11y-hidden">탭 목록</strong>
                    <HeaderNav />
                    <div className="wr-tab__line"></div>
                </div>
            </div>
        </header>
    );
};
