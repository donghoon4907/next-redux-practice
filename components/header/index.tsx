import type { FC } from 'react';
import { GNBS, SUBMENUS } from '@constants/gnb';

import { GnbMenuItem } from './GnbMenuItem';
import { GnbSubMenuItem } from './GnbSubMenuItem';

interface Props {}

export const Header: FC<Props> = () => {
    return (
        <header className="wr-header">
            <div className="wr-gnb">
                <div className="wr-gnb__inner">
                    <div className="wr-gnb__both">
                        <div className="wr-gnb__left">
                            <span className="wr-gnb__logo">
                                <a className="wr-logo__link">
                                    <span className="wr-logo__icon">
                                        Wooriinsuman
                                    </span>
                                </a>
                            </span>
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
                    <div className="wr-lnb__both">
                        <div className="wr-lnb__left">
                            <nav className="nav">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="#"
                                >
                                    고객상세
                                </a>
                                <span className="wr-header__divider"></span>
                                <a className="nav-link" href="#">
                                    고객명세
                                </a>
                                <span className="wr-header__divider"></span>
                                <a className="nav-link" href="#">
                                    고객접촉이력
                                </a>
                                <span className="wr-header__divider"></span>
                                <a className="nav-link" href="#">
                                    DB명세
                                </a>
                                <span className="wr-header__divider"></span>
                                <a className="nav-link" href="#">
                                    DB관리
                                </a>
                            </nav>
                        </div>
                        <div className="wr-lnb__right">
                            <div className="wr-lnb__metadata">
                                <span>1경기광주사업단 &#62; 1팀 김서윤</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
