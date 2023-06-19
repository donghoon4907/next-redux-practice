import type { FC } from 'react';
import { LuMenu } from 'react-icons/lu';
import { GNBS, SUBMENUS } from '@constants/gnb';
import { IconWrapper } from '@components/IconWrapper';
import { useDrawer } from '@hooks/use-drawer';

import { GnbMenuItem } from './GnbMenuItem';
import { GnbSubMenuItem } from './GnbSubMenuItem';
import { Nav } from './Nav';

interface Props {}

export const Header: FC<Props> = () => {
    const { onToggle } = useDrawer();

    return (
        <header className="wr-header">
            <div className="wr-gnb">
                <div className="wr-gnb__inner">
                    <div className="wr-gnb__both">
                        <div className="wr-gnb__left">
                            {/* <span onClick={onToggle}>
                                <IconWrapper>
                                    <LuMenu size={30} color="white" />
                                </IconWrapper>
                            </span> */}
                            {/* <span className="wr-gnb__logo">
                                    <a className="wr-logo__link">
                                        <span className="wr-logo__icon">
                                            Wooriinsuman
                                        </span>
                                    </a>
                                </span> */}
                            <div className="wr-gnb__menu">
                                {GNBS.map(({ id, ...gnb }) => (
                                    <GnbMenuItem key={id} {...gnb} />
                                ))}
                            </div>
                        </div>
                        <div className="wr-gnb__right">
                            <div className="wr-gnb__submenu">
                                {SUBMENUS.map(({ id, ...gnb }) => (
                                    <GnbSubMenuItem key={id} {...gnb} />
                                ))}
                            </div>
                            <div className="wr-gnb__metadata">
                                <span>접속시간 2023-12-23 14:23</span>
                                <span>접속IP: 202.68.223.123</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wr-lnb">
                <div className="wr-lnb__inner">
                    <Nav />
                    <div className="wr-lnb__right">
                        <div className="wr-lnb__metadata">
                            <span>1경기광주사업단 &#62; 1팀 김서윤</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
